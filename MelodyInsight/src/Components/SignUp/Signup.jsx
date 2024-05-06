import { useState, useEffect } from 'react'
import Signupstyles from "../SignUp/Signup.module.css"
import logo from "../../assets/images/Logo.png"
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = async () => {
    const api_url = 'http://localhost:3000/cms/user/isLoggedIn';
    try {
      const response = await fetch(api_url, {
        method: 'GET',
        credentials: 'include',
      });
      let data = await response.json();
      if (data.message === 'LOGGED_IN') {
        return true;
      }
    } catch (_) {
      return false;
    }
    return false;
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (await isAuthenticated()) {
        navigate('/dashboard');
      }
    };
    checkAuthentication();
  }, [navigate]);

  const isValidCredentials = () => {
    if (name.trim().length === 0) {
      return false;
    }
    if (username.trim().length === 0) {
      return false;
    }
    if (email.trim().length === 0) {
      return false;
    }
    if (password.trim().length === 0) {
      return false;
    }
    return true;
  }

  const register = async (member) => {
    const api_url = 'http://localhost:3000/cms/user/register';
    const body = { member };
    try {
      const response = await fetch(api_url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data.message);
      if (data.message === 'REG_SUCCESS') {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!isValidCredentials(name, username, email, password)) {
      return;
    }
    if (await register({ name, username, email, password })) {
      navigate("/dashboard");
    } else {
      alert('Please provide valid details');
    }
  }

  return (
    <div className={Signupstyles.container}>
      <div className={Signupstyles.mainheading}><h1>Create An Account</h1></div>
      <form className={Signupstyles.form} action="">
        <div className={Signupstyles.name}>
          <label htmlFor="name">Enter your name </label>
          <input type="text" placeholder='name' value={name} onChange={(e) => { setName(e.target.value) }} />
        </div>
        <div className={Signupstyles.username}>
          <label htmlFor="username">Enter your Username</label>
          <input type="text" placeholder='username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
        </div>
        <div className={Signupstyles.email} >
          <label htmlFor="email">Enter your Email</label>
          <input type="text" placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </div>

        <div className={Signupstyles.password}>
          <label htmlFor="Password">Enter your Password</label>
          <input type="text" placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className={Signupstyles.btncontainer}>
          <button className={Signupstyles.btn} onClick={submitForm}>Register</button>
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