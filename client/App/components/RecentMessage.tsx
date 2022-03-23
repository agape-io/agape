import React from "react";
import { Text, View, Image } from "react-native";
import styles from "../../assets/styles";

const RecentMessage = ({ image, latestMessage, name }: any) => (
    <View style={styles.containerMessage}>
        <Image source={{ uri: image }} style={styles.avatar} />
        <View>
            <Text>{name}</Text>
            <Text style={styles.message}>{latestMessage}</Text>
        </View>
    </View>
);

export default RecentMessage;
