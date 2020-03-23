import React, { useState } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import { useFormFields } from '../libs/hooksLib';
import LoaderButton from './LoaderButton';
import { Auth } from 'aws-amplify';
import './ResetPassword.css';
import { REDIRECT_MESSAGE_PWD_RESET, SUCCESS_MESSAGE_PWD_RESET } from './Constants';
import { renderSuccessMessage } from './Utils';

export default function ResetPassword(props) {
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: '',
        confirmPassword: '',
        confirmationCode: ''
    });
    const [isSendingCode, setIsSendingCode] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [confirmed, setConfirmed] = useState(false);

    async function handleSendCodeClick(event) {
        event.preventDefault();
        setIsSendingCode(true);
        try {
            await Auth.forgotPassword(fields.email);
            setCodeSent(true);
        } catch (e) {
            alert(e.code);
            setIsSendingCode(false);
        }
    }

    function validateCodeForm() {
        return fields.email.length > 0;
    }

    async function handleConfirmClick(event) {
        event.preventDefault();
        setIsConfirming(true);
        try {
            await Auth.forgotPasswordSubmit(fields.email, fields.confirmationCode, fields.password);
            setConfirmed(true);
        } catch (e) {
            alert(e.code);
            setIsConfirming(false);
        }
    }

    function validateResetForm() {
        return fields.confirmationCode.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword;
    }

    function renderRequestCodeForm() {
        return (
            <form onSubmit={handleSendCodeClick}>
                <FormGroup bsSize="large" controlId="email">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    loadingText="Sending…"
                    text="Send Confirmation"
                    isLoading={isSendingCode}
                    disabled={!validateCodeForm()}
                >Send Confirmation</LoaderButton>
            </form>
        );
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmClick}>
                <FormGroup bsSize="large" controlId="confirmationCode">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        value={fields.confirmationCode}
                        onChange={handleFieldChange}
                    />
                    <HelpBlock>
                        Please check your email ({fields.email}) for the confirmation
                        code.
                    </HelpBlock>
                </FormGroup>
                <hr/>
                <FormGroup bsSize="large" controlId="password">
                    <ControlLabel>New Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup bsSize="large" controlId="confirmPassword">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.confirmPassword}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    text="Confirm"
                    loadingText="Confirm"
                    isLoading={isConfirming}
                    disabled={!validateResetForm()}
                >Confirm</LoaderButton>
            </form>
        );
    }

    return (
        <div className="ResetPassword">
            {!codeSent
                ? renderRequestCodeForm()
                : !confirmed
                    ? renderConfirmationForm()
                    : renderSuccessMessage('success', SUCCESS_MESSAGE_PWD_RESET, '/login', REDIRECT_MESSAGE_PWD_RESET)}
        </div>
    );

}
