import { NavLink } from "react-router";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navigation() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top w-100">
                <div className="container">
                    <NavLink className={({ isActive }) => (isActive ? "navbar-brand fw-bold active" : "navbar-brand fw-bold")} to="/">
                        My Notes App
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mainNavbar">
                        <ul className="navbar-nav ms-3">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link text-white active" : "nav-link text-white")} to="/">
                                    <i className="bi bi-house-door-fill"></i> ALL NOTES
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link text-white active" : "nav-link text-white")} to="/add">
                                    <i className="bi bi-plus"></i> ADD NOTE
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className={({ isActive }) => (isActive ? "nav-link text-white active" : "nav-link text-white")} to="/categories">
                                    <i className="bi bi-grid"></i> CATEGORIES
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navigation;
