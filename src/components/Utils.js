import Message from './Message';
import React from 'react';

export const renderSuccessMessage = (style, actionResultMessage, redirectAction, redirectMessage) => {
    return (
        <Message style={style} actionResultMessage={actionResultMessage} redirectAction={redirectAction}
                 redirectMessage={redirectMessage}/>
    )
};

export const inputParsers = {
    date(input) {
        const [month, day, year] = input.split('/');
        return `${year}-${month}-${day}`;
    },
    uppercase(input) {
        return input.toUpperCase();
    },
    number(input) {
        return parseFloat(input);
    },
};