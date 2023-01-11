import React, { useEffect } from "react";
import { Carousel, Image } from "antd";

import "./About.css";

const contentStyle = {
  margin: 0,
  height: "100vh",
  color: "#fff",
  background: "transparent",
  position: "relative",
  top: "20em",
};

export default function AboutPage() {
  useEffect(() => {
    document.body.classList.add("info-body");

    return () => document.body.classList.remove("info-body");
  });

  return (
    <Carousel
      autoplay
      autoplaySpeed={3000}
      dotPosition={"left"}
      effect="fade"
      style={{
        height: "80vh",
        width: "90vw",
        position: "absolute",
      }}
    >
      <div>
        <div style={{ ...contentStyle, marginLeft: "15%" }}>
          <h2 className="about-name-main">About Us</h2>
          <p className="about-description-main" align="justify">
            <br />
            UpBox is Cloud storage provider that offers Storage as a Service or
            STaaS. This model of service is where the cloud storage that allows
            you to rent from a Cloud Service Provider (UpBox) and that provides
            basic ways to access that storage. The main advantage of STaaS is
            that you may outsource to a different CSP the expense and work of
            managing the infrastructure and technology for data storage. This
            increases the efficiency of scaling up storage resources without
            spending money on new hardware or incurring configuration fees. This
            research intends to provide Poblacion Sabang, Barangay 10, Lipa City
            with a secure cloud storage system. This type of project proposal
            would supply the Barangay with cloud storage so that documents,
            files, CCTV footage, and other data can be conveniently stored and
            backed up whenever problems arise. The purpose of UpBox is to enable
            storage more efficiently, particularly in Poblacion Sabang, Barangay
            10, Lipa City, by securing files, records, and other data.
          </p>
          {/* <img
            className="about-image"
            alt="asddd"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          /> */}
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <h2 className="about-name">Iñigo Miguel D. Pernez</h2>
          <p className="about-description" align="justify">
            <br />
            IT4A - Information Technology
          </p>
          <img className="about-image" alt="asddd" src="/images/inigo.jpg" />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <h2 className="about-name">Lawrenz Anthony L. Tugade</h2>
          <p className="about-description" align="justify">
            <br />
            IT4A - Information Technology
          </p>
          <img
            className="about-image"
            alt="asddd"
            src="/images/lanz.jpg"
            width={300}
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <h2 className="about-name">Kyer B. Regacho</h2>
          <p className="about-description" align="justify">
            <br />
            IT4A - Information Technology
          </p>
          <img
            className="about-image"
            alt="asddd"
            src="/images/kyer.jpg"
            width={300}
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <h2 className="about-name">Rondavid R. Delarosa</h2>
          <p className="about-description" align="justify">
            <br />
            IT4A - Information Technology
          </p>
          <img
            className="about-image"
            alt="asddd"
            src="/images/lawrenz.jpg"
            width={300}
          />
        </div>
      </div>
    </Carousel>
  );
}
