import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import './Login.css';
import ConfirmSignup from '../components/ConfirmSignup';
import { Link } from 'react-router-dom';
import { SUCCESS_MESSAGE_LOGIN_ACCNT_CONFIRM } from '../components/Constants';
import { renderSuccessMessage } from '../components/Utils';

export default function Login(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: ''
    });
    const [showUserConfirmWindow, setUserConfirmWindow] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.signIn(fields.email, fields.password);
            props.userHasAuthenticated(true);
            props.history.push('/');
        } catch (e) {
            setIsLoading(false);
            //if the username/password is right but the account is not confirmed
            //resend signup and show confirmation code window
            if (e['code'] === 'UserNotConfirmedException') {
                await Auth.resendSignUp(fields.email);
                setUserConfirmWindow(true);
            } else {
                alert(e.code);
            }
        }
    }

    function renderLoginForm() {
        return (
            <div>
                {showSuccessMessage ? renderSuccessMessage('success', SUCCESS_MESSAGE_LOGIN_ACCNT_CONFIRM) : null}
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={fields.email}
                            onChange={handleFieldChange}
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
                    <Link to='/login/reset'>Forgot password</Link>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Login
                    </LoaderButton>
                </form>
            </div>
        );
    }

    function renderConfirmSignup() {
        return (
            <div>
                <ConfirmSignup {...props} email={fields.email} resetConfirmWindow={() => {
                    setUserConfirmWindow(false);
                    setShowSuccessMessage(true);
                }}/>
            </div>
        );
    }

    return (
        <div className="Login">
            {!showUserConfirmWindow ? renderLoginForm() : renderConfirmSignup()}
        </div>
    );

}