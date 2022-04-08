/**
 * Messages Screen
 */
import React, { FC } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

// Components
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