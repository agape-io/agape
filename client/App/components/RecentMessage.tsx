/**
 * Recent Messages Component
 */
import React from "react";
import {
    Text,
    View,
    Image,
    StyleSheet
} from "react-native";
import styles from "../../assets/styles";

const RecentMessage = ({ image, latestMessage, name, unread }: any) => {
    return (
        <View style={styles.containerMessage}>
            <Image source={{ uri: image }} style={styles.avatar} />
            <View style={{ flex: 1}}>
                <Text>{name}</Text>
                <Text style={styles.message}>{latestMessage}</Text>
            </View>
            <View style={[unread ? threadStyles.notification : threadStyles.emptyThread]}/>
        </View>
    );
};

const threadStyles = StyleSheet.create({
    notification: {
        width: 10,
        height: 10,
        backgroundColor: "#1982FC",
        borderRadius: 6,
        marginRight: -50,
    },
    emptyThread: {
        backgroundColor: "transparent"
    }
});

export default RecentMessage;
