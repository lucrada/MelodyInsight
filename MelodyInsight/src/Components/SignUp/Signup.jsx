import { useState } from 'react'
import Signupstyles from "../SignUp/Signup.module.css"
import logo from "../../assets/images/Logo.png"
function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(password);

  return (
    <div className={Signupstyles.container}>
        <div className={Signupstyles.mainheading}><h1>Create An Account</h1></div>
        <form className={Signupstyles.form} action="">
          <div className={Signupstyles.name}>
            <label htmlFor="name">Enter your name </label>
            <input type="text" placeholder='name' value={name} onChange={(e)=>{setName(e.target.value)}} />
          </div>
          <div className={Signupstyles.username}>
            <label htmlFor="username">Enter your Username</label>
            <input type="text" placeholder='username' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
          </div>
          <div className={Signupstyles.email} >
            <label htmlFor="email">Enter your Email</label>
            <input type="text" placeholder='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          </div>

          <div className={Signupstyles.password}>
            <label htmlFor="Password">Enter your Password</label>
            <input type="text" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          <div className={Signupstyles.btncontainer}>
          <button className={Signupstyles.btn}>Register</button>
          </div>

        </form>
        <div className={Signupstyles.sidecontent}>
            <h2>WELCOME TO</h2>
            <img src={logo} alt="" />
                <h3>MELODY INSIGHT</h3>

                <h4>Your Unknown Song is now just one Click Away!</h4>
        </div>
    </div>
  )
}

export default Signup