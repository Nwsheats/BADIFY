import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


//menu
const Header = () => {
return(
  <div className="ui black inverted stackable header menu">
    <h1 className="ui inverted black header">Badify</h1>
    {/*<h3 className="ui inverted black sub header">Bad Vibes Only</h3>*/}
     {/*image*/}
    <img className="ui small image" src=""></img>
 <a href="/" className="right link item">
Home
 </a>
 <a href="/" className="link item">
 Forum
 </a>
 <a href="/" className="link item">
  Profile
 </a>
 <a href="/" className="link item">
 Login
</a>
 </div>
 );
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
