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
    // data,
    name,
    gender,
    aboutMe,
    age,
    year,
    location,
    religion,
    hobby
 
    // age,
    // info1,
    // info2,
    // info3,
    // info4,
    // location,
    // matches,
    // name,
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
            <Text style={styles.infoContent}>About: {aboutMe}</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.infoContent}>Religion: {religion}</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.infoContent}>Hobbies: {hobby}</Text>
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
            <Text style={styles.infoContent}>{gender}</Text>
        </View>
    </View>
);

export default ProfileItem;
