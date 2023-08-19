import commi from "./Commissioner.jpg";
import sp from "./SP.jpg";
import React, {useState} from "react";
import Navbar from './components/COMnavbar';
import Welcome from './components/COMwelcome';
import Cards from './components/COMcards';
import Contact from './components/COMcontact';
import Footer from './components/COMfooter';
import Slideshow from "./components/COMslideshow";
import './Homepage.css';


export const ThemeState = React.createContext()


function App() {
  const [darkTheme, setTheme] = useState(true)

  function toggleTheme(){
    setTheme(prevTheme => !prevTheme)
  }

  return (
    <>
    <ThemeState.Provider value={darkTheme}>
      <Navbar title="FIR Management System" />
      {/* <button onClick={toggleTheme}>Toggle Theme</button> */}
    </ThemeState.Provider>
    <Welcome/>
    <div className="stats">
      <h3><q>सद्ररक्षणाय खलनिग्रहणाय</q></h3>
      <h3><q>PROTECTING THE RIGHTOUS WHILE CONTROLLING & ANNIHILATING THE EVIL</q></h3>
      <div className="factsSection">
        <div className="factBox">
          <h1>277</h1>
          <h3>Superintendents of Police and Above</h3>
        </div>
        <div className="factBox">
          <h1>652</h1>
          <h3>Deputy Superintendents</h3>
        </div>
        <div className="factBox">
          <h1>3530</h1>
          <h3>Police Inspectors</h3>
        </div>
        <div className="factBox">
          <h1>4530</h1>
          <h3>Assistant Police Inspectors</h3>
        </div>
        <div className="factBox1">
          <h1>7601</h1>
          <h3>Sub Inspectors</h3>
        </div>
      </div>
    </div>
    <div className="cardsTitle"><h1>Get information from our own sources</h1></div>
    <div className="cardsApp">
        <Cards title="1098" mssg="Child Helpline extends a helping hand to children from all kinds of influences or stress, while protecting all kinds of privacy." link="https://www.humanrightsinitiative.org/publications/police/fir.pdf" />
        <Cards title="100/112" mssg="Police Hotline service that provides assists in case of any emergency requiring immediate police intervention." link="https://dial112.mahapolice.gov.in/CitizenPortal-Maharashtra/dial-112" />
        <Cards title="108" mssg="Takes down necessary information regarding the patient and dispatches the nearest 108 ambulance to the concerned patient." link="https://zhl.org.in/emergency-108-ambulance" />
        <Cards title="1091/103" mssg="Provide 24 hours immediate and emergency response to women affected by violence or any kind of mistrouble concerning police" link="https://citizen.mahapolice.gov.in/Citizen/MH/Women.aspx#:~:text=103%20is%20started%20in%20Mumbai,1091%20is%20used." />
    </div>
    <Slideshow/>
    {/* <div className="team">
      <div className="photos">
        <img src={commi} alt="" id="commi" />
        <img src={sp} alt="" id="sp" />
      </div>
      
    </div> */}
    <Contact/>
    
    <Footer/>
    </>
  );
}

export default App;


/*
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
</div>
*/