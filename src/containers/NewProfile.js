import React, { useState } from 'react';
import { ControlLabel, FormControl, FormGroup, Radio } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import LoaderButton from '../components/LoaderButton';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input';
import './NewProfile.css'
import { inputParsers } from '../components/Utils';
import { onError } from '../libs/errorLib';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';

export default function NewProfile(props) {

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
        // NOTE: you access FormData fields with `data.get(fieldName)`
        setInvalid(false);
        setDisplayErrors(false);
        console.log(returnFormData(data));
        return returnFormData(data);
    }

    async function createProfile(data) {
        //apiName first param coming from index.js
        //path second param coming from endpoint path
        return API.post('profile', '/profiles', {
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
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        name="name"
                        required
                    />
                </FormGroup>
                <FormGroup controlId="dob" bsSize="large">
                    <ControlLabel>Date of Birth</ControlLabel>
                    <FormControl
                        type="date"
                        name="dob"
                        required
                    />
                </FormGroup>
                <FormGroup controlId="caste" bsSize="large">
                    <ControlLabel>Caste</ControlLabel>
                    <FormControl
                        type="text"
                        name="caste"
                        //data-parse="uppercase"
                        required
                    />
                </FormGroup>

                <FormGroup controlId="gender" bsSize="large">
                    <ControlLabel>Gender</ControlLabel>
                    <br/>
                    <Radio name="gender" inline value='Male' onChange={(e) => setGender(e.target.value)}
                           checked={gender === 'Male'} required>
                        Male
                    </Radio>{' '}
                    <Radio name="gender" inline value='Female' onChange={(e) => setGender(e.target.value)}
                           checked={gender === 'Female'} required>
                        Female
                    </Radio>{' '}
                </FormGroup>

                <FormGroup controlId="countryRegion" bsSize="large">
                    <ControlLabel>Residence</ControlLabel>
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
                </FormGroup>
                <FormGroup controlId="city" bsSize="large">
                    <ControlLabel>City</ControlLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        name="city"
                        required
                    />
                </FormGroup>
                <FormGroup controlId="phoneNumber" bsSize="large">
                    <ControlLabel>Mobile Number</ControlLabel>
                    <PhoneInput
                        name="phoneNumber"
                        id="phoneNumber"
                        defaultCountry="IN"
                        placeholder="Enter phone number"
                        countrySelectProps={{unicodeFlags: true}}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        required/>
                </FormGroup>


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
            {/*    <FormGroup bsSize="large">*/}
            {/*    <ShakingError text="Form is not valid"/>*/}
            {/*    </FormGroup>)*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    );
}
