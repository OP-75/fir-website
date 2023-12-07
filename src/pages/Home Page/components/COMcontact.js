import React from "react";
import "./Contact.css"

function submitFun(){
    alert("Thank you for your response!")
}
export default function Contact(){
    return (
    <>
    <div className="contactUs">
        <div className="sideImg">
            <div className="articles">
                <h3>News Articles for you!</h3>
                <marquee scrollamount="5" bgcolor="#ededed" direction="up">
                    <ul id="sideLinks">
                    <li><a href="https://www.mahapolice.gov.in/police-patil/">Police Patil: In a city around you!</a></li>
                    <li><a href="https://www.mahapolice.gov.in/senior-citizens-corner/">Senior Citizen Corner</a></li>
                    <li><a href="https://www.mahapolice.gov.in/anti-terrorism-squad/">Anti-Terrorism Squad</a></li>
                    <li><a href="https://www.mahapolice.gov.in/protection-of-civil-rights/">Protection of Civil Rights</a></li>
                    <li><a href="https://www.mahapolice.gov.in/rti-information/">Right to Information</a></li>
                    <li><a href="https://www.mahapolice.gov.in/dakshata-magazine/">Dakshata Magzine</a></li>
                    </ul>
                </marquee>
            </div>
        </div>

        <div className="contactForm">
        <form className="form-container">
            <h2>Contact Us</h2>
            <input type="text" name="fullname" placeholder="Enter your full name" required />
            <input type="tel" name="mobile" placeholder="Enter your mobile number" required />
            <input type="email" name="email" placeholder="Enter your email" required />
            <textarea name="message" placeholder="Enter your message"></textarea>
            <input type="submit" value="Submit" onClick={submitFun} />
        </form>
        </div>
    </div>
    </>
    )
}