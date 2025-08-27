import axios from "axios";
import { useEffect } from "react";
import BackendUrl from "../utils/BackendUrl";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  let api = `${BackendUrl}user/userauth`;

  const userAuthenticate = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.post(
          api,
          {},
          { headers: { "x-auth-token": token } }
        );

        localStorage.setItem("username", response.data.user.name);
        localStorage.setItem("useremail", response.data.user.email);
        navigate("/dashboard");
      } catch (err) {
        console.log("Auth Failed:", err.response?.data || err.message);
      }
    }
  };

  useEffect(() => {
    userAuthenticate();
  }, []);

  return (
    <>
      <h1> Welcome To Home Page</h1>
    </>
  );
};

export default Home;
