import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";



//menu
// const Header = () => {
// return(
//   <div className="ui black inverted stackable header menu">
//     <h1 className="ui inverted black header">Badify</h1>
//     {/*<h3 className="ui inverted black sub header">Bad Vibes Only</h3>*/}
//      {/*image*/}
//     <img className="ui small image" src=""></img>
//  <a href="/" className="right link item">
// Home
//  </a>
//  <a href="/" className="link item">
//  Forum
//  </a>
//  <a href="/" className="link item">
//   Profile
//  </a>
//  <a href="/" className="link item">
//  Login
// </a>
//  </div>
//  );

function Header() {
  return (
    <>
      <Navbar className="d-flex justify-content-between" bg="dark" variant="dark">
        <Navbar.Brand href="#home"><img className="logo" src="./Logo.png" alt="" /></Navbar.Brand>
        <Nav className="me-auto">
          <div className="header-menu">
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Signup">Signup</Link>
            <Link to="/Profile">Profile</Link>
          </div>
        </Nav>
        <Navbar fixed="top" />
      </Navbar>
    </>
  );
}

export default Header
