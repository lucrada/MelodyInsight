import React from 'react'
import sliderimg1 from "../../assets/images/slider1.jpg"
import sliderimg2 from "../../assets/images/slider2.jpg"
import sliderimg3 from "../../assets/images/slider3.jpg"
import logo from "../../assets/images/Logocopy.png"

import "../Slider/Slider.css"
function Slider() {
  return (
    <main className="slider">
           <div className="slider1">
            
            <img className="SliderImg"src={sliderimg1} alt="music crowd" />
            <h1 className='slider1_text'>Heard A Song?</h1>
           </div>
           <div className="slider2">
            <img className="SliderImg"src={sliderimg2} alt="headphones" />
            <h1 className='slider2_text'>Not So Sure About its name?</h1>
           </div>
           <div className="slider3">
            <img className="SliderImg"src={sliderimg3} alt="headphones" />
            <h1 className='slider3_text'>Relax! We heard that too!!</h1>
           </div>
           <div className="slider4">
           
            <h1 className='slider4_text'>Introducing Melody Insight!</h1>
             <img src={logo} alt="logo" />
             <h2>Your Unknown Song is now just one Click Away!</h2>
           </div>
        </main>
  )
}

export default Slider