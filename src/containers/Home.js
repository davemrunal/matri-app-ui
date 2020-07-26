import React from 'react';
import './Home.css';
import weddingImage from '../images/im1.jpg';
import weddingImage2 from '../images/im2.jpg';
import weddingImage3 from '../images/im3.jpg';
//import weddingImage from '../images/weddingGif-2.gif';

export default function Home() {
    return (
        <div className="Home">
            <div className="container-fluid">
                <div className="row">
                    <div className="col p-0">
                        {/*<img className="img-fluid w-100" src={weddingImage}/>*/}
                        <div id="carouselExampleSlidesOnly" className="carousel slide gif-row-height"
                             data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item">
                                    <img className="img-fluid w-100" src={weddingImage} alt="First slide"/>
                                </div>
                                <div className="carousel-item">
                                    <img className="img-fluid w-100" src={weddingImage2} alt="Second slide"/>
                                </div>
                                <div className="carousel-item active">
                                    <img className="img-fluid w-100" src={weddingImage3} alt="Third slide"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row second-row justify-content-center">
                    <div className="row">
                        <div className="col-md-12 mt-4">
                            <h3 className="welcometext">More than just an online match-maker,
                                <span className="text-primary"> we bring relations to life.</span>
                            </h3>
                            <h4 className="welcomedetail">We are the fastest growing match-maker worldwide with one
                                goal:
                                <br/>
                                <em>helping people find their match</em></h4>
                            <br/>
                            <h3 className="text-uppercase font-weight-bold">
                                <span className="services-border">SERVICES</span>
                            </h3>
                        </div>
                    </div>
                    <div className="row mx-3 mt-3 mb-5">
                        <div className="card-deck">
                            <div className="card card-1">
                                <div className="card-body">
                                    <h3 className="card-title">Responsive Service</h3>
                                    <p className="card-text">We provide best in class service with very high success
                                        ratios
                                        and are available to answer questions</p>
                                </div>
                            </div>
                            <div className="card card-2">
                                <div className="card-body">
                                    <h3 className="card-title">Personalised Matching</h3>
                                    <p className="card-text">We carefully note down your preferences and likings
                                        and then provide you with curated choices of your potential matches</p>
                                </div>
                            </div>
                            <div className="card card-3">
                                <div className="card-body">
                                    <h3>100% Verified Profiles</h3>
                                    <p>All profiles registered with us are 100% verified manually by our staff
                                        so you don't get any last minute surprises!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mb-1">
                    <div className="col-md-4 border-right-footer text-center mt-5">
                        <p className="lead">India | USA | Canada</p>
                    </div>
                    <div className="col-md-4 border-right-footer">
                        <p className="jumbotron text-center mb-0">Footer</p>
                    </div>
                    <div className="col-md-4">
                        <p className="jumbotron text-center mb-0">Footer</p>
                    </div>
                </div>
            </div>
        </div>
    );
}