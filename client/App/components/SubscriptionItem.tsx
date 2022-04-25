/**
 * Subscription Item Component
 */
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert} from "react-native";
import Icon from "./Icon";
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
          //Go back to Profile Screen
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
