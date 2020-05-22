import React, { useState } from 'react';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import './Signup.css';
import { Auth } from 'aws-amplify';
import ConfirmSignup from '../components/ConfirmSignup';
import { useHistory } from 'react-router-dom';

export default function Signup(props) {
    const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: '',
        confirmPassword: '',
        confirmationCode: ''
    });
    const [newUser, setNewUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password
            });
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            if (e['code'] === 'UsernameExistsException') {
                try {
                    const newUser = await Auth.resendSignUp(fields.email);
                    setNewUser(newUser);
                } catch (e) {
                    //TODO
                }
            } else {
                alert(e.message);
            }
            setIsLoading(false);
        }
    }

    function renderConfirmationForm() {
        return (
            <ConfirmSignup email={fields.email} nav="/login"/>
        );
    }


    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                        value={fields.email}
                        onChange={handleFieldChange}
                        required
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>
                <span id="passwordMatchError" style={{ display: ((fields.password === fields.confirmPassword))? "none" : "block" }}>
                    Passwords don't match
                </span>
                <br/>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Signup
                </LoaderButton>
            </form>
        );
    }

    return (
        <div className="Signup">
            {/*{newUser === null ? renderForm() : <ConfirmSignup {...props} email={fields.email}/>}*/}
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}