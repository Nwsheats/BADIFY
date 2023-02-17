import React from 'react'


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
}

export default Header
