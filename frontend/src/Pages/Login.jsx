import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import BackendUrl from '../utils/BackendUrl';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    console.log(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackendUrl}user/login`;
    const response = await axios.post(api, input);
    console.log(response);
    if (response.status === 202) {
       localStorage.setItem("username", response.data.user.name);
       localStorage.setItem("useremail", response.data.user.email);
      
      alert(`welcome  ${ response.data.user.name} your id is  ${ response.data.user.email} ` );
      navigate("/dashboard");
    } 
    console.log(response.data.user.email);
  };

  return (
    <>
      <h1 align="center">User Login</h1>
      <Card style={{ width: "600px", margin: "20px auto", padding: "20px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleInput} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleInput} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Login;
