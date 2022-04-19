/**
 * Profile Item Component
 */
import React from "react";
import { Text, View } from "react-native";
import Icon from "./Icon";
import { ProfileItemT } from "../types";
import styles, {
    DARK_GRAY,
    WHITE,
    GRAY
} from "../../assets/styles";

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

                {data.hobbies.includes("") ?(
                    <View style={styles.info}>
                        <Text style={styles.infoContent}>Hobbies: None!</Text>
                    </View>

                ) : (
                    <View style={styles.info}>
                        <Text style={styles.infoContent}>Hobbies: {"\n"}
                            {data.hobbies.map((item: any, index: any) => {
                                return (
                                    <Text style={styles.infoContentHobbies} key={index}>{"\t"}{item}{"\n"}</Text>
                                )
                            })}
                        </Text>
                    </View>
                )}
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
