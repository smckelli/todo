// useQuery use the useQuery hook
// read ALL_TODOS from database and use for map
import React from 'react';
import { useParams } from 'react-router-dom'
import {useQuery, useMutation } from '@apollo/client'
import { ALL_TODOS } from '../utils/queries';
import { DELETE_TODO } from '../utils/mutations';

const TodoList = ({ todos }) => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(ALL_TODOS, {
    variables: {
      _id: id
    }
  });

  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [
        {query: ALL_TODOS}, // DocumentNode object parsed with gql
        'ALL_TODOS' // Query name
    ],
  });

  const removeTodo = async (_id) => {
    await deleteTodo({
        variables: {_id}
    })
  }


  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(data)

  // if (!data.todos.length) {
  //   return <h3>No Tasks Yet!</h3>;
  // }
  return (
    <>
      <h2 className="text-secondary">Todo List:</h2>
      <ul className="list-group">
        {data.todos.map((todo, i) => {
          const completeClass = todo?.complete ? 'text-decoration-line-through text-primary' : ''
          return (
            <li 
              className="list-group-item d-flex justify-content-between bg-dark text-light fs-4" 
              key={`${todo._id}-${i}`}>
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
              <button className="btn btn-sm btn-danger"
              onClick={() => {
                return removeTodo(todo._id);
              }}>
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