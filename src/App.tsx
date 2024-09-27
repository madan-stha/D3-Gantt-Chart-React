import React from "react";
import GanttChart from "./GanttChart";

// Define the task structure
const tasks = [
  {
    taskId: "Task-1",
    name: "Daily Stand-up Meeting",
    startDate: new Date("2024-09-02"),
    endDate: new Date("2024-09-04"),
    color: "rgb(81, 91, 82)",
  },
  {
    taskId: "Task-2",
    name: "Code Review for Feature X",
    startDate: new Date("2024-09-04"),
    endDate: new Date("2024-09-06"),
    color: "rgb(227, 0, 0)",
  },
  {
    taskId: "Task-31",
    name: "Add new button",
    startDate: new Date("2024-09-05"),
    endDate: new Date("2024-09-09"),
    color: "rgb(147, 167, 149)",
  },
  {
    taskId: "Task-3",
    name: "Deploy New Version to Production",
    startDate: new Date("2024-09-09"),
    endDate: new Date("2024-09-11"),
    color: "rgb(255, 122, 0)",
  },
  {
    taskId: "Task-4",
    name: "Client Meeting for Project Aplha",
    startDate: new Date("2024-09-11"),
    endDate: new Date("2024-09-13"),
    color: "rgb(255, 122, 0)",
  },
  {
    taskId: "Task-5",
    name: "Upgrade version of libraries",
    startDate: new Date("2024-09-16"),
    endDate: new Date("2024-09-16"),
    color: "rgb(128, 128, 128)",
  },
  {
    taskId: "Task-6",
    name: "Change color of texts",
    startDate: new Date("2024-09-15"),
    endDate: new Date("2024-09-17"),
    color: "rgb(3, 192, 60)",
  },
  {
    taskId: "Task-7",
    name: "Delivery and billing address soft delete issue",
    startDate: new Date("2024-09-17"),
    endDate: new Date("2024-09-19"),
    color: "rgb(255, 122, 0)",
  },
  {
    taskId: "Task-8",
    name: "Add aria-label in Button, link, menuItem and input fields",
    startDate: new Date("2024-09-12"),
    endDate: new Date("2024-09-16"),
    color: "rgb(3, 192, 60)",
  },
  {
    taskId: "Task-9",
    name: "The status in the downloaded excel report and system does not match. entered by Anushka",
    startDate: new Date("2024-09-16"),
    endDate: new Date("2024-09-18"),
    color: "rgb(255, 165, 0)",
  },
  {
    taskId: "Task-10",
    name: " Use WebP instead of JPG, PNG, etc.",
    startDate: new Date("2024-09-17"),
    endDate: new Date("2024-09-20"),
    color: "rgb(3, 192, 60)",
  },
  {
    taskId: "Task-11",
    name: "Security Audit",
    startDate: new Date("2024-09-19"),
    endDate: new Date("2024-09-20"),
    color: "rgb(128, 0, 128)",
  },
  {
    taskId: "Task-12",
    name: "Team Building Workshop",
    startDate: new Date("2024-09-28"),
    endDate: new Date("2024-10-01"),
    color: "rgb(0, 128, 0)",
  },
  {
    taskId: "Task-13",
    name: "Quarterly Performance Review",
    startDate: new Date("2024-10-04"),
    endDate: new Date("2024-10-06"),
    color: "rgb(255, 165, 0)",
  },
  {
    taskId: "Task-14",
    name: "On-call Duty Rotation",
    startDate: new Date("2024-10-09"),
    endDate: new Date("2024-10-11"),
    color: "rgb(128, 128, 128)",
  },
  {
    taskId: "Task-15",
    name: "Technology Conference Attendance",
    startDate: new Date("2024-10-16"),
    endDate: new Date("2024-10-18"),
    color: "rgb(0, 0, 128)",
  },
  {
    taskId: "Task-16",
    name: "Database Migration",
    startDate: new Date("2024-10-21"),
    endDate: new Date("2024-10-23"),
    color: "rgb(255, 255, 0)",
  },
  {
    taskId: "Task-17",
    name: "Product Launch Preparation",
    startDate: new Date("2024-10-26"),
    endDate: new Date("2024-10-28"),
    color: "rgb(255, 255, 255)",
  },
  {
    taskId: "Task-18",
    name: "Holiday Season Support",
    startDate: new Date("2024-10-31"),
    endDate: new Date("2024-11-02"),
    color: "rgb(0, 255, 255)",
  },
  {
    taskId: "Task-19",
    name: "New Hire Onboarding",
    startDate: new Date("2024-11-06"),
    endDate: new Date("2024-11-08"),
    color: "rgb(255, 0, 255)",
  },
];

const App: React.FC = () => {
  return (
    <div>
      <h1>Gantt Chart Example</h1>
      <GanttChart tasks={tasks} />
    </div>
  );
};

export default App;
