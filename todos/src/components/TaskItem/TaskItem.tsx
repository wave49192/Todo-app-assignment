import React, { useEffect, useRef, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";
import ThreeDotDropDown from "../ThreeDotDropDown/ThreeDotDropDown";
import "./TaskItem.css";

export interface TaskItemProps {
  title: string;
  completed: boolean;
  id: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, completed, id }) => {
  const { editTask, toggleTaskCompleted } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preventBlur, setPreventBlur] = useState(false);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleEditSubmit = async () => {
    await editTask(id, newTitle);
    setIsEditing(false);
  };

  const handleBlur = () => {
    if (!preventBlur) {
      handleEditSubmit();
    }
    setPreventBlur(false);
  };
  const handleMouseDown = () => {
    setPreventBlur(true);
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="task-item">
      <div className="check-and-title">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => {
              toggleTaskCompleted(id);
            }}
          />
          <span className="checkmark"></span>
        </label>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={newTitle}
            onChange={handleEditChange}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEditSubmit();
            }}
            className="task-title"
          />
        ) : completed ? (
          <div className="task-title" onClick={handleEdit}>
            <s>{title}</s>
          </div>
        ) : (
          <div className="task-title" onClick={handleEdit}>
            {title}
          </div>
        )}
      </div>
      {isEditing ? (
        <button
          type="button"
          onClick={handleEditSubmit}
          onMouseDown={handleMouseDown}
          className="save-button"
        >
          Save
        </button>
      ) : (
        <ThreeDotDropDown onEdit={handleEdit} taskId={id} />
      )}
    </div>
  );
};

export default TaskItem;
