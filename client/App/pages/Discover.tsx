/**
 * Discover Screen
 */
import React, { useState, FC, useEffect } from "react";
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Text,
    InteractionManager
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
import { Item } from "react-native-paper/lib/typescript/components/List/List";


export interface DiscoverProps {
    navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeNavigatorParamList, 'Discover'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Discover: FC<DiscoverProps> = ({ navigation }) => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);
    const [match, fetchMatches] = useState([]);
    const matchesArr: any = [];

    const auth = useAuth();

    const token = auth.authData.token,
          userId = auth.authData.userId;

    const signOut = async () => {
        auth.signOut()
            .catch(e => {
                console.log(e);
            });
    }

    // call getMatches to get the matched user ids
    // use a map function to call the user ids into the getProfile page
    // save profile contents into matches state
    /**
     * data should look like this:
     * [
     *   {
     *     "id": "some-userId",
     *     ....
     *   }
     * ]
     */
    const fetchMatch = async () => {
      // get the id's
      getMatches(userId, token)
        .then((res) => {
          // retrieve id's
          const ids = res.data.users;
          ids.map((item: any, key: any) => {
            getProfile(item, token)
              .then((res) => {
                const profile = res.data.profile;
                profile["id"] = key;
                matchesArr.push(profile);
              })
              .catch((e) => {
                console.debug("catch here:", e.message);
              });
          });
        })
        .catch((e) => {
          console.log("something went wrong: ", e.message);
        });
    };

    useEffect(() => {
        if (matchesArr) {
            fetchMatches(matchesArr);
        }
    }, [match]);

    

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
                >
                    {/** API Call made here */}
                    {match.map(item => {
                        console.log(item);
                        // <Card key={item.id}>
                        //     <CardItem
                        //         name={item.name}
                        //         aboutMe={item.aboutMe}
                        //         gender={item.gender}
                        //         hobbies={item.hobbies}
                        //         location={item.location}
                        //         religion={item.religion}
                        //         yearBorn={item.yearBorn}
                        //         hasActions
                        //         hasVariant
                        //         isOnline
                        //         image={item.image}
                        //         matches={item.match} 
                        //     />
                        // </Card>
                    })}
                </CardStack>
                <TouchableOpacity style={ {width: '86%'}} onPress={() => fetchMatch()}>
                    <View style={styles.logoutButton}>
                        <Text>Fetch Match</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={ {width: '86%'}} onPress={() => navigation.navigate('Test')}>
                    <View style={styles.logoutButton}>
                        <Text>Goto Test Page</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={ {width: '86%'}} onPress={() => signOut()}>
                    <View style={styles.logoutButton}>
                        <Text>Log Out?</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Discover;