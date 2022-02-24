/**
 * Discover Screen
 */
import React, { useState, FC, useEffect } from "react";
import {
    View,
    ImageBackground,
    ActivityIndicator,
    Text,
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useAuth } from "../navigation";
import {
    HomeNavigatorParamList,
    RootNavigatorParamsList
} from "../types";
import {
    City,
    Filters,
    CardItem
} from "../components";
import styles from "../../assets/styles";
import DEMO from "../../assets/data/demo";

import { getMatches, getProfile } from '../utils';
import { TouchableOpacity } from "react-native-gesture-handler";

export interface DiscoverProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeNavigatorParamList, 'Discover'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Discover: FC<DiscoverProps> = ({ navigation }) => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);
    const [loading, isLoading] = useState<boolean>(true);
    const [matches, setMatches] = useState<any>([]);

    const auth = useAuth();

    const token = auth.authData.token,
        userId = auth.authData.userId,
        isOnline = auth.authData.isOnline;

    
    const loadMatches = async () => {
        // get the id's
        const matchProfiles: any = [];
        getMatches(userId, token)
            .then(res => {
                const { users } = res.data;
                // iterate through ids to parse profile results
                users.map((userId: any, index:any) => {
                    getProfile(userId, token)
                        .then(res => {
                            //console.log(res.data.profile);
                            const { profile } = res.data;
                            matchProfiles.push({
                                id: index,
                                aboutMe: profile.aboutMe,
                                gender: profile.gender,
                                hobbies: profile.hobbies,
                                location: profile.location,
                                name: profile.name,
                                yearBorn: profile.yearBorn
                            });
                            console.log(matchProfiles);
                            return matchProfiles;
                        });
                });
            }).then(() => {
                setMatches(matchProfiles);
            }).catch(e => {
                console.error(e.message);
            });
    };  
    
    useEffect(() => {
        loadMatches();
    
    }, []);

    // if (matches === undefined) {
    //     isLoading(true);
    //     return (
    //         <View style={{
    //             justifyContent: 'center',
    //             flex: 1,
    //             alignItems: 'center',
    //             position: 'absolute',
    //             top: 400,
    //             left: 0,
    //             right: 0,
    //             bottom: 0
    //         }}>
    //             <ActivityIndicator size="large" color="#F0ABC1" />
    //         </View>
    //     );
    // }
    // get activity indicator to load data before rendering
    //https://stackoverflow.com/questions/63281536/react-hooks-how-to-wait-for-the-data-to-be-fetched-before-rendering
    // https://stackoverflow.com/questions/56783262/how-to-store-data-from-json-api-response-into-array-in-reactjs

    return (
        <ImageBackground
            source={require("../../assets/images/bg.png")}
            style={styles.bg}
        >
            <View style={styles.containerHome}>
                <View style={styles.top}>
                    {/* <City /> */}
                    {/* <Filters /> */} 
                </View>
                {matches.map((item: any, index: any) => (                    //console.log('some matches:', index);
                    <View key={item.id}>
                        <Text>{item.name}</Text>
                        <Text>{item.aboutMe}</Text>
                        <Text>{item.gender}</Text>
                    </View>
                ))}
                {/* <CardStack
                    verticalSwipe={false}
                    renderNoMoreCards={() => <Text style={{ justifyContent: 'center', alignItems: 'center' }}>No more matches :(</Text>}
                    ref={newSwiper => setSwiper(newSwiper)}
                    key={matches.length}
                > */}
                    {/** API Call made here */}
                    {/* {matches.map((item: any, index: any) => (
                        <Card>
                            <CardItem
                                data={item}
                                key={item.id}
                                hasActions
                                hasVariant
                            />
                        </Card>
                    ))} */}
                {/* </CardStack> */}
            </View>
        </ImageBackground>
    );
};

export default Discover;