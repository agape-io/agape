/**
 * Discover Screen
 */
import React, { useState, FC, useEffect } from "react";
import {
    View,
    ImageBackground,
    TouchableOpacity,
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

export interface DiscoverProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeNavigatorParamList, 'Discover'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Discover: FC<DiscoverProps> = ({ navigation }) => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [match, fetchMatches] = useState<any>([]);

    let matches: any = [];

    const auth = useAuth();

    const token = auth.authData.token,
          userId = auth.authData.userId;

    const signOut = async () => {
        auth.signOut()
            .catch(e => {
                console.log(e);
            });
    }

    const getMatchIds = async () => {
      // get the id's
      return getMatches(userId, token)
        .then(res => {
            let ids = res.data.users;
            console.log(ids);
            return ids;
        })
        .catch(e => {
          console.log("something went wrong: ", e.message);
        });
    };  

    const getMatchProfiles = async () => {
        return getProfile(userId, token)
            .then(res => {
                console.log(res.data.profile);
            }).catch(e => {
                Promise.reject(e.message);
            });
        
    }
    
    // get activity indicator to load data before rendering
    //https://stackoverflow.com/questions/63281536/react-hooks-how-to-wait-for-the-data-to-be-fetched-before-rendering

    useEffect(() => {
        // Promise.all([
        //     getMatches()
        // ])
    }, []);

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
                <CardStack
                    loop
                    verticalSwipe={false}
                    renderNoMoreCards={() => <Text>No more matches :(</Text>}
                    ref={(newSwiper): void => setSwiper(newSwiper)}
                    key={match.length}
                >
                    {/** API Call made here */}
                    {match.map((item: any) => {
                        //console.log('some match', item);
                        <Card key={item.key}>
                            <CardItem
                                name={item.name}
                                aboutMe={item.aboutMe}
                                gender={item.gender}
                                hobbies={item.hobbies}
                                location={item.location}
                                religion={item.religion}
                                yearBorn={item.yearBorn}
                                hasActions
                                hasVariant
                                isOnline
                                image={item.image}
                                matches={item.match} 
                            />
                        </Card>
                    })}
                </CardStack>
                {match.map((item: any) => {
                    console.log('testing matches', item);
                })}
            </View>
        </ImageBackground>
    );
};

export default Discover;