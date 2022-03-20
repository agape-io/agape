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
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

import { SingleMessage } from '../components';

// Types
import {
    RootNavigatorParamsList,
    HomeTabNavigatorParamList,
    MessageStackParamList
} from '../types';

// API
import {  useAuth } from '../context';
export interface MessageProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Chat'>,
        NativeStackNavigationProp<RootNavigatorParamsList>>;
    route: RouteProp<MessageStackParamList>;
};

const Message: FC<MessageProps> = ({ navigation, route }) => {
    const [messages, setMessages] = useState([]);
    const { authData } = useAuth();

    const {
        image,
        message,
        name,
    } = DEMO[0];

    useEffect(() => {
        console.log('authData', authData);
    }, [])

    // const onSend = useCallback((messages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])

    return (
        // <GiftedChat
        //     messages={messages}
        //     onSend={messages => onSend(messages)}
        //     user={{
        //         _id: 1,
        //     }}
        // />
        <SingleMessage
            userData={authData}
            navigation={navigation}
            route={route}
        />
    )
}

export default Message;