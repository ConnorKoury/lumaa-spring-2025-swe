"use client";

import { useEffect, useState, FormEvent } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
};

type Session = {
  userId: string;
  username: string;
  exp: number;
};

type Props = {
  session: Session;
};

export default function DashboardClient({ session }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create a new task
  const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });
      if (res.ok) {
        setNewTitle("");
        setNewDescription("");
        fetchTasks();
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Toggle task completion status
  const handleToggleTask = async (task: Task) => {
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          isComplete: !task.isComplete,
        }),
      });
      if (res.ok) {
        fetchTasks();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchTasks();
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {session.username}!
      </h1>

      <form onSubmit={handleCreateTask} className="mb-8">
        <input
          type="text"
          placeholder="Task Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="border p-2 mr-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="mb-4 flex items-center justify-between border p-4 rounded"
            >
              <div>
                <h2
                  className={`text-xl font-semibold ${
                    task.isComplete ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </h2>
                <p className={task.isComplete ? "line-through" : ""}>
                  {task.description}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleTask(task)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  {task.isComplete ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}