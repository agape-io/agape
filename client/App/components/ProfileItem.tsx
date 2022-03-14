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


const ProfileItem = ({ data }: ProfileItemT) => (
    <View style={styles.containerProfileItem}>
        {/* <View style={styles.matchesProfileItem}>
            <Text style={styles.matchesTextProfileItem}>
                <Icon name="heart" size={13} color={WHITE} /> {matches}% Match!
            </Text>
        </View> */}

        {data.name ? (<Text style={styles.name}>{data.name}</Text>) : (<Text style={styles.name}>Welcome user!</Text>)}

        {data.aboutMe && (
            <>
                <Text style={styles.descriptionProfileItem}>
                    {data.age} - {data.location}
                </Text>
                <View style={styles.info}>
                    <Text style={styles.infoContent}>About: {data.aboutMe}</Text>
                </View>

                <View style={styles.info}>
                    <Text style={styles.infoContent}>Religion: {data.religion}</Text>
                </View>

                {/* TODO: iterate hobbies , if empty return "No Hobbies!" */}
                {/* <View style={styles.info}>
                    <Text style={styles.infoContent}>Hobbies: {hobby}</Text>
                </View> */}
            </>
        )}
        
       
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
        {data.gender ? (
            <View style={styles.info}>
                <Text style={styles.infoContent}>{data.gender}</Text>
            </View>
        ) : (
            <View style={styles.info}>
                <Text style={styles.infoContent}>Update your profile by clicking on the left stylus!</Text>
            </View>
        )}
        
    </View>
);

export default ProfileItem;
