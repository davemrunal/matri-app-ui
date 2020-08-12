import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useFormFields } from '../libs/hooksLib';
import LoaderButton from '../components/LoaderButton';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import './ContactUs.css';
import LocationSearchInput from '../components/LocationSearchInput';
import { onError } from '../libs/errorLib';
import { inputParsers } from '../components/Utils';

export default function ContactUs(props) {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [displayErrors, setDisplayErrors] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: ''
    });

    async function handleSubmit(event) {
        event.preventDefault();
        const data = handleFormEvent(event);
        if (data == null) {
            return;
        }
        console.log('Posting this data \n' + JSON.stringify(data));
        setIsLoading(true);
        try {
            console.log('submitted');
            const response = await sendMessage(data);
            // history.push('/profilePhotos');
            if (response.status === 200) {
                setShowSuccessMessage(true);
            } else {
                setServerError(true);
            }
        } catch (e) {
            onError(e);
        }
        setIsLoading(false);
    }

    function handleFormEvent(event) {
        if (!event.target.checkValidity()) {
            setInvalid(true);
            setDisplayErrors(true);
            return;
        }
        const form = event.target;
        const data = new FormData(form);

        for (let name of data.keys()) {
            const input = form.elements[name];
            if (input.dataset) {
                const parserName = input.dataset.parse;

                if (parserName) {
                    const parser = inputParsers[parserName];
                    const parsedValue = parser(data.get(name));
                    data.set(name, parsedValue);
                }
            }
        }
        //set emailId
        //data.set('emailId', emailId);
        // NOTE: you access FormData fields with `data.get(fieldName)`
        setInvalid(false);
        setDisplayErrors(false);
        console.log(returnFormData(data));
        return returnFormData(data);
    }

    async function sendMessage(data) {
        //apiName first param coming from index.js
        //path second param coming from endpoint path
        const response = await fetch('https://fb3xbiq5rj.execute-api.us-east-1.amazonaws.com/dev/contact-us', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return response;
    }


    function returnFormData(formData) {
        const data = {};
        for (let key of formData.keys()) {
            data[key] = formData.get(key);
        }
        /*
        * Handle state fields
        * */
        data['location'] = location;
        return data;
    }

    function validateForm() {
        return false;
    }

    function setFormLocation(googleLocation) {
        // The Google result comes back as a comma-separated string:
        // "Austin, TX, USA". Parse it into usable data.
        let parsedLoc = googleLocation.split(', ');
        setLocation(parsedLoc.toString());
    }

    function renderContactUsForm() {
        return (
            <div>
                <form onSubmit={handleSubmit} noValidate className={displayErrors ? 'displayErrors' : ''}>
                    <Form.Group controlId="name" bsSize="large">
                        <Form.Label className="required">Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="email" bsSize="large">
                        <Form.Label className="required">Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={fields.email}
                            onChange={handleFieldChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="phoneNumber" bsSize="large">
                        <Form.Label>Mobile Number</Form.Label>
                        <PhoneInput
                            name="phoneNumber"
                            id="phoneNumber"
                            defaultCountry="IN"
                            placeholder="Enter phone number"
                            countrySelectProps={{unicodeFlags: true}}
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                        />
                    </Form.Group>
                    <Form.Group controlId="location" bsSize="large">
                        <Form.Label className="required">City</Form.Label>
                        <LocationSearchInput setFormLocation={setFormLocation} required/>
                    </Form.Group>
                    <Form.Group controlId="message" bsSize="large">
                        <Form.Label className="required">Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="message"
                            rows="4"
                            placeholder={props.messagePlaceHolder}
                            required
                        />
                    </Form.Group>
                    <br/>
                    <LoaderButton className="mb-3"
                                  block
                                  type="submit"
                                  bsSize="medium"
                                  isLoading={isLoading}
                                  disabled={validateForm()}
                    >
                        {isLoading ? 'Sending…' : 'Send'}
                    </LoaderButton>

                    {showSuccessMessage &&
                    <div className="alert alert-success alert-dismissible fade show text-center animateMsg"
                         role="alert">
                        {props.successMessage.split(".")[0]}.<br/>{props.successMessage.split(".")[1]}.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}

                    {serverError &&
                    <div className="alert alert-warning alert-dismissible fade show text-center animateMsg"
                         role="alert">
                        Something went wrong.<br/>Please try later.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>}
                </form>
            </div>
        );
    }

    return (
        <div className="site-section services-section bg-light block__62849" id="contact-section">
            {/*{!submitted ? renderLoginForm() : renderConfirmSignup()}*/}
            {renderContactUsForm()}
        </div>
    );
}