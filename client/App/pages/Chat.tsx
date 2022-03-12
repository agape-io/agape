import React, { useState, useEffect, useRef } from "react";
import { Text, TextInput, View, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
// import io from 'socket.io-client';
// import moment from 'moment';

import styles, { DARK_GRAY } from "../../assets/styles";
import { Icon, Message } from "../components";
import DEMO from "../../assets/data/demo";

// import ChatMessages from '../components/Chat/ChatMessages';

const Chat = () => {
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
                {/* <View style={styles.top}>
                    <Text style={styles.title}>Messages</Text>
                    <TouchableOpacity>
                        <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
                    </TouchableOpacity>
                </View> */}
                {/* <View style={styles.flatlistView}>

                </View> */}
                {/* <View style={styles.flatlistView}> */}
                <FlatList
                    // style={styles.flatlistView}
                    data={DEMO}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <Message
                                image={item.image}
                                name={item.name}
                                lastMessage={item.message}
                            />
                        </TouchableOpacity>
                    )}
                />
                {/* </View> */}
            </View>
        </ImageBackground >
    );
};

export default Chat;

