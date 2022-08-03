import { useState } from 'react'
import { LOGIN } from '../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../utils/auth'

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN);

  const handleSubmit = async e => {
    e.preventDefault()
    const { data } = await login({
      variables: {
        username,
        password
      }
    })
    Auth.login(data.login.token)
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form 
        onSubmit={handleSubmit}
        className="card-body"
      >
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input 
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="form-control bg-dark text-light"
            placeholder="Username"
            type="text"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input 
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control bg-dark text-light"
            placeholder="Password"
            type="password"
            required
          />
        </div>
        <button 
          className="btn btn-primary"
          type="submit"
        >Log in</button>
      </form>
    </div>
  )
};

export default Login;