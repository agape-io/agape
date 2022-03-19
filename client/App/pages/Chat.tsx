import React, {
    useState,
    useEffect,
    useRef,
    FC
} from "react";
import {
    Text,
    TextInput,
    View,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native';
// import io from 'socket.io-client';
// import moment from 'moment';

import styles, { DARK_GRAY } from "../../assets/styles";
import {
    Icon,
    Message
} from "../components";
import DEMO from "../../assets/data/demo";
import {
    useAuth,
    useChatState
} from "../context";
import {
    HomeTabNavigatorParamList,
    RootNavigatorParamsList,
    MessageStackParamList
} from "../types";
import { CompositeNavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { getUserChats } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";
// import ChatMessages from '../components/Chat/ChatMessages';
export interface ChatProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Chat'>,
        NativeStackNavigationProp<RootNavigatorParamsList>>;
    route: RouteProp<MessageStackParamList>;
}

const Chat: FC<ChatProps> = ({ navigation, route }) => {
    //state initialized
    const [loggedUser, setLoggedUser] = useState<any>();
    const auth = useAuth();
    const { token, userId } = auth.authData;
    const {
        user,
        selectedChat,
        setSelectedChat,
        chats,
        setChats
    } = useChatState();
    //reference set for socketRef using useRef hook
    const socketRef = useRef();

    const fetchChats = async () => {
        getUserChats(userId, token)
            .then(res => {
                // gets all user messages
                setChats(res.data);
            })
            .catch(e => {
                // throw error
                console.error(e.message);
            });
    }

    const handleLoggedUser = async () => {
        AsyncStorage.getItem('@auth')
            .then((res: any) => {
                setLoggedUser(JSON.parse(res));
            })
            .catch((e: any) => {
                console.error('Failed to get key', e.message);
            });
    }

    useEffect(() => {
        fetchChats();
        handleLoggedUser();
    }, []);


    //return jsx to render UI
    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={styles.bg}
        >
            <View style={styles.containerMessages}>
                {
                    chats ? (
                        <FlatList
                            data={chats}
                            keyExtractor={(item) =>  item._id }
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Message', { thread: item })}
                                >
                                    {console.log('flatlist', item._id, 'hello')}
                                    <Message
                                        image={item.image}
                                        name={item.name}
                                        lastMessage={item.message}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <ActivityIndicator style={styles.indicator} size="large" color="#F0ABC1" />
                    )
                }
            </View>
        </ImageBackground >
    );
};

export default Chat;

