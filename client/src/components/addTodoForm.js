// useMutation ADD_TODO
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth';
import { ADD_TODO } from '../utils/mutations';

const AddTodoForm = () => {
  const { text: userParam } = useParams();
  const [addTodo] = useMutation(ADD_TODO);

  const todo = data?.todo || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/login" />;
  }

  const handleClick = async () => {
    try {
      await addTodo({
        variables: { id: todo._id },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form className="mb-5">
        <div className="mb-3">
          <input type="text" className="form-control fs-2" placeholder="New Todo..." />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary btn-block fs-3">Add</button>
        </div>
      </form>
    </>
  )
};

export default AddTodoForm