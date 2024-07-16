import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskContextType {
  taskList: Task[];
  addNewTask: (title: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskCompleted: (id: string) => void;
  taskPercentageCompleted: () => number;
  editTask: (id: string, newTitle: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType>({
  taskList: [],
  addNewTask: () => Promise.resolve(),
  deleteTask: () => Promise.resolve(),
  editTask: () => Promise.resolve(),
  toggleTaskCompleted: () => {},
  taskPercentageCompleted: () => 0,
});

interface TaskProviderProps {
  children: ReactNode;
}
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    fetchTaskList();
  }, []);

  const fetchTaskList = async () => {
    try {
      const response = await fetch("http://localhost:3001/todos");
      if (!response.ok) {
        throw new Error("Error fetching tasks");
      }
      const data = await response.json();
      setTaskList(data);
    } catch (error) {
      console.error("Error fetching task list:", error);
    }
  };

  const addNewTask = async (title: string) => {
    try {
      const response = await fetch("http://localhost:3001/todos", {
        method: "POST",
        body: JSON.stringify({
          title,
          completed: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error adding task");
      }

      const newTask = await response.json();
      setTaskList([...taskList, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error no such task ID ");
      }

      setTaskList(taskList.filter((task) => task.id != id));
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  const editTask = async (id: string, newTitle: string) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ title: newTitle }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error updating task");
      }

      const updatedTask = await response.json();
      setTaskList(
        taskList.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const taskPercentageCompleted = () => {
    return Math.floor(
      (taskList.filter((task) => task.completed === true).length /
        taskList.length) *
        100
    );
  };

  const toggleTaskCompleted = async (id: string) => {
    const taskToUpdate = taskList.find((task) => task.id === id);
    if (!taskToUpdate) {
      throw new Error("Task not found");
    }

    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !taskToUpdate.completed }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error no such task ID ");
      }
      const updatedTask = await response.json();
      setTaskList(
        taskList.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error checking task:", error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        taskList,
        addNewTask,
        deleteTask,
        taskPercentageCompleted,
        toggleTaskCompleted,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
