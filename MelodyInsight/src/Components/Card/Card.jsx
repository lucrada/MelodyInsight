import style from "./Card.module.css"
import lnd from "../../assets/images/LND.jpg"

function Card({name}) {
  return (
    <div className={style.container} >
      <div className={style.image}>
        <img src={lnd} alt="" />
      </div>
      <div className={style.details}>
        <p>{name}</p>
      </div>

    </div>
  )
}

export default Card