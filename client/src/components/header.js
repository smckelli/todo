import { Link } from 'react-router-dom'
import Auth from '../utils/auth'

const Header = () => {
  const renderNavItem = () => {
    if (Auth.loggedIn()) {
      return (
        <a
          className="nav-link"
          aria-current="log out"
          href="#"
          onClick={Auth.logout}
        >
          Log out
        </a>
      )
    } else {
      return (
        <Link
          to="/login"
          className="nav-link"
          aria-current="log in"
        >
          Log In
        </Link>
      )
    }
  }

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="#">
          <strong><i class="bi bi-check-square-fill"/> TODOs</strong>
        </a>
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
          <li className="nav-item">
            { renderNavItem() }
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header