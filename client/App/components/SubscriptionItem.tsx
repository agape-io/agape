/**
 * Subscription Item Component
 */
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Button, Alert} from "react-native";
import Icon from "./Icon";
import { RadioButton } from 'react-native-paper';
import { SubscriptionItemT } from "../types";
import { useAuth } from '../context';

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
            {/* <Text style={styles.textDescription}>${data._id}</Text> */}
            {/* {/* <Text style={styles.textDescription}>{data.name === 'premium' ? '- Get 15 more Likes per day' : ''}</Text> */}
            <Text style={styles.textDescription}>{data.name === 'elite' ? '- Get 30 more Likes per day' : ''}</Text>
            <Button
              onPress={() => handleUpdateSubscription(data._id) }
              color={PRIMARY_COLOR}
              title={"Select Plan \u2713"}
    
            />
            {/* <Icon name="checkmark-outline" size={30} color={PRIMARY_COLOR} /> */}
            {/* <RadioButton
              value='premium'
              color={PRIMARY_COLOR}
              status={checked === 'premium' ? "checked" : "unchecked"}
              onPress={() => setChecked(data.name)}
            />  */}
            {/* <Text>{checked + ' | ' + data.name}</Text> */}
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
