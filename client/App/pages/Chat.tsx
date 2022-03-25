import React, {
    FC,
    useState
} from "react";
import {
    View,
    ImageBackground
} from 'react-native';
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native-paper";

import styles, { DARK_GRAY } from "../../assets/styles";
import { AllChats } from "../components";
import { useAuth } from "../context";

import { HomeTabNavigatorParamList, RootNavigatorParamsList } from "../types";

export interface ChatProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Chat'>,
        NativeStackNavigationProp<RootNavigatorParamsList>>;
}

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
