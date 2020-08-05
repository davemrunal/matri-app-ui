import React from 'react';
import './Home.css';
//import weddingImage from '../images/weddingGif-2.gif';
import waitingBride from '../images/waiting_bride.jpg';
import ContactUs from './ContactUs';

export default function Home() {
    return (
        <div className="Home">
            <div className="container-fluid">
                <div id="first-intro" className="row text-center my-5"
                     data-aos="fade-down"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-out">
                    <div className="col-md-10 offset-md-1 my-5">
                        <h1>BECAUSE COMPUTERS DON'T CREATE CONNECTIONS, <br/> WE DO</h1>
                        <h3 className="py-5">Find your ideal match with us</h3>
                    </div>
                </div>
                <div id="image" className="row" data-aos="fade-down"
                     data-aos-duration="1000"
                     data-aos-offset="200"
                     data-aos-easing="ease-in-out">
                    <div className="col-md-12 p-0">
                        <img className="img-fluid w-100" src={waitingBride}/>
                    </div>
                </div>
                <div id="background-story" className="row text-center my-5" data-aos="fade-down"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-out">
                    <div className="col-md-8 offset-md-2 my-5">
                        <h1 className="mb-3">Our Background</h1>
                        <h3 className="mb-3">Who We Are</h3>
                        <p className="lead">With a bag of carefully curated profiles,
                            Prime Matrimony is proud to be a leader in the industry,
                            showing all of our customers the quality and care they deserve with every unique match.</p>
                        <p className="lead">At Prime Matrimony, we relate to the rich, colorful and diverse Indian
                            heritage.
                            We are the fastest growing matrimony company worldwide and our only goal
                            is to help people find their right match.</p>
                        <p className="mb-5 lead">Learn more about our offerings and sign up today.</p>
                    </div>
                </div>
                <div id="infoWithCards" className="row bg-light my-5" data-aos="fade-down"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-out">
                    <div className="col-md-12 text-center my-5">
                        <h3 className="mb-3"><u>SERVICES</u></h3>
                        <div className="card-deck my-5">
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
                <div id="how-to" className="row my-5" data-aos="fade-down"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-out">
                    <div className="col-md-6 offset-md-3 my-5 text-center">
                        <h1 className="mb-2">How It Works</h1>
                        <ol>
                            <li className="lead ">Register</li>
                            <li className="lead">We get in touch with you</li>
                            <li className="lead">We show you curated profiles</li>
                        </ol>
                    </div>
                </div>
                <div id="contact-us" className="row bg-light my-5" data-aos="fade-down"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-out">
                    <div className="col-md-12 my-5">
                        <h3 className="mb-5 text-center">Questions?</h3>
                        <ContactUs/>
                    </div>
                </div>
                <footer className="my-5 pt-5 text-muted text-center text-small">
                    <p className="mb-1">© 2017-2018 Prime Matrimony</p>
                </footer>
            </div>
        </div>
    );
}