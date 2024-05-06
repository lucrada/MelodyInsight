
import loginStyles from "./Login.module.css"
import logo from "../../assets/images/Logo.png"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

// A Login page created using controlled form elements

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isValidCredentials = (username, password) => {
    if (username.trim().length === 0) {
      return false;
    }
    if (password.trim().length === 0) {
      return false;
    }
    return true;
  }

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

  const login = async () => {
    const api_url = 'http://localhost:3000/cms/user/login';
    const body = { credentials: { username, password } };
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
      if (data.message === 'LOGGED_IN') {
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidCredentials(username, password)) {
      return;
    }
    if (await login(username, password)) {
      navigate("/dashboard");
    } else {
      alert('Invalid Credentials!');
    }
  };

  return (
    <div className={loginStyles.container}>
      <h1 className={loginStyles.mainHeading}>LogIn</h1>
      <form className={loginStyles.form}>
        <div className={loginStyles.username}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" onChange={(e) => { setUsername(e.target.value) }} value={username} />
        </div>
        <div className={loginStyles.password}>
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Enter Password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <div className={loginStyles.login}>
          <button className={loginStyles.btn} type="submit" onClick={handleSubmit}>LogIN</button>
        </div>

      </form>
      <div className={loginStyles.sideimage}>
        <div className={loginStyles.logo}>
          <img className={loginStyles.logoImg} src={logo} alt="" />
          <h2>MELODY INSIGHT</h2>
        </div>
      </div>
    </div>
  )
}

export default Login