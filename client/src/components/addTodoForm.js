// useMutation ADD_TODO
import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
import { ADD_TODO } from '../utils/mutations'
import { TODO, ALL_TODOS } from '../utils/queries';



function AddTodoForm() {

  const [ text, setText] = useState('');

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
          data: { todos: { ...addTodo, text: [...addTodo.text, addTodo] } },
        });
      } catch (e) {
        console.warn("First 'to do' insertion by user!")
      }

      const { todos } = cache.readQuery({ query: TODO});
      cache.writeQuery({
        query: TODO,
        data: { todos: [addTodo, ...todos] },
      });
    }

  });

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
    }
  };

    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        await addTodo({
          variables: { text },
        });
  
        // clear form value
        setText('');
      } catch (e) {
        console.error(e);
      }
    };

  return (
    <>
      <form className="mb-5"
      onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control fs-2" placeholder="New Todo..." 
            onChange={handleChange} />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-block fs-3">Add</button>
        </div>
      </form>
    </>
  )
};

export default AddTodoForm