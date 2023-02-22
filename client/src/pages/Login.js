import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-react'; 
import { Button , Card , Container , Form } from "react-bootstrap";



import Auth from "../utils/auth";


const Login = (props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <Container className="login">
    <Card>
      <Card.Body>
    <Card.Title className="d-flex flex-column py-2"><h1>Login</h1></Card.Title>
    
            <Form onSubmit={handleFormSubmit}>
              <div className= "username">
              <input
                className="form-input"
                placeholder="Username"
                name="username"
                type="username"
                id="username"
                value={formState.username}
                onChange={handleChange}
              />
              </div>
              <div className= "password">
              <input
                className="form-input"
                placeholder="Password"
                name="password"
                type="password"
                id="password"
                value={formState.password}
                onChange={handleChange}
              />
              </div>
            <div>
            <Button className="btn" variant="info" type="submit">
              Submit
            </Button>
              </div>
            </Form>
            {error && <div>Login failed</div>}
        </Card.Body>
    </Card>
    </Container>
  );
};

export default Login;
