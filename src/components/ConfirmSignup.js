import React, { useState } from 'react';
import LoaderButton from './LoaderButton';
import { useFormFields } from '../libs/hooksLib';
import '../containers/Signup.css';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { useAppContext } from '../libs/contextLib';
import Form from 'react-bootstrap/Form';

export default function ConfirmSignup(props) {
    const history = useHistory();
    const {userHasAuthenticated} = useAppContext();
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
            //userHasAuthenticated(true);
            props.isFunctionSent && props.resetConfirmWindow();
            props.nav && history.push(props.nav);
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <form onSubmit={handleConfirmationSubmit}>
            <Form.Group controlId="confirmationCode" bsSize="large">
                <Form.Label>Confirmation Code</Form.Label>
                <Form.Control
                    autoFocus
                    type="tel"
                    onChange={handleFieldChange}
                    value={fields.confirmationCode}
                />
                <Form.Text>Please check your email for the code.</Form.Text>
            </Form.Group>
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