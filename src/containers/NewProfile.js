import React, { useState } from 'react';
import LoaderButton from '../components/LoaderButton';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import './NewProfile.css'
import { inputParsers } from '../components/Utils';
import { onError } from '../libs/errorLib';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';
import Form from 'react-bootstrap/Form';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default function NewProfile(props) {
    const { emailId } = useAppContext();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [displayErrors, setDisplayErrors] = useState(false);

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
        data.set('emailId', emailId);
        // NOTE: you access FormData fields with `data.get(fieldName)`
        setInvalid(false);
        setDisplayErrors(false);
        console.log(returnFormData(data));
        return returnFormData(data);
    }

    async function createProfile(data) {
        //apiName first param coming from index.js
        //path second param coming from endpoint path
        return API.post('profile', '/createProfile', {
            body: data
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = handleFormEvent(event);
        console.log('Posting this data \n' + data);
        setIsLoading(true);
        try {
            await createProfile(data);
            history.push('/profilePhotos');
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function returnFormData(formData) {
        const data = {};
        for (let key of formData.keys()) {
            data[key] = formData.get(key);
        }
        return data;
    }

    function validateForm() {
        return (gender && gender.length > 0) ? true : false;
    }

    return (
        <div className='NewProfile'>
            <form onSubmit={handleSubmit} noValidate className={displayErrors ? 'displayErrors' : ''}>
                <Form.Group controlId="name" bsSize="large">
                    <Form.Control>Name</Form.Control>
                    <Form.Control
                        autoFocus
                        type="text"
                        name="name"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="dob" bsSize="large">
                    <Form.Control>Date of Birth</Form.Control>
                    <Form.Control
                        type="date"
                        name="dob"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="caste" bsSize="large">
                    <Form.Control>Caste</Form.Control>
                    <Form.Control
                        type="text"
                        name="caste"
                        //data-parse="uppercase"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="gender" bsSize="large">
                    <Form.Control>Gender</Form.Control>
                    <br/>
                    <Form.Check type="radio" name="gender" inline value='Male' onChange={(e) => setGender(e.target.value)}
                           checked={gender === 'Male'} required>
                        Male
                    </Form.Check>{' '}
                    <Form.Check type="radio" name="gender" inline value='Female' onChange={(e) => setGender(e.target.value)}
                           checked={gender === 'Female'} required>
                        Female
                    </Form.Check>{' '}
                </Form.Group>

                <Form.Group controlId="countryRegion" bsSize="large">
                    <Form.Control>Residence</Form.Control>
                    <br/>
                    <CountryDropdown
                        id="country"
                        name="country"
                        value={country}
                        onChange={(val) => setCountry(val)}
                        priorityOptions={['IN', 'US', 'CA', 'GB']}
                        required
                    />
                    {' '}
                    <RegionDropdown
                        id="region"
                        name="region"
                        country={country}
                        value={region}
                        onChange={(val) => setRegion(val)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="city" bsSize="large">
                    <Form.Control>City</Form.Control>
                    <Form.Control
                        autoFocus
                        type="text"
                        name="city"
                        required
                    />
                </Form.Group>
                <Form.Group controlId="phoneNumber" bsSize="large">
                    <Form.Control>Mobile Number</Form.Control>
                    <PhoneInput
                        name="phoneNumber"
                        id="phoneNumber"
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        countrySelectProps={{unicodeFlags: true}}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        required/>
                </Form.Group>


                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Submit
                </LoaderButton>
            </form>

            {/*<div>*/}
            {/*    {invalid && (*/}
            {/*    <Form.Group bsSize="large">*/}
            {/*    <ShakingError text="Form is not valid"/>*/}
            {/*    </Form.Group>)*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    );
}
