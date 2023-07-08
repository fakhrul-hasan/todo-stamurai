'use client'
import { Todo, useTodos } from '@/storage/todos';
import { ChangeEvent, FormEvent, useState } from 'react';

const AddTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const {handleAddTodo} = useTodos();

    const handleForm = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const todo:Todo = {
            id: Math.random().toString(),
            title: title,
            description: description,
            status: status,
            createdAt: new Date()
        }
        handleAddTodo(todo);
    }

    return (
        <form onSubmit={handleForm} className='border-2 p-4 flex justify-between gap-4 mb-4'>
            <input className='input input-bordered w-1/2' type="text" name='' placeholder='Task title' value={title} onChange={(event)=> setTitle(event.target.value)} id='' />
            <input className='input input-bordered w-full' type="text" name='' placeholder='Task description' value={description} onChange={(event)=> setDescription(event.target.value)} id='' />
            <select className='input input-bordered' defaultValue='default' onChange={(event)=> setStatus(event.target.value)}>
                <option value="default" disabled>Choose a status</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button className='btn btn-info' type="submit">Add</button>
        </form>
    );
};

export default AddTodo;