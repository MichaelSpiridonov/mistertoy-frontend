import { NavLink, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { LoginSignup } from "../pages/LoginSignup.jsx"
import { logout } from "../store/actions/user.actions.js"

export function AppHeader() {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  const navigate = useNavigate()
  async function onLogout() {
    try {
      await logout()
      showSuccessMsg("Logout successfully")
      navigate("/")
    } catch (err) {
      console.log("err:", err)
      showErrorMsg("Cannot logout")
    }
  }

  return (
    <header className="app-header full main-layout">
      <section className="app-nav">
        <h1 className="logo">Mister Toy</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/toy">Toys</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </section>
      {user && (
        <section className="user-info">
          {/* <p>
            {user.fullname} <span>${user.score.toLocaleString()}</span>
          </p> */}
          <button onClick={onLogout}>Logout</button>
        </section>
      )}
      {!user && (
        <section className="user-info">
          <LoginSignup />
        </section>
      )}
    </header>
  )
}
