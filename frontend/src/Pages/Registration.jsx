import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import BackendUrl from '../utils/BackendUrl';
import axios from "axios";

const Registration = () => {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput(values => ({ ...values, [name]: value }));
    console.log(input);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackendUrl}user/registration`;
    const response = await axios.post(api, input);
    console.log(response);
    alert(response.data.msg);
  };

  return (
    <>
      <h1 align="center">User Registration</h1>
      <Card style={{ width: "600px", margin: "20px auto", padding: "20px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleInput} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleInput} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleInput} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Registration;
