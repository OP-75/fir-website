import React from "react";
import "./Contact.css"
import bgImg from "./police.jpg"

function submitFun(){
    alert("Thank you for your response!")
}
export default function Contact(){
    return (
    <>
    <div className="contactUs">
        <div className="sideImg">
            {/* <img src={bgImg} alt="" /> */}
    {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.153611779664!2d73.87089417433648!3d18.52195922422183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c05af2b66179%3A0x9010e142cd1b630e!2sPolice%20Commissioner%20Office%20of%20Pune%20City!5e0!3m2!1sen!2sin!4v1692023444175!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            <div className="articles">
                <h3>News Articles for you!</h3>
                <marquee scrollamount="5" bgcolor="#ededed" height="180px" 
                width="550px" direction="up">
                    <ul id="sideLinks">
                    <li>Police</li>
                    <li>Police</li>
                    <li>Police</li>
                    <li>Police</li>
                    </ul>
                </marquee>
            </div>
        </div>

        <div className="contactForm">
        <form>
            <h2>Contact Us</h2>
            <input type="text" name="fullname" placeholder="Enter your full name" required/>
            <input type="number" name="mobile" placeholder="Enter your mobile number" required/>
            <input type="text" name="email" placeholder="Enter your email" required/>
            <textarea name="message" placeholder="Enter your message"></textarea>
            <input type="submit" value="Submit" onClick={submitFun}/>
        </form>
        </div>
    </div>
    </>
    )
}