// useMutation ADD_TODO
import React from 'react';
import { useMutation } from '@apollo/client'
import { ADD_TODO } from '../utils/mutations'
import { TODO, ALL_TODOS } from '../../utils/queries';



function AddTodoForm() {
  let input;
  const [addTodo] = useMutation(ADD_TODO, {
    update(
      cache,
      {
        data: { addTodo }
      }
    ) {

      try {
        // update me array's cache
        const { addTodo } = cache.readQuery({ query: ALL_TODOS });
        cache.writeQuery({
          query: ALL_TODOS,
          data: { todo: { ...todo, text: [...todo.text, addTodo] } },
        });
      } catch (e) {
        console.warn("First thought insertion by user!")
      }

      const { todos } = cache.readQuery({ query: TODO});
      cache.writeQuery({
        query: TODO,
        data: { todos: [addTodo, ...todos] },
      });
    }

  });




  return (
    <>
      <form className="mb-5"
              onSubmit={e => {
                e.preventDefault();
                addTodo({ variables: { type: input.value } });
                input.value = "";
              }}
      >
        <div className="mb-3">
          <input type="text" className="form-control fs-2" placeholder="New Todo..." 
            ref={node => {
            input = node;
          }} />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-block fs-3">Add</button>
        </div>
      </form>
    </>
  )
};

export default AddTodoForm