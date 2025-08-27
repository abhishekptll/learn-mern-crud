import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BackendUrl from "../utils/BackendUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BackendUrl}user/login`;

    try {
      const response = await axios.post(api, input);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        alert(response.data);
      }
    } catch (err) {
      console.log(err);
      alert("Login failed!");
    }
  };

  return (
    <>
      <h1 align="center"> User Login </h1>
      <Form style={{ width: "600px", margin: "auto" }}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleInput} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </>
  );
};

export default Login;
