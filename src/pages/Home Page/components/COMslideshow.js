import React from "react";
import "./Slideshow.css";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
import slide1 from "../../icons-imgs/slide1.png";
import slide2 from "../../icons-imgs/slide2.png";
import slide3 from "../../icons-imgs/slide3.png";
import slide4 from "../../icons-imgs/slide4.png";
import slide5 from "../../icons-imgs/slide5.png";


export default function Slideshow(){
  const images = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5
  ]
  return (
    <Slide>

      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[0]})` }}>
        </div>
      </div>

      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[1]})` }}>
        </div>
      </div>

      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[2]})` }}>
        </div>
      </div>

      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[3]})` }}>
        </div>
      </div>

      <div className="each-slide-effect">
        <div style={{ 'backgroundImage': `url(${images[4]})` }}>
        </div>
      </div>
    </Slide>
  )
}