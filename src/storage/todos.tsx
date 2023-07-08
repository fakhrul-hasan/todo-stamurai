"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
};
export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: Todo) => void;
  handleUpdateClick: (id: string, updatedData: object) => void;
  handleDelete: (id: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    
  const handleAddTodo = (task: Todo) => {
    setTodos((prev) => {
      const newTodos = [task, ...prev];
    localStorage.setItem('todos', JSON.stringify(newTodos))
      return newTodos;
    });
  };

  const handleUpdateClick = (id: string, updatedData: object) => {
    const updatedTodos = todos.map((task) => {
      if (task.id === id) {
        return { ...task, ...updatedData };
      }
      return task;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
    setTodos(updatedTodos);
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((t) => t.id !== id);
      localStorage.setItem('todos', JSON.stringify(newTodos))
      return newTodos;
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, handleAddTodo, handleUpdateClick, handleDelete }}
    >
      {children}
    </todosContext.Provider>
  );
};

export function useTodos() {
  const todosContextValue = useContext(todosContext);
  if (!todosContextValue) {
    throw new Error("UseTodos used outside of Provider");
  }
  return todosContextValue;
}
