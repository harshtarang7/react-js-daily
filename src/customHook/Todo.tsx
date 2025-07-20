import { useEffect, useState } from "react";
import type { task } from "../components/todo/Todo";
import { v4 as uuidv4 } from "uuid";

const useTodo = () => {
  const [inputTask, setInputTask] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("low");
  const [savedTask, setSavedTask] = useState<task[]>([]);

  const handleAddTask = () => {
    if (inputTask.trim() !== "") {
      const newTask: task = {
        id: uuidv4(),
        task: inputTask,
        checked: false,
        priority: priority,
      };
      const newSavedTask = [...savedTask, newTask];
      localStorage.setItem("task", JSON.stringify(newSavedTask));
      setSavedTask(newSavedTask);
      setInputTask("");
      setPriority("low");
    }
  };

  const handleChecked = (id: string) => {
    const updatedTasks = savedTask.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );
    setSavedTask(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
  };

  const handlePrioriy = (
    id: string,
    newPriority: "high" | "medium" | "low"
  ) => {
    const updatedTasks = savedTask.map((task) =>
      task.id === id ? { ...task, priority: newPriority } : task
    );
    setSavedTask(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
  };

  const handleDelete = (id: string) => {
    const updatedTasks = savedTask.filter((task) => task.id !== id);
    setSavedTask(updatedTasks);
    localStorage.setItem("task", JSON.stringify(updatedTasks));
  };

   const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "#ff4444";
      case "medium":
        return "#ff9900";
      case "low":
        return "#00aa00";
      default:
        return "#666666";
    }
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("task");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      const taskWithPriority = parsedTasks.map((task: any) => ({
        ...task,
        priority: task.priority || "low",
      }));
      setSavedTask(taskWithPriority);
    }
  }, []);

  return {
    inputTask,
    priority,
    savedTask,
    handleAddTask,
    handlePrioriy,
    handleDelete,
    handleChecked,
    getPriorityColor,
    setInputTask,
    setPriority,
    setSavedTask
  }
};

export {useTodo}
