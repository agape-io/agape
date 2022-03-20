import React, {
    useRef,
    FC,
    useState
} from "react";
import {
    View,
    ImageBackground
} from 'react-native';
// import io from 'socket.io-client';
// import moment from 'moment';

import styles, { DARK_GRAY } from "../../assets/styles";
import {
    Icon,
    AllChats
} from "../components";
import { useAuth, useChatState} from "../context";
import { ActivityIndicator } from "react-native-paper";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeTabNavigatorParamList, RootNavigatorParamsList, MessageStackParamList } from "../types";

export interface ChatProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Chat'>,
        NativeStackNavigationProp<RootNavigatorParamsList>>;
    route: RouteProp<MessageStackParamList>;
}

const Chat:FC<ChatProps> = ({ navigation, route }) => {
    //state initialized
    const [fetchAgain, setFetchAgain] = useState<any>(false);
    //reference set for socketRef using useRef hook
    const socketRef = useRef();

    const { user } = useChatState();

    //return jsx to render UI
    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={styles.bg}
        >
            <View style={styles.containerMessages}>
                {
                    user ? <AllChats fetchAgain={fetchAgain} /> : <ActivityIndicator style={styles.indicator} size="large" color="#F0ABC1" />
                }
            </View>
        </ImageBackground >
    );
};

export default Chat;

