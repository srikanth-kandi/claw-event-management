import { NavLink, Link, Outlet } from "react-router-dom";
import logo from "/logo.png";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="home-link">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-10 mr-4" />
            <h1 className="text-[22px] font-bold">Event Management</h1>
          </div>
        </Link>
        <ul className="nav-items-ul">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Logout</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
