import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Badify</Navbar.Brand>
          <Nav className="me-auto">
            <div className=""></div>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#forum">Forum</Nav.Link>
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        <Navbar fixed="top" />
      </Navbar>
    </>
  );
}

export default Header
