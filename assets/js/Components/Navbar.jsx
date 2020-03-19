import React, { useContext } from "react";
import AuthAPI from "../services/AuthAPI.Js";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { MDBIcon, MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink, MDBContainer, MDBRow, MDBBtn } from 'mdbreact';

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

         <MDBContainer>
          <MDBSideNav slim fixed mask="rgba-blue-strong" triggerOpening={this.state.sideNavLeft} breakWidth={1300}
            className="sn-bg-1">
            <li>
              <div className="logo-wrapper sn-ad-avatar-wrapper">
                <a href="#!">
                  <img alt="" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(10).jpg" className="rounded-circle" />
                  <span>Anna Deynah</span>
                </a>
              </div>
            </li>

            <MDBSideNavNav>
              <MDBSideNavLink to="/other-page" topLevel>
                <MDBIcon icon="pencil-alt" className="mr-2" />Submit listing</MDBSideNavLink>
              <MDBSideNavCat name="Submit blog" id="submit-blog" icon="chevron-right"  to="/customers">
                <MDBSideNavLink>Submit listing</MDBSideNavLink>
                <MDBSideNavLink>Registration form</MDBSideNavLink>
              </MDBSideNavCat>
              <MDBSideNavCat name="Instruction" id="instruction" icon="hand-pointer" to="/invoices">
                <MDBSideNavLink>For bloggers</MDBSideNavLink>
                <MDBSideNavLink>For authors</MDBSideNavLink>
              </MDBSideNavCat>
              <MDBSideNavCat name="About" id="about" icon="eye" to="/invoices">
                <MDBSideNavLink>Instruction</MDBSideNavLink>
                <MDBSideNavLink>Monthly meetings</MDBSideNavLink>
              </MDBSideNavCat>
              <MDBSideNavCat name="Contact me" id="contact-me" icon="envelope" to="/invoices">
                <MDBSideNavLink>FAQ</MDBSideNavLink>
                <MDBSideNavLink>Write a message</MDBSideNavLink>
              </MDBSideNavCat>
            </MDBSideNavNav>
          </MDBSideNav>
        </MDBContainer>
  

    

      
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
