/**
 * Chat Screen
 */
// Libraries
import React, { FC } from "react";
import {
    View,
    ImageBackground
} from 'react-native';
import { ActivityIndicator } from "react-native-paper";

// Styles
import styles from "../../assets/styles";

// Components
import { AllChats } from "../components";

// Utils
import { useAuth } from "../context";

// Types
import { ChatProps } from "../types";

const Chat:FC<ChatProps> = ({ navigation }) => {
    const { authData } = useAuth();

    //return jsx to render UI
    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={styles.bg}
        >
            <View style={styles.containerMessages}>
                {
                    authData ? <AllChats /> : <ActivityIndicator style={styles.indicator} size="large" color="#F0ABC1" />
                }
            </View>
        </ImageBackground >
    );
};

export default Chat;