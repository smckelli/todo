import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { USER } from '../utils/queries'
import Auth from '../utils/auth'
import AddTodoForm from '../components/addTodoForm'
import TodoList from '../components/todoList'

// TODO: this is just a hard-coded list of TODOs. You'll need to query the logged in user's TODOs from the database.
const todos = [
  // {
  //   _id: 1,
  //   text: 'Create a Todo model',
  //   complete: false,
  // },
  // {
  //   _id: 2,
  //   text: 'Update your GraphQL TypeDefs and Resolvers to work with Todo model',
  //   complete: false,
  // },
  // {
  //   _id: 3,
  //   text: 'Update Client to CREATE Todos',
  //   complete: false,
  // },
  // {
  //   _id: 4,
  //   text: 'Update Client to READ Todos from backend',
  //   complete: false,
  // },
  // {
  //   _id: 5,
  //   text: 'Update Client to UPDATE Todos (marking Todo complete or not)',
  //   complete: false,
  // },
  // {
  //   _id: 6,
  //   text: 'Update Client to DELETE Todos from backend',
  //   complete: false,
  // },
  // {
  //   _id: 97,
  //   text: 'Create descriptive repository README.md',
  //   complete: false,
  // },
  // {
  //   _id: 98,
  //   text: 'Deploy to Heroku',
  //   complete: false,
  // },
  // {
  //   _id: 99,
  //   text: 'Record 10-minute video presentation',
  //   complete: false,
  // },
  // {
  //   _id: 100,
  //   text: 'Example of a completed Todo',
  //   complete: true,
  // },
]

const Dashboard = () => {
  const navigate = useNavigate()
  
  const currentUser = Auth.loggedIn()

  const { loading, error, data } = useQuery(USER, {
    variables: {
      _id: currentUser?.data?._id
    }
  })

  if (!currentUser) {
    navigate('/login')
  }

  if (loading) return (
    <div className="container d-flex justify-content-center mt-3">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
  if (error) return (
    <div className="container mt-3">
      <div class="alert alert-danger" role="alert">
        Error! {error.message}
      </div>
    </div>
  )

  const user = data?.user

  if (!user) {
    return 'No user found'
  }

  return (
    <div className="container mt-3">
      <h1 className="text-primary">{user.username}'s TODOs:</h1>
      <AddTodoForm />
      <TodoList todos={todos} />
    </div>
  )
}

export default Dashboard