import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Message(props) {
    return (
        <div className={`${props.style}`}>
            <Glyphicon glyph="ok"/>
            <p>{props.actionResultMessage}</p>
            {props.redirectAction && props.redirectMessage &&
            <p>
                <Link to={props.redirectAction}>
                    {props.redirectMessage}
                </Link>
            </p>
            }
        </div>
    );
}

