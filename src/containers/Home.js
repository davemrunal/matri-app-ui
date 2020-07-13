import React from 'react';
import './Home.css';
import weddingImage from '../images/wedding-mandap.jpg';

export default function Home() {
    return (
        <div className="Home">
            <div className="row">
                <img className="img-fluid w-100" src={weddingImage}/>

            </div>
            <div className="row">
                <p>Hi</p>
            </div>
        </div>
    );
}