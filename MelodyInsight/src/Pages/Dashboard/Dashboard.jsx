import { Outlet } from "react-router-dom"
import Header from "../../Components/Header/Header"
import { useEffect } from 'react';
import style from "./Dashboard.module.css"
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

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
      if (!(await isAuthenticated())) {
        navigate('/login');
      }
    };
    checkAuthentication();
  }, [navigate]);

  return (
    <div className={style.dashboard}>
      <Header />
      <Outlet />

    </div>
  )
}

export default Dashboard