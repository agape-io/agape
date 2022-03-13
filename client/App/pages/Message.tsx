import React, { FC, useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import DEMO from "../../assets/data/demo";

import { TextInput } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';

// Types
import {
    AuthNavigatorParamList,
    RootNavigatorParamsList,
    HomeTabNavigatorParamList
} from '../types';

// API
import { useAuth } from '../navigation';

export interface MessageProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Message'>,
        NativeStackNavigationProp<RootNavigatorParamsList>>;
};

const Message: FC<MessageProps> = ({ navigation }) => {
    const auth = useAuth();

    const [messages, setMessages] = useState([]);

    const {
        image,
        message,
        match,
        name,
    } = DEMO[0];

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: message,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: image,
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}

export default Message;