import React from 'react';
import './Home.css';
import weddingImage from '../images/dark-two.jpg';
import weddingImage2 from '../images/destination-wedding1.jpg';
import weddingImage3 from '../images/wedding-mandap.jpg';
import weddingImage4 from '../images/tilt-two.jpeg';
//import weddingImage from '../images/weddingGif-2.gif';

export default function Home() {
    return (
        <div className="Home">
            <div className="container-fluid">
                <div className="row gif-row-height">
                    <div className="col p-0">
                        {/*<img className="img-fluid w-100" src={weddingImage}/>*/}
                        <div id="carouselExampleSlidesOnly" className="carousel slide gif-row-height" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item">
                                    <img className="img-fluid w-100" src={weddingImage} alt="First slide"/>
                                </div>
                                <div className="carousel-item active">
                                    <img className="img-fluid w-100" src={weddingImage2} alt="Second slide"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="img-fluid w-100" src={weddingImage3} alt="Third slide"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="img-fluid w-100" src={weddingImage4} alt="Fourth slide"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row row-height">
                    <div className="col-md-12 bg-secondary">
                    </div>
                </div>
            </div>
            <div className="jumbotron text-center mb-0">
                <p>Footer</p>
            </div>
        </div>
    );
}