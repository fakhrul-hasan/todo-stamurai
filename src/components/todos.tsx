'use client'

import { useTodos } from "@/storage/todos";
import { useState } from "react";

const Todos = () => {
    const {todos, handleUpdateClick, handleDelete} = useTodos();
    console.log(todos);
    const [editingId, setEditingId] = useState(null);
    const handleEditClick = (id) => {
        setEditingId(id);
      };
    
    let filterTodos = todos;
    return (
        <div className="overflow-x-auto">
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
            filterTodos.map((todo, index)=><tr key={todo.id}>
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