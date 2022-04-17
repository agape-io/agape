/**
 * Messages Screen
 */
// Libraries
import React, { FC } from 'react';

// Components
import { SingleMessage } from '../components';

// Types
import { MessageProps } from '../types';

// Utils
import {  useAuth } from '../context';

const Message:FC<MessageProps> = ({ navigation, route }) => {
    const { authData } = useAuth();
    return (
        <SingleMessage
            userData={authData}
            navigation={navigation}
            route={route}
        />
    );
}

export default Message;