import React, { useContext } from "react";
import AuthAPI from "../services/AuthAPI.Js";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = ({ history }) => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  /**
   * Permet à l'utilisateur de ce deconnecter
   */
  const handleLogout = () => {
    AuthAPI.logout();
    setIsAuth(false);
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        AdoCRM
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div class="c-sidebar c-sidebar-dark c-sidebar-show">
  <ul class="c-sidebar-nav">
    <li class="c-sidebar-nav-title">Nav Title</li>
    <li class="c-sidebar-nav-item">
      <NavLink className="nav-link" to="/customers">
                Clients
      </NavLink>
    </li>
    <li class="c-sidebar-nav-item">
      <NavLink className="nav-link" to="/invoices">
              About
      </NavLink>
    </li>
    <li class="c-sidebar-nav-item nav-dropdown">
      <NavLink className="nav-link" to="/invoices">
             About
      </NavLink>
      <ul class="c-sidebar-nav-dropdown-items">
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="#">
            <i class="c-sidebar-nav-icon cil-puzzle"></i> Nav dropdown item
          </a>
        </li>
        <li class="c-sidebar-nav-item">
          <a class="c-sidebar-nav-link" href="#">
            <i class="c-sidebar-nav-icon cil-puzzle"></i> Nav dropdown item
          </a>
        </li>
      </ul>
    </li>
    <li class="c-sidebar-nav-item mt-auto">
      <a class="c-sidebar-nav-link c-sidebar-nav-link-success" href="https://coreui.io">
        <i class="c-sidebar-nav-icon cil-cloud-download"></i> Download CoreUI</a>
    </li>
    <li class="c-sidebar-nav-item">
      <a class="c-sidebar-nav-link c-sidebar-nav-link-danger" href="https://coreui.io/pro/">
        <i class="c-sidebar-nav-icon cil-layers"></i> Try CoreUI
        <strong>PRO</strong>
      </a>
    </li>
  </ul>
  <button class="c-sidebar-minimizer c-brand-minimizer" type="button"></button>

    

      
        <ul className="navbar-nav mr-auto">
          {(!isAuth && (
            <>
              <li className="c-sidebar-nav-item">
                <NavLink className="nav-link" to="/register">
                  Inscription
                </NavLink>
              </li>
              <li className="c-sidebar-nav-item">
                <NavLink className="btn btn-success" to="/login">
                  Connexion !
                </NavLink>
              </li>
            </>
          )) || (
            <li className="c-sidebar-nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Déconnexion !
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
