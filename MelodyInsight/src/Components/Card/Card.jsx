import style from "./Card.module.css"
import lnd from "../../assets/images/LND.jpg"
function Card() {
  return (
    <div className={style.container} >
        <div className={style.image}>
            <img src={lnd} alt="" />
        </div>
        <div className={style.details}>
            <h3>Legends never Die</h3>
            <h3>by League Of Legends</h3>
        </div>

    </div>
  )
}

export default Card