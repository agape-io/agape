/**
 * Subscription Item Component
 */
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Button, Alert} from "react-native";
import Icon from "./Icon";
import { AntDesign } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { SubscriptionItemT } from "../types";
import { useAuth } from '../context';
// import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/FontAwesome';

// API's
import { updateSubscription } from '../utils';


//Styles
import styles, {
    DARK_GRAY,
    WHITE,
    GRAY,
    PRIMARY_COLOR,
    SECONDARY_COLOR
} from "../../assets/styles";
import { useNavigation } from "@react-navigation/native";

const SubscriptionItem = ({ data }: SubscriptionItemT) => {
  const [checked, setChecked] = useState<any>("premium");
  const auth = useAuth();
  const navigation = useNavigation();
  const { userId, token } = auth.authData;

  const updatePlanAlert = () =>{
    if (data){
      Alert.alert(
        'Subscription Updated!',
        `Plan: ${data.name.slice(0,1).toUpperCase() + data.name.slice(1)}`,
        [{text: "OK", onPress: () => navigation.navigate('Profile')}]
      )
    }
  }


    //Update user's subscription plan
    const handleUpdateSubscription = async (
      planId: string,
    ) => {
      return updateSubscription(
        userId,
        planId,
        token)
        .then((res: any) => {
            // console.log(res.data);
          //Go back to Profile Screen
          // setLoading(false);
          updatePlanAlert();
        })
        .catch((e: any) => {
          alert(e.response.data.message);
        });
    }

  return (
    <View style={styles.subscriptionOptions}>
      {data ? (
        <>
            <Text style={styles.textPlanTitles}>{data.name.slice(0,1).toUpperCase() + data.name.slice(1)}</Text>
            <Text style={styles.textDescription}>${data.price}</Text>
            <Text style={styles.textDescription}>Select Plan</Text>
            {/* {/* <Text style={styles.textDescription}>{data.name === 'premium' ? '- Get 15 more Likes per day' : ''}</Text> */}
            {/* <Text style={styles.textDescription}>{data.name === 'elite' ? '- Get 30 more Likes per day' : ''}</Text> */}
            <TouchableOpacity style={styles.subscriptionCircledButton} onPress={() => handleUpdateSubscription(data._id)}>
            <Icon name="checkmark-outline" size={30} color={SECONDARY_COLOR} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.textDescription}>No Data!</Text>
        </>
      )}
      
    </View>
  );
}

export default SubscriptionItem;
