import style from "../Search/Search.module.css"
import logo from "../../assets/images/Logocopy.png"
import Card from "../Card/Card"
function Search() {
  return (
    <div className={style.container}>
        <div className={style.search}>
            <button className={style.searchbutton}>
                <img src={logo} alt="" />
            </button>
        </div>
        <div className={style.resultcontainer}>
           <Card/>
        </div>
    </div>
  )
}

export default Search