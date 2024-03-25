import styles from "./Header.module.css";
import logo from "../../assets/images/Logocopy.png"
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
        <div className={styles.logo}>
            <h4>Melody Insight</h4>
            <img className={styles.logoimg} src={logo} alt="" onClick={()=>{navigate("/")}}/>
        </div>
        <div>
            <h4>Search</h4>
        </div>
        <div>
            <h4>Library</h4>
        </div>
        <div>
            <h4>Trending</h4>
        </div>
        <div>
            <h4>Favourites</h4>
        </div>
    </div>
  )
}

export default Header