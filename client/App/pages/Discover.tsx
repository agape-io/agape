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

import { getMatches } from '../utils';
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
        getMatches(userId, token)
            .then(res => {
                console.log("this", res.data.users);
                const { users } = res.data;

                setMatches(users);
            })
            .catch(e => {
                console.log(e.message);
            });
    };
    
    const NoMoreCards = () => {
        return (
            <Text style={{
                textAlign: 'center'
            }}>
                No more matches :(
            </Text>
        )
    }
    
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
                <CardStack
                    verticalSwipe={false}
                    // keep loop to true for now
                    loop={true}
                    renderNoMoreCards={() => <NoMoreCards />}
                    ref={newSwiper => setSwiper(newSwiper)}
                >
                    {/** API Call made here */}
                    {matches.map((item: any, index: any) => (
                        <Card>
                            <CardItem
                                data={item}
                                key={item.id}
                                hasActions
                                hasVariant
                            />
                        </Card>
                    ))}
                </CardStack>
            </View>
        </ImageBackground>
    );
};

export default Discover;