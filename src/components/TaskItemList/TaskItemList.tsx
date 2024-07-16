import React, { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import TaskItem, { TaskItemProps } from "../TaskItem/TaskItem";
import "./TaskItemList.css";

const TaskItemList: React.FC = () => {
  const { taskList, addNewTask } = useTaskContext();
  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await addNewTask(newTask);
      setNewTask("");
    }
  };

  const handleFilterChange = (filterOption: string) => {
    setFilter(filterOption.toLowerCase());
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const filterTasks = (taskList: TaskItemProps[], filter: string) => {
    switch (filter) {
      case "done":
        return taskList.filter((task) => task.completed);
      case "undone":
        return taskList.filter((task) => !task.completed);
      case "all":
      default:
        return taskList;
    }
  };

  const filteredTaskList = filterTasks(taskList, filter);

  const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <div className="task-item-list">
      <div className="task-item-list-header">
        <h2>Tasks</h2>
        <div className="task-dropdown">
          <button className="dropbtn" onClick={toggleDropdown}>
            {capitalizeFirstLetter(filter)}
            <div>v</div>
          </button>
          <div className={`dropdown-content ${showDropdown ? "show" : ""}`}>
            <button onClick={() => handleFilterChange("all")}>All</button>
            <button onClick={() => handleFilterChange("done")}>Done</button>
            <button onClick={() => handleFilterChange("undone")}>Undone</button>
          </div>
        </div>
      </div>

      {filteredTaskList.map((task) => (
        <div key={task.id} style={{ display: "flex" }}>
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
          />
        </div>
      ))}
      <input
        type="text"
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
        onKeyDown={handleKeyDown}
        className="input-item"
        placeholder="Add more task here..."
      />
    </div>
  );
};

export default TaskItemList;
