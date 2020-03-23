import Message from './Message';
import React from 'react';

export const renderSuccessMessage = (style, actionResultMessage, redirectAction, redirectMessage) => {
    return (
        <Message style={style} actionResultMessage={actionResultMessage} redirectAction={redirectAction}
                 redirectMessage={redirectMessage}/>
    )
};