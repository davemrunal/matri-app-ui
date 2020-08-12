import React from 'react';
import './Pricing.css';
import ContactUs from './ContactUs';

export default function Pricing(props) {
    return (
        <div className="Pricing">
            <div className="container-fluid">
                <div className="row" data-aos="fade-in"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-out"
                     data-aos-once="true">
                    <div className="col-md-8 offset-md-2">
                        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                            <h1 className="display-4">Pricing</h1>
                            <p className="lead">We have a plan built for everyone's unique needs.
                                </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="card-deck mb-3 text-center">
                            <div className="card mb-4 box-shadow"
                                 data-aos="fade-left"
                                 data-aos-duration="1000"
                                 data-aos-easing="ease-in-out"
                                 data-aos-once="true">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Silver</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">&#8360; 10,000 </h1>
                                        {/*<small className="text-muted">/ mo</small>*/}
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Upto 3 matches</li>
                                        <li>Conference Calls</li>
                                        <li>Meeting Arrangement</li>
                                        <li>Email support</li>
                                    </ul>
                                    <a href="#contactRegister">
                                        <button type="button" className="btn btn-lg btn-block btn-primary">Get started
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div className="card mb-4 box-shadow"
                                 data-aos="fade-up"
                                 data-aos-duration="1000"
                                 data-aos-easing="ease-in-out"
                                 data-aos-once="true">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Gold</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">&#8360; 13,000 </h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Upto 5 matches</li>
                                        <li>Conference Calls</li>
                                        <li>Meeting Arrangement</li>
                                        <li>Email support</li>
                                    </ul>
                                    <a href="#contactRegister">
                                        <button type="button" className="btn btn-lg btn-block btn-primary">Get started
                                        </button>
                                    </a>
                                </div>
                            </div>
                            <div className="card mb-4 box-shadow"
                                 data-aos="fade-right"
                                 data-aos-duration="1000"
                                 data-aos-easing="ease-in-out"
                                 data-aos-once="true">
                                <div className="card-header">
                                    <h4 className="my-0 font-weight-normal">Platinum</h4>
                                </div>
                                <div className="card-body">
                                    <h1 className="card-title pricing-card-title">&#8360; 15,000 </h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Upto 10 matches</li>
                                        <li>Conference Calls</li>
                                        <li>Meeting Arrangement</li>
                                        <li>Email support</li>
                                    </ul>
                                    <a href="#contactRegister">
                                        <button type="button" className="btn btn-lg btn-block btn-primary">Get started
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contactRegister" className="row bg-light my-5"
                     data-aos="fade-in"
                     data-aos-duration="1000"
                     data-aos-easing="ease-in-out"
                     data-aos-anchor-placement="center-bottom"
                     data-aos-once="true">
                    <div className="col-md-12 my-5">
                        <h3 className="mb-5 text-center">Register</h3>
                        <ContactUs messagePlaceHolder="Please type package name. Gold, Silver or Platinum"
                                   successMessage="Thank you for your interest.Our representative will be in touch with you shortly." />
                    </div>
                </div>

                <footer className="my-3 pt-5 text-muted text-center text-small">
                    <p className="mb-1">© 2017-2018 Prime Matrimony</p>
                </footer>

            </div>
        </div>
    );
}