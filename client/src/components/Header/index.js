import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';



function Header() {
  function showLogin() {
    if (Auth.loggedIn()) {
    return (
    <>
        <Nav className="me-auto">
          <div className="header-menu">
            <Link to="/">Home</Link>
            <Link to="/Profile">Profile</Link>
            <li className="mx-1">
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </li>
          </div>
        </Nav>
    </>
  );
    } else {
      return (
      <Nav className="me-auto">
      <div className="header-menu">
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Signup</Link>
      </div>
      </Nav>
      );
    }
}

  return (
    <>
    <Navbar className="d-flex justify-content-between" bg="dark" variant="dark">
      <Navbar.Brand href="#home"><img className="logo" src="./Logo.png" alt="" /></Navbar.Brand>
      <Nav>{showLogin()}</Nav>
      <Navbar fixed="top" />
    </Navbar>
  </>
  )
}

export default Header
