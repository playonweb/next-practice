import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
};

// --- Raw API Fetchers ---
export const TodoSDK = {
  async fetchTodos(): Promise<Todo[]> {
    const res = await fetch("/api/todos");
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  },

  async createTodo(text: string): Promise<Todo> {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("Failed to create todo");
    return res.json();
  },

  async toggleTodo(todo: Todo): Promise<Todo> {
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return res.json();
  },

  async deleteTodo(id: number): Promise<void> {
    const res = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete todo");
  }
};

// --- React Query Hooks ---
export const useTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: TodoSDK.fetchTodos,
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TodoSDK.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TodoSDK.toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: TodoSDK.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
