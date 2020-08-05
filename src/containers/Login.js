import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { API, Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import './Login.css';
import ConfirmSignup from '../components/ConfirmSignup';
import { SUCCESS_MESSAGE_LOGIN_ACCNT_CONFIRM } from '../components/Constants';
import { renderSuccessMessage } from '../components/Utils';
import { useAppContext } from '../libs/contextLib';
import Form from 'react-bootstrap/Form';


export default function Login(props) {
    const {emailId} = useAppContext();
    const {setEmailId} = useAppContext();
    const history = useHistory();
    const {userHasAuthenticated} = useAppContext();
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
            userHasAuthenticated(true);
            setEmailId(fields.email);
            const profileItem = await getProfileItem();
            if (profileItem) {
                if (profileItem.profileDetailsAdded && profileItem.isPhotoUploaded) {
                    history.push('/matchedProfiles');
                    return;
                } else if (profileItem.profileDetailsAdded) {
                    history.push('/profilePhotos');
                    return;
                }
            }
            history.push('/profileDetails');
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

    async function getProfileItem() {
        const item = {
            profileDetailsAdded: false,
            isPhotoUploaded: false,
        };
        return item;
        // return API.post('profile', '/getProfileItem', {
        //     body: {
        //         emailId: emailId
        //     }
        // });
    }

    function renderLoginForm() {
        return (
            <div>
                {showSuccessMessage ? renderSuccessMessage('success', SUCCESS_MESSAGE_LOGIN_ACCNT_CONFIRM) : null}
                <form onSubmit={handleSubmit}>
                    <Form.Group controlId="email" bsSize="large">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={fields.email}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="password" bsSize="large">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={fields.password}
                            onChange={handleFieldChange}
                        />
                    </Form.Group>
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
                <ConfirmSignup email={fields.email} resetConfirmWindow={() => {
                    setUserConfirmWindow(false);
                    setShowSuccessMessage(true);
                }}
                isFunctionSent="true"
                nav="/profileDetails"
                />
            </div>
        );
    }

    return (
        <div className="Login">
            {!showUserConfirmWindow ? renderLoginForm() : renderConfirmSignup()}
        </div>
    );

}