import AddTodo from '@/components/add-todo';
import Todos from '@/components/todos';
import React from 'react';

const page = () => {
  return (
    <div>
      <h2 className='font-bold text-5xl text-center my-2'>Task Management</h2>
      <AddTodo />
      <Todos />
    </div>
  );
};

export default page;