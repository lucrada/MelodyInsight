
import loginStyles from "./Login.module.css"
import logo from "../../assets/images/Logo.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

// A Login page created using controlled form elements

function Login() {
    const navigate = useNavigate();
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    // console.log(username , password)
    const handleSubmit = (e)=>{
    e.preventDefault();
    navigate("/dashboard")
    }
  return (
    <div className={loginStyles.container}>
        <h1 className={loginStyles.mainHeading}>LogIn</h1>
        <form className={loginStyles.form}>
         <div className={loginStyles.username}>
            <label htmlFor="usename">Username</label>
            <input type="text" id="username" placeholder="Enter username" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
         </div>
         <div className={loginStyles.password}>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Password"id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
         </div>
         <div className={loginStyles.login}>
         <button className={loginStyles.btn}type="submit" onClick={handleSubmit}>LogIN</button>
         </div>
         
        </form>
        <div className={loginStyles.sideimage}>
            <div className={loginStyles.logo}>
                <img className={loginStyles.logoImg}src={logo} alt="" />
                <h2>MELODY INSIGHT</h2>
            </div>
         </div>
    </div>
  )
}

export default Login