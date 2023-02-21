import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Container } from "react-bootstrap";
import { Button , Card , Form} from "react-bootstrap";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container className="signup">
    <Card>
      <Card.Body>
    <Card.Title className="d-flex flex-column py-2"><h1>Sign up</h1></Card.Title>
          <Form onSubmit={handleFormSubmit}>
          <div className= "username">
            <input
              className="form-input"
              placeholder="Your Username"
              name="username"
              type="username"
              id="username"
              value={formState.username}
              onChange={handleChange}
            />
            </div>
            <input
              className="form-input"
              placeholder="Your E-mail"
              name="email"
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
            />
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
            <Button className="btn" variant="dark" type="submit">
              Submit
            </Button>
            </div>
          </Form>

          {error && <div>Signup failed</div>}
    </Card.Body>
    </Card>
    </Container>
  );
};

export default Signup;
