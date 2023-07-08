'use client'

import { useTodos } from "@/storage/todos";
import { useState } from "react";

const Todos = () => {
    const {todos, handleUpdateClick, handleDelete} = useTodos();
    const [filterStatus, setFilterStatus] = useState('All');
    const [editingId, setEditingId] = useState(null);
    const handleEditClick = (id) => {
        setEditingId(id);
      };
    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
      };
    
    const filteredTodos = filterStatus === 'All' ? todos : todos.filter((todo) => todo.status === filterStatus);
    return (
        <div className="overflow-x-auto">
            <div className="flex justify-between border-b-4 pb-2">
                <h3 className="font-medium text-3xl">Tasks</h3>
            <select className="input input-bordered" defaultValue='default' onChange={handleFilterChange}>
                <option value="default">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            </div>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        <th>Title</th>
        <th>Description</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        {
            filteredTodos.map((todo, index)=><tr key={todo.id}>
                <th>
                  {index+1}
                </th>
                <td>
                {editingId === todo.id ? (
                <input
                className="input input-bordered"
                  type="text"
                  defaultValue={todo.title}
                  onChange={(e) =>
                    handleUpdateClick(todo.id, { title: e.target.value })
                  }
                />
              ) : (
                todo.title
              )}
                </td>
                <td>
                {editingId === todo.id ? (
                <input
                className="input input-bordered"
                  type="text"
                  defaultValue={todo.description}
                  onChange={(e) =>
                    handleUpdateClick(todo.id, { description: e.target.value })
                  }
                />
              ) : (
                todo.description
              )}
                </td>
                <td>
                {editingId === todo.id ? (
                <select defaultValue={todo.status} onChange={(e)=> handleUpdateClick(todo.id, { status: e.target.value })}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
              ) : (
                todo.status
              )}
                </td>
                <th>
                {editingId === todo.id ? (
                <button
                  onClick={() => setEditingId(null)}
                  className="btn btn-warning btn-xs mr-2"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={() => handleEditClick(todo.id)}
                  className="btn btn-success btn-xs mr-2"
                >
                  Edit
                </button>
              )}
                  <button onClick={()=> handleDelete(todo.id)} className="btn btn-error btn-xs">delete</button>
                </th>
              </tr>)
        }
    </tbody>
    
  </table>
</div>
    );
};

export default Todos;