
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function UserDashboard() {
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.clear();
        navigate("/login");
    }
    useEffect(()=>{
        if(!localStorage.getItem("username")){
            navigate("/login");
        }
    })
  return (
     <>
     <h1>welcome to user dashbord</h1>
     <div> welcome : {localStorage.getItem("username")} email : {localStorage.getItem("useremail")}</div>
     <a href="#" onClick={logout}>Logout</a>
     </>
  )
}

export default UserDashboard