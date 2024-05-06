import styles from "./Header.module.css";
import logo from "../../assets/images/Logocopy.png"
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const logout = async () => {
        const api_url = 'http://localhost:3000/cms/user/logout';
        try {
            const response = await fetch(api_url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.message === 'LOGGED_OUT') {
                navigate('/login');
            }
        } catch (_) { }
    }
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <h4>Melody Insight</h4>
                <img className={styles.logoimg} src={logo} alt="" onClick={() => { navigate("/") }} />
            </div>
            <div>
                <button onClick={logout} href='#'>Log Out</button>
            </div>
        </div>
    )
}

export default Header