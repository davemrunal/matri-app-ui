import React from 'react';
import { Link } from 'react-router-dom';

export default function Message(props) {
    return (
        <div className={`${props.style}`}>
            <i className="fas fa-clipboard-check"></i>
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

