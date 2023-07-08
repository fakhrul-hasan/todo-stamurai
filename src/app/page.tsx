import AddTodo from '@/components/add-todo';
import Todos from '@/components/todos';
import React from 'react';

const page = () => {
  return (
    <div>
      <h2>Task Management</h2>
      <AddTodo />
      <Todos />
    </div>
  );
};

export default page;