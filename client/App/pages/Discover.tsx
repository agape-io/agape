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
    HomeTabNavigatorParamList,
    RootNavigatorParamsList
} from "../types";
import {
    City,
    Filters,
    CardItem
} from "../components";
import styles from "../../assets/styles";
import DEMO from "../../assets/data/demo";

import { getMatches } from '../utils';
import { Item } from "react-native-paper/lib/typescript/components/List/List";

export interface DiscoverProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Discover'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Discover: FC<DiscoverProps> = ({ navigation }) => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);
    //const [loading, setLoading] = useState<boolean>(true);
    const [matches, setMatches] = useState<any>(null);

    const auth = useAuth();

    const token = auth.authData.token,
        userId = auth.authData.userId;
        //isOnline = auth.authData.isOnline;
    
    const loadMatches = async () => {
        // get the id's
            getMatches(userId, token)
                .then(res => {
                    const { users } = res.data;
                    console.log(users);
                    setMatches(users);
                }).catch(e => {
                    console.log(e.message);
                });
        };

    const NoMoreCards = () => {
        return (
            <Text style={{
                textAlign: 'center',
                top: 250
            }}>
                No more matches :(
            </Text>
        )
    }
    
    useEffect(() => {
        loadMatches();

        return () => {
            setMatches(null);
        }
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
                {matches && (
                    <CardStack
                        verticalSwipe={false}
                        // keep loop to true for now
                        loop
                        renderNoMoreCards={() => <NoMoreCards />}
                        ref={newSwiper => setSwiper(newSwiper)}
                    >
                        {/** API Call made here */}
                        {matches.map((item: any, index: any) => {

                            return (
                                <Card key={index}>
                                    <CardItem
                                        key={index}
                                        data={item}
                                        hasActions
                                    />
                                </Card>
                            )
                        })}
                    </CardStack>
                )}
            </View>
        </ImageBackground>
    );
};

export default Discover;
