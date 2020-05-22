import React, { useState } from 'react';
import { useAppContext } from '../libs/contextLib';

export default function MatchedProfileDisplay(props) {
    const {emailId} = useAppContext();

    return (
        <div>
            <h1>Hello Logged In User {emailId}!</h1>
        </div>
    );
}