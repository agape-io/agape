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

const Chat: FC<any> = ({ navigation, route }) => {
    //state initialized
    const [fetchAgain, setFetchAgain] = useState<any>();
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
                    user ? <AllChats /> : <ActivityIndicator style={styles.indicator} size="large" color="#F0ABC1" />
                }
            </View>
        </ImageBackground >
    );
};

export default Chat;

