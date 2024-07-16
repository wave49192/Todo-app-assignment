import React from "react";
import "./ProgressBar.css";
interface ProgressBarProps {
  progressPercent: number;
  finishedTask: number;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  progressPercent,
  finishedTask,
}) => {
  return (
    <div className="container">
      <h1 className="progress-bar-title">Progress</h1>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <p className="complete-text">{finishedTask} completed</p>
    </div>
  );
};

export default ProgressBar;
