import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface task {
  id: string;
  task: string;
  checked: boolean;
  category: "Todo" | "Active" | "Completed";
  priority?: "high" | "medium" | "low";
}

export interface taskLists {
  todo: task[];
  active: task[];
  completed: task[];
}

const useTodo = () => {
  const [inputTask, setInputTask] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("low");
  //   const [savedTask, setSavedTask] = useState<task[]>([]);
  const [taskLists, setTaskLists] = useState<taskLists>({
    todo: [],
    active: [],
    completed: [],
  });
  const savedTask = [
    ...taskLists.todo,
    ...taskLists.active,
    ...taskLists.completed,
  ];

  const handleAddTask = () => {
    if (inputTask.trim() !== "") {
      const newTask: task = {
        id: uuidv4(),
        task: inputTask,
        checked: false,
        priority: priority,
        category: "Todo",
      };
      const newSavedTaskList = {
        ...taskLists,
        todo: [...taskLists.todo, newTask],
      };
      setTaskLists(newSavedTaskList);
      localStorage.setItem("tasklists", JSON.stringify(newSavedTaskList));
      setInputTask("");
      setPriority("low");
    }
  };

  const handleChecked = (id: string) => {
    const stringId = String(id);
    const updatedLists = { ...taskLists };
    let taskFound = false;
    Object.keys(updatedLists).forEach((category) => {
      const categoryKey = category as keyof taskLists;

      updatedLists[categoryKey] = updatedLists[categoryKey].map((task) => {
        if (String(task.id) === stringId) {
          taskFound = true;
          const updatedTask = { ...task, checked: !task.checked };

          // moving to completed if checked, move back to todo if unchecked
          if (updatedTask.checked && task.category === "Completed") {
            updatedTask.category = "Completed";
          } else if (!updatedTask.checked && task.category === "Completed") {
            updatedTask.category = "Todo";
          }

          return updatedTask;
        }
        return task;
      });
    });

    if (taskFound) {
      const allTasks = [
        ...updatedLists.todo,
        ...updatedLists.active,
        ...updatedLists.completed,
      ];

      const reorganizedLists = {
        todo: allTasks.filter((task) => task.category === "Todo"),
        active: allTasks.filter((task) => task.category === "Active"),
        completed: allTasks.filter((task) => task.category === "Completed"),
      };

      setTaskLists(reorganizedLists);
      localStorage.setItem("tasklists", JSON.stringify(reorganizedLists));
    }
  };

  const handlePriority = (
    id: string,
    newPriority: "high" | "medium" | "low"
  ) => {
    const stringId = String(id);
    const updatedLists = { ...taskLists };

    Object.keys(updatedLists).forEach((category) => {
      const categoryKey = category as keyof taskLists;
      updatedLists[categoryKey] = updatedLists[categoryKey].map((task) =>
        String(task.id) === stringId ? { ...task, priority: newPriority } : task
      );
    });
    setTaskLists(updatedLists);
    localStorage.setItem("tasklists", JSON.stringify(updatedLists));
  };

  const handleDelete = (id: string) => {
    const stringId = String(id);
    const updatedLists = { ...taskLists };

    Object.keys(updatedLists).forEach((category) => {
      const categoryKey = category as keyof taskLists;
      updatedLists[categoryKey] = updatedLists[categoryKey].filter(
        (task) => String(task.id) !== stringId
      );
    });
    setTaskLists(updatedLists);
    localStorage.setItem("tasklists", JSON.stringify(updatedLists));
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
    const savedTaskLists = localStorage.getItem("tasklists");
    if (savedTaskLists) {
      const parsedLists = JSON.parse(savedTaskLists);

      const normalizedLists = {
        todo:
          parsedLists.todo?.map((task: any) => ({
            ...task,
            id: String(task.id),
          })) || [],
        active:
          parsedLists.active?.map((task: any) => ({
            ...task,
            id: String(task.id),
          })) || [],
        completed:
          parsedLists.completed?.map((task: any) => ({
            ...task,
            id: String(task.id),
          })) || [],
      };
      setTaskLists(normalizedLists);
      localStorage.setItem("tasklists", JSON.stringify(normalizedLists));
      return;
    }

    const oldTasks = localStorage.getItem("task");
    if (oldTasks) {
      const parsedTasks = JSON.parse(oldTasks);
      const taskWithPriority = parsedTasks.map((task: any) => ({
        ...task,
        priority: task.priority || "low",
        category: task.category || "Todo",
      }));

      const organizedLists = {
        todo: taskWithPriority.filter((task: task) => task.category === "Todo"),
        active: taskWithPriority.filter(
          (task: task) => task.category === "Active"
        ),
        completed: taskWithPriority.filter(
          (task: task) => task.category === "Completed"
        ),
      };

      setTaskLists(organizedLists);
      localStorage.setItem("tasklist", JSON.stringify(organizedLists));

      //   removing old storage
      localStorage.removeItem("task");
    }
  }, []);

  return {
    inputTask,
    priority,
    savedTask,
    taskLists,
    handleAddTask,
    handlePriority,
    handleDelete,
    handleChecked,
    getPriorityColor,
    setInputTask,
    setPriority,
  };
};

export { useTodo };
