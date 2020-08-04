import React from 'react';
import './Home.css';
import logo from '../images/logo.png';
//import weddingImage from '../images/weddingGif-2.gif';
import waitingBride from '../images/waiting_bride.jpg';

export default function Home() {
    return (
        <div className="Home">
            <div className="container-fluid">
                <div id="first-intro" className="row text-center my-5">
                    <div className="col-md-10 offset-md-1 my-5">
                        <h1>BECAUSE COMPUTERS DON'T CREATE CONNECTIONS, <br/> WE DO</h1>
                        <h3 className="py-5">Find your ideal match with us</h3>
                    </div>
                </div>
                <div id="image" className="row">
                    <div className="col-md-12 p-0">
                        <img className="img-fluid w-100" src={waitingBride}/>
                    </div>
                </div>
                <div id="background-story" className="row text-center my-5">
                    <div className="col-md-8 offset-md-2 my-5">
                        <h1 className="mb-3">Our Background</h1>
                        <h3 className="mb-3">Our Story</h3>
                        <p>With a bag of carefully curated profiles,
                            Prime Matrimony is proud to be a leader in the industry,
                            showing all of our customers the quality and care they deserve with every unique match.</p>
                        <p>At Prime Matrimony, we relate to the rich, colorful and diverse Indian heritage.
                            We are the fastest growing matrimony company worldwide and our only goal
                            is to help people find their right match.</p>
                        <p className="mb-5">Learn more about our offerings and sign up today.</p>
                    </div>
                </div>
                <div id="infoWithCards" className="row bg-light my-5">
                    <div className="col-md-12 text-center my-5">
                        <h3 className="text-uppercase font-weight-bold">
                            <u><span>SERVICES</span></u>
                        </h3>
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
                    {/*<div className="row">*/}
                    {/*    <div className="col-md-12 mt-4">*/}
                    {/*        <h3 className="welcometext">More than just an online match-maker,*/}
                    {/*            <span className="text-primary"> we bring relations to life.</span>*/}
                    {/*        </h3>*/}
                    {/*        <h4 className="welcomedetail">We are the fastest growing match-maker worldwide with one*/}
                    {/*            goal:*/}
                    {/*            <br/>*/}
                    {/*            <em>helping people find their match</em></h4>*/}
                    {/*        <br/>*/}
                    {/*        <h3 className="text-uppercase font-weight-bold">*/}
                    {/*            <span className="services-border">SERVICES</span>*/}
                    {/*        </h3>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div id="how-to" className="row my-5">
                    <div className="col-md-6 offset-md-3 my-5 text-center">
                        <h1 className="mb-2">How It Works</h1>
                        <ol>
                            <li>Register</li>
                            <li>We get in touch with you</li>
                            <li>We show you curated profiles</li>
                        </ol>
                    </div>
                </div>
                <footer className="container py-5">
                    <div className="row">
                        <div className="col-6 col-md">
                            <h5>Features</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#">Cool stuff</a></li>
                                <li><a className="text-muted" href="#">Random feature</a></li>
                                <li><a className="text-muted" href="#">Team feature</a></li>
                                <li><a className="text-muted" href="#">Stuff for developers</a></li>
                                <li><a className="text-muted" href="#">Another one</a></li>
                                <li><a className="text-muted" href="#">Last time</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Resources</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#">Resource</a></li>
                                <li><a className="text-muted" href="#">Resource name</a></li>
                                <li><a className="text-muted" href="#">Another resource</a></li>
                                <li><a className="text-muted" href="#">Final resource</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Resources</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#">Business</a></li>
                                <li><a className="text-muted" href="#">Education</a></li>
                                <li><a className="text-muted" href="#">Government</a></li>
                                <li><a className="text-muted" href="#">Gaming</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>About</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="text-muted" href="#">Team</a></li>
                                <li><a className="text-muted" href="#">Locations</a></li>
                                <li><a className="text-muted" href="#">Privacy</a></li>
                                <li><a className="text-muted" href="#">Terms</a></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md ml-5">
                            <img src={logo}/>
                            <small className="d-block mb-3 text-muted ml-5">© 2017-2018</small>
                        </div>
                        {/*<div className="col-md-4 text-center mt-5">*/}
                        {/*    <p className="lead">India | USA | Canada</p>*/}
                        {/*</div>*/}
                    </div>
                </footer>
            </div>
        </div>
    );
}