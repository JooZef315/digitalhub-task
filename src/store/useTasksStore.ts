import { create } from "zustand";
import { TTask, TaskStatus } from "../types";

type TasksStore = {
  tasks: TTask[];
  addTask(task: TTask): void;
  editTask(updatedtask: TTask): void;
  deleteTask(id: string): void;
  clearTasks(): void;
  filterByStatus: (status: TaskStatus) => void;
  sortByDescription: (order: "asc" | "desc") => void;
};

export const useTasksStore = create<TasksStore>((set, get) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),
  addTask(task) {
    const newTasks = [...get().tasks, task];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    set({ tasks: newTasks });
  },
  editTask(updatedtask) {
    const updatedTasks = get().tasks.map((task) =>
      task.id === updatedtask.id ? updatedtask : task
    );
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    set({ tasks: [...updatedTasks] });
  },
  deleteTask(id) {
    const tasksAfterDeletion = get().tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasksAfterDeletion));
    set({ tasks: [...tasksAfterDeletion] });
  },
  clearTasks() {
    localStorage.setItem("tasks", JSON.stringify([]));
    set({ tasks: [] });
  },
  filterByStatus(status) {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.status === status),
    }));
  },
  sortByDescription(order) {
    set((state) => ({
      tasks: [...state.tasks].sort((a, b) =>
        order === "asc"
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description)
      ),
    }));
  },
}));
