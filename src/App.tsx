import React from "react";
import Home from "./Home";
import { TaskProvider } from "./context/TaskContext";
import "./App.css";
const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="home-container">
        <Home />
      </div>
    </TaskProvider>
  );
};

export default App;
