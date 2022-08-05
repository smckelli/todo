// useQuery use the useQuery hook
// read ALL_TODOS from database and use for map
import React from 'react';
import {useQuery } from '@apollo/client'
import { ALL_TODOS } from '../utils/queries';



const TodoList = ({ todos }) => {

  const { loading, error, data } = useQuery(ALL_TODOS); {
    variables: { todos }
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!todos.length) {
    return <h3>No Tasks Yet!</h3>;
  }
  return (
    <>
      <h2 className="text-secondary">Todo List:</h2>
      <ul className="list-group">
        {todos.map(todo => {
          const completeClass = todo?.complete ? 'text-decoration-line-through text-primary' : ''
          return (
            <li 
              className="list-group-item d-flex justify-content-between bg-dark text-light fs-4" 
              key={todo._id}
            >
              <div>
                <input
                  className="form-check-input me-3" 
                  type="checkbox" 
                  defaultChecked={todo.complete}
                />
                <label className={`form-check-label ${completeClass}`}>
                  {todo.text}
                </label>
              </div>
              <button className="btn btn-sm btn-danger">
                <i class="bi bi-trash3-fill" />
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default TodoList