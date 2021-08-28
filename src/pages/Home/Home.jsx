import "./home.css";
import React from "react";
import Navbar from "../../components/navbar/Navbar";

function Home() {
  return (
    <div className="homeContainer">
      <div className="firstbox">
        <Navbar />
        <div className="astericDesc">
          <span>Asterics CRM</span>
          <p>
            Get instant access to exciting tools to supoort your business that
            will bring you close to customers.
          </p>
          <button className="astericButton">Read More</button>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url(/images/ellipsebg.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center left",
        }}
        className="secondbox"
      >
        <img src="images/Asterics-Home-page-icons.png" alt="" />
      </div>
    </div>
  );
}

export default Home;
