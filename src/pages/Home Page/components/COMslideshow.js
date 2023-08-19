import React from "react";
import "./Slideshow.css";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'

export default function Slideshow(){
  const images = [
    "https://media.istockphoto.com/id/1136478527/vector/police-officers-and-car-flat-vector-illustration.jpg?s=612x612&w=0&k=20&c=DUjApSmnM2TmJCocAfOEb6riGiW3NuyVfCgymgN_5RQ=",
    "https://cdn4.vectorstock.com/i/1000x1000/33/58/traffic-police-checkpoint-vector-13333358.jpg",
    "https://t4.ftcdn.net/jpg/02/63/42/55/360_F_263425530_hvjZuZbDoeskyFfJ8EjxLEZTFV98pMtM.jpg"
  ]
  return (
    <Slide>

      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[0]})` }}>
            <span>Slide 1</span>
        </div>
      </div>

      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[1]})` }}>
            <span>Slide 2</span>
        </div>
      </div>

      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[2]})` }}>
            <span>Slide 3</span>
        </div>
      </div>
    </Slide>
  )
}