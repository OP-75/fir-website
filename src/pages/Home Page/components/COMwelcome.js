import React from "react";
import "./Welcome.css";
import bg from "./policeBg3.jpg";
export default function Welcome() {
  return (
    <>
      {/* <img src={bg} alt="" width="100%" height="900px"/> */}
      <div className="bgImg">
        <div className="text-content">
          <div className="moto">
            <h1>Empowering Citizens, Ensuring Justice</h1>
          </div>
          <div className="mssg">
            <h3>Welcome to our Website!</h3>
            <p>
              Welcome to the FIR Registration Portal of the Police Department.
              Your safety and security matter to us. This platform allows you to
              easily register First Information Reports (FIRs), enabling swift
              response and assistance from our dedicated officers. We are
              committed to upholding justice and maintaining law and order in
              our community. Feel empowered to report incidents and contribute
              to a safer society. Your cooperation is vital in ensuring a
              peaceful environment for all. (This is just a Demo site for
              project please visit official Website of Maharashtra Police for
              info on FIR registration)
            </p>
          </div>
        </div>
        <div className="splash">
          <div className="bubble bub1"></div>
          <div className="bubble bub2"></div>
          <img src={bg} alt="" />
        </div>
      </div>
    </>
  );
}
