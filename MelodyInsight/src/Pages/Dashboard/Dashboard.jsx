import { Outlet } from "react-router-dom"
import Header from "../../Components/Header/Header"

import style from "./Dashboard.module.css"


function Dashboard() {
  return (
    <div className={style.dashboard}>
        <Header/>
        <Outlet/>

    </div>
  )
}

export default Dashboard