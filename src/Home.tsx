import React from "react";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import TaskItemList from "./components/TaskItemList/TaskItemList";
import { useTaskContext } from "./context/TaskContext";
import "./Home.css";

const Home: React.FC = () => {
  const { taskList, taskPercentageCompleted } = useTaskContext();
  const progressPercentage = taskPercentageCompleted();
  const finishedTaskCount = taskList.filter(
    (task) => task.completed === true
  ).length;
  return (
    <div className="home">
      <ProgressBar
        progressPercent={progressPercentage}
        finishedTask={finishedTaskCount}
      />
      <TaskItemList />
    </div>
  );
};

export default Home;
