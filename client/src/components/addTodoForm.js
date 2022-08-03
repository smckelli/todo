// useMutation ADD_TODO
import { useMutation } from '@apollo/client'

const AddTodoForm = () => {
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
}

export default AddTodoForm