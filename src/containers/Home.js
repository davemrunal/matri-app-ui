import React from 'react';
import './Home.css';
import weddingImage from '../images/photo-1.jpeg';
import weddingGif from '../images/editGif.gif';

export default function Home() {
    return (
        <div className="Home">
            <div className="container-fluid">
                <div className="row">
                    <img className="img-fluid w-100" src={weddingImage}/>
                </div>
                <div className="container-fluid about-us mb-3">
                    <br/>
                    <div className="row">
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-5 text-center">
                            <h4 className="mr-5">Who Are We</h4>
                            <p className="ml-5 w-75">We are the fastest growing matrimony company worldwide and our goal
                                is
                                to help people
                                find their right match by providing best in class service.</p>
                            <p className="ml-5 w-75">Finding a match and organizing events can seem very intimidating.
                                We wil help you navigate this journey with personal care and customized ideas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}