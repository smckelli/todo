// useQuery
import { useQuery } from '@apollo/client'

const TodoList = ({ todos }) => {
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