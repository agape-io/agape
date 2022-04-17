/**
 * Discover Screen
 */
// Libraries
import React, {
    useState,
    FC,
    useCallback,
    useRef
} from "react";
import {
    View,
    ImageBackground,
    Text,
} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { useFocusEffect } from "@react-navigation/native";

// Utils
import { useAuth } from "../context";
import { getMatches } from '../utils';

// Types
import { DiscoverProps } from "../types";

// Components
import { CardItem } from "../components";

// Styles
import styles from "../../assets/styles";

const Discover:FC<DiscoverProps> = ({ navigation }) => {
    const [swiper, setSwiper] = useState<CardStack | null>(null);
    //const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<any>('');
    const [matches, setMatches] = useState<any>(null);
    const isMounted = useRef<any>(null);

    const auth = useAuth();

    const { token, userId } = auth.authData;
    
    const loadMatches = async () => {
        // get the id's
            getMatches(userId, token)
                .then(res => {
                    const { users } = res.data;
                    setMatches(users);
                }).catch(e => {
                    setErrorMessage(e.response.data.message);
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
    
    // Load matches
    useFocusEffect(
        useCallback(() => {
            loadMatches();
            isMounted.current = true;

            return () => {
                setMatches(null);
                isMounted.current = false;
            }
        }, [])
    );

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
                {matches ? (
                    <CardStack
                        verticalSwipe={false}
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
                ) : (
                        <>
                            <Text style={{textAlign: 'center', marginTop: 250}}>{errorMessage}</Text>
                    </>
                )}
            </View>
        </ImageBackground>
    );
};

export default Discover;