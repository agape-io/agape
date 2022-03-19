import React, { useState, useEffect, useRef, FC } from "react";
import { Text, TextInput, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
// import io from 'socket.io-client';
// import moment from 'moment';

import styles, { DARK_GRAY } from "../../assets/styles";
import { Icon, Message } from "../components";
import DEMO from "../../assets/data/demo";
import { useAuth } from "../navigation";
import {
    HomeTabNavigatorParamList,
    RootNavigatorParamsList,
    MessageStackParamList
} from "../types";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// import ChatMessages from '../components/Chat/ChatMessages';
export interface ChatProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Chat'>,
        NativeStackNavigationProp<RootNavigatorParamsList>>;
    route: RouteProp<MessageStackParamList>;
}

const Chat: FC<ChatProps> = ({ navigation, route }) => {
    //state initialized
    const [chat, setChat] = useState({ message: '', sid: '', time: '', rid: '' });
    const [messages, setMessages] = useState([]);
    //reference set for socketRef using useRef hook
    const socketRef = useRef();
    
    useEffect(() => {
        // loadMatches();

        return () => {
            // setMatches(null);
        }
    }, [messages]);

    const onSubmitHandler = () => {
        //all objects dereferenced from the state chat
        const { message, sid, time, rid } = chat;
        //chat sent to the server
        // socketRef.current.emit('message', {message, sid, time, rid});
        //state of chat cleared
        setChat({ message: '', sid: '', time: '', rid: '' });
    };

    //return jsx to render UI
    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={styles.bg}
        >
            <View style={styles.containerMessages}>
                <FlatList
                    data={DEMO}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Message')}
                        >
                            <Message
                                image={item.image}
                                name={item.name}
                                lastMessage={item.message}
                            />

                        </TouchableOpacity>
                    )}
                />
            </View>
        </ImageBackground >
    );
};

export default Chat;

