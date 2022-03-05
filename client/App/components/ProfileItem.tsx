import React from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";
import { ProfileItemT } from "../types";
import styles, {
    DARK_GRAY,
    WHITE,
    GRAY
} from "../../assets/styles";

// TODO: have this return one prop called data
// to access the data, it would be structured as "data.age, data.location", etc

const ProfileItem = ({
    age,
    info1,
    info2,
    info3,
    info4,
    location,
    matches,
    name,
}: ProfileItemT) => (
    <View style={styles.containerProfileItem}>
        {/* <View style={styles.matchesProfileItem}>
            <Text style={styles.matchesTextProfileItem}>
                <Icon name="heart" size={13} color={WHITE} /> {matches}% Match!
            </Text>
        </View> */}

        <Text style={styles.name}>{name}</Text>

        <Text style={styles.descriptionProfileItem}>
            {age} - {location}
        </Text>

        <View style={styles.info}>
            <Text style={styles.infoContent}>About: {info1}</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.infoContent}>Religion: {info2}</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.infoContent}>Hobbies: {info3}</Text>
        </View>


        <View
            style={{
                borderBottomColor: GRAY,
                borderBottomWidth: 1,
                alignSelf: 'stretch',
                // paddingVertical: 5,
                marginBottom: 5

            }}
        />

        {/* This section would be their bio */}
        <View style={styles.info}>
            <Text style={styles.infoContent}>{info4}</Text>
        </View>
    </View>
);

export default ProfileItem;
