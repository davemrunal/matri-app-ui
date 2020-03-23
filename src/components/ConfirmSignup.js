import React, { useState } from 'react';
import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';
import LoaderButton from './LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import '../containers/Signup.css';
import { Auth } from 'aws-amplify';

export default function ConfirmSignup(props) {
    const [fields, handleFieldChange] = useFormFields({
        confirmationCode: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.confirmSignUp(props.email, fields.confirmationCode);
            props.resetConfirmWindow();
            //props.history.push('/login');
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <form onSubmit={handleConfirmationSubmit}>
            <FormGroup controlId="confirmationCode" bsSize="large">
                <ControlLabel>Confirmation Code</ControlLabel>
                <FormControl
                    autoFocus
                    type="tel"
                    onChange={handleFieldChange}
                    value={fields.confirmationCode}
                />
                <HelpBlock>Please check your email for the code.</HelpBlock>
            </FormGroup>
            <LoaderButton
                block
                type="submit"
                bsSize="large"
                isLoading={isLoading}
                disabled={!validateConfirmationForm()}
            >
                Verify
            </LoaderButton>
        </form>
    );
}