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
    handleDelete: (id:string)=> void;
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
        const updatedTodos = todos.map(task=>{
            if(task.id === id){
                return { ...task, ...updatedData };
            }
            return task;
        });
        setTodos(updatedTodos);
      }

    const handleDelete = (id:string)=>{
        // const updatedTodos = todos.map(task=>{
        //     if(task.id === id){
        //         const existingData = todos.filter(t=>t.id !== id);
        //         return existingData
        //     }
        // })
        setTodos((prev)=>{
            const newTodos = prev.filter((t)=> t.id !== id)
            return newTodos;
        })

    }

    return (
        <todosContext.Provider value={{todos, handleAddTodo, handleUpdateClick, handleDelete}}>
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