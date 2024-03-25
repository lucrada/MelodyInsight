

import { Outlet, useNavigate } from 'react-router-dom'
// import Home from './Pages/Home/Home'

import './Pages/Home/Home.css'


// import sliderimg4 from '../../assets/images/slider4.jpg'
import logo from "./assets/images/Logocopy.png"



function App() {
   
  const navigate = useNavigate();  
  const loginHandler = (e)=>{
       navigate("/login")
    }
    const signupHandler = (e)=>{
        navigate("/signup")
     }

     const toHome = ()=>{
      navigate("/")
    }
     
 return <>
<div className='container'>
      <header className='top'>
        <nav className='navbar'>
         <div className='navLeft'>
         <img src={logo} alt="" onClick={toHome}/>
         <h2>Melody Insight</h2>
        
        </div> 
        <div className='navCenter'>
        <button onClick={loginHandler}>LogIn</button>
        <button onClick={signupHandler}>SignUp</button>
        </div>
        <div className='navRight'>
        <button>Search</button>
        </div>
        </nav>
        
      </header>
  {/* Slider Component Starts here  */}

      <Outlet/>

        <div className="footer">
          Footer
        </div>
    </div>
 </> 
}

export default App;

