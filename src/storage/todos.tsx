'use client'
import { ReactNode, createContext, useContext, useState } from "react";

export type Todo = {
    id:string;
    title:string;
    description:string;
    status:string;
    createdAt:Date;
}
export type TodosContext={
    todos:Todo[];
    handleAddTodo: (task:Todo)=> void;
    handleUpdateClick: (id:string, updatedData:object)=> void;
}

export const todosContext = createContext<TodosContext | null>(null)

export const TodosProvider = ({children}: {children:ReactNode}) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const handleAddTodo=(task:Todo)=>{

        setTodos((prev)=>{
            const newTodos = [task,...prev]
        return newTodos;
    })
    }

    const handleUpdateClick = (id:string, updatedData:object) => {
        console.log(id);
        console.log(updatedData);
        const updatedTodos = todos.map(task=>{
            if(task.id === id){
                return { ...task, ...updatedData };
            }
            return task;
        });
        setTodos(updatedTodos);
      }

    return (
        <todosContext.Provider value={{todos, handleAddTodo, handleUpdateClick}}>
            {children}
        </todosContext.Provider>
    )
}

export function useTodos(){
    const todosContextValue = useContext(todosContext)
    if(!todosContextValue){
        throw new Error('UseTodos used outside of Provider')
    }
    return todosContextValue;
}