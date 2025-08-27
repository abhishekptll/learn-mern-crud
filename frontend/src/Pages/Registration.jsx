import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BackendUrl from "../utils/BackendUrl";
import axios from "axios";

const Registration = () => {
  const [input, setInput] = useState({});

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackendUrl}user/registration`;

    try {
      const response = await axios.post(api, input);
      alert(response.data.msg);
    } catch (err) {
      console.log(err);
      alert("Registration failed!");
    }
  };

  return (
    <>
      <h1 align="center"> User Registration </h1>
      <Form style={{ width: "600px", margin: "auto" }}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control type="text" name="name" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleInput} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Registration;
