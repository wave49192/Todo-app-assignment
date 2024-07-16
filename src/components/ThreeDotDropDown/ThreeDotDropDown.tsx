import React, { useState, useEffect, useRef } from "react";
import "./ThreeDotDropDown.css";
import { useTaskContext } from "../../context/TaskContext";

interface DropDownProps {
  taskId: string;
  onEdit: () => void;
}

const ThreeDotDropDown: React.FC<DropDownProps> = ({ taskId, onEdit }) => {
  const { deleteTask } = useTaskContext();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    deleteTask(taskId);
    setIsOpen(false);
  };
  const handleEdit = () => {
    onEdit();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={`dropdown ${isOpen ? "is-open" : ""}`}>
      <span
        className={`dot ${isOpen ? "is-open" : ""}`}
        onClick={toggleDropdown}
      >
        ...
      </span>
      {isOpen && (
        <div className="dropdown-content">
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ThreeDotDropDown;
