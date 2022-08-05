// useMutation ADD_TODO
import React, { useState } from 'react';
import { useMutation } from '@apollo/client'
import { ADD_TODO  } from '../utils/mutations'
import { ALL_TODOS } from '../utils/queries';
import Auth from '../utils/auth'



function AddTodoForm() {
 const user = Auth.getLoggedInUser()
//  console.log(user)
  const [ text, setText] = useState('');

  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [
      {query: ALL_TODOS}, // Document Node object parsed with gql
      'ALL_TODOS' // Query name
    ],

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
          variables: { text, _id: user._id },
        });
  
        // clear form value
        setText(" ");
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