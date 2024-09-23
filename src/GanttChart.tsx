import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface Task {
  taskId: string;
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
}

interface GanttChartProps {
  tasks: Task[];
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date(2024, 8, 15));
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  console.log(tasks);
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 60, right: 40, bottom: 40, left: 200 };
    const width = 1800 - margin.left - margin.right;
    const barHeight = 50;
    const totalBars = tasks.length;

    const dynamicHeight = totalBars * barHeight;
    const height = dynamicHeight + margin.top + margin.bottom;

    const startOfWeek = new Date(currentWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5);

    const filteredTasks = tasks.filter(
      (task) =>
        (task.startDate >= startOfWeek && task.startDate <= endOfWeek) ||
        (task.endDate >= startOfWeek && task.endDate <= endOfWeek) ||
        (task.startDate < startOfWeek && task.endDate > endOfWeek)
    );

    const taskIds = filteredTasks.map((task) => task.taskId);

    const x = d3.scaleTime().domain([startOfWeek, endOfWeek]).range([0, width]);

    const y = d3
      .scaleBand()
      .domain(taskIds)
      .range([0, filteredTasks.length * barHeight + 25])
      .padding(0);

    const xAxis = d3
      .axisTop(x)
      .ticks(d3.timeDay.every(1))
      .tickFormat(d3.timeFormat("%a %d %b") as any);

    const yAxis = d3.axisLeft(y);

    const chartGroup = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xAxisGroup = chartGroup.append("g").call(xAxis as any);

    const yAxisGroup = chartGroup.append("g").call(yAxis);

    const clipDate = (date: Date, start: Date, end: Date) => {
      if (date < start) return start;
      if (date > end) return end;
      return date;
    };

    xAxisGroup
      .selectAll(".tick text")
      .style("font-size", "14px")
      .style("font-weight", "bold");

    yAxisGroup
      .selectAll(".tick text")
      .style("font-size", "14px")
      .style("font-weight", "bold");

    xAxisGroup
      .select(".domain")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    yAxisGroup
      .select(".domain")
      .attr("stroke", "#000")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5");

    const bars = chartGroup
      .selectAll("rect")
      .data(filteredTasks)
      .enter()
      .append("rect")
      .attr("x", (d) => {
        const clippedStartDate = clipDate(d.startDate, startOfWeek, endOfWeek);
        return x(d3.timeDay.floor(clippedStartDate));
      })
      .attr("y", (d) => y(d.taskId)!)
      .attr("width", (d) => {
        const clippedStartDate = clipDate(d.startDate, startOfWeek, endOfWeek);
        const clippedEndDate = clipDate(d.endDate, startOfWeek, endOfWeek);
        return (
          x(d3.timeDay.ceil(clippedEndDate)) -
          x(d3.timeDay.floor(clippedStartDate))
        );
      })
      .attr("height", barHeight)
      .attr("fill", (d) => d.color)
      .attr("stroke-width", 1)
      .attr("rx", 15)
      .attr("ry", 15);

    chartGroup
      .selectAll("text.task-label")
      .data(filteredTasks)
      .enter()
      .append("text")
      .attr("x", (d) => {
        const clippedStartDate = clipDate(d.startDate, startOfWeek, endOfWeek);
        return x(d3.timeDay.floor(clippedStartDate)) + 5;
      })
      .attr("y", (d) => y(d.taskId)! + y.bandwidth() / 2)
      .attr("dy", ".35em")
      .text((d) => d.name)
      .style("fill", "#fff")
      .style("font-size", "18px")
      .style("font-weight", "bold")
      .style("text-anchor", "start");

    bars
      .on("mouseover", function (event, d) {
        d3.select(tooltipRef.current)
          .style("opacity", 1)
          .html(
            `<strong>Task:</strong> ${d.name}<br>
            <strong>Start:</strong> ${d3.timeFormat("%Y-%m-%d")(
              d.startDate
            )}<br>
            <strong>End:</strong> ${d3.timeFormat("%Y-%m-%d")(d.endDate)}`
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mousemove", function (event) {
        d3.select(tooltipRef.current)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", function () {
        d3.select(tooltipRef.current).style("opacity", 0);
      });

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("text-align", "left")
      .style("padding", "5px")
      .style("background", "#333")
      .style("color", "#fff")
      .style("border-radius", "12px")
      .style("opacity", 0);

    tooltipRef.current = tooltip.node() as HTMLDivElement;
  }, [tasks, currentWeek]);

  const showPreviousWeek = () => {
    setCurrentWeek((prevWeek) => {
      const newDate = new Date(prevWeek);
      newDate.setDate(prevWeek.getDate() - 7);
      return newDate;
    });
  };

  const showNextWeek = () => {
    setCurrentWeek((prevWeek) => {
      const newDate = new Date(prevWeek);
      newDate.setDate(prevWeek.getDate() + 7);
      return newDate;
    });
  };

  const showCurrentWeek = () => {
    setCurrentWeek(new Date(2024, 8, 15));
  };

  return (
    <div>
      <div style={{ marginLeft: "200px" }}>
        <button onClick={showPreviousWeek}>Previous Sprint</button>
        <button onClick={showCurrentWeek}>
          Current Sprint (Sep 15-20, 2024)
        </button>
        <button onClick={showNextWeek}>Next Sprint</button>
      </div>
      <svg ref={svgRef} />
    </div>
  );
};

export default GanttChart;
