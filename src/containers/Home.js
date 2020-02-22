import React from "react";
import "./Home.css";

export default function Home() {
    return (
        <div className="Home">
            <div className="lander">
                <img src={require('../images/ganpati.jpg')} alt=""/>
                <h1>Coming Soon</h1>
                <p>A modern way to find your match!</p>
            </div>
        </div>
    );
}