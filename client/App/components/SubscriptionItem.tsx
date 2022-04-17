/**
 * Subscription Item Component
 */
import React, { useState } from "react";
import { Text, View, TouchableOpacity} from "react-native";
import Icon from "./Icon";
import { RadioButton } from 'react-native-paper';
import { SubscriptionItemT } from "../types";

//Styles
import styles, {
    DARK_GRAY,
    WHITE,
    GRAY,
    PRIMARY_COLOR,
    SECONDARY_COLOR
} from "../../assets/styles";

const SubscriptionItem = ({ data }: SubscriptionItemT) => {
  const [checked, setChecked] = useState<any>("basic");

  return (
    <TouchableOpacity style={styles.subscriptionOptions}>
      {data ? (
        <>
            <Text style={styles.textPlanTitles}>{data.name.slice(0,1).toUpperCase() + data.name.slice(1)}</Text>
            <Text style={styles.textDescription}>${data.price}</Text>
        </>
      ) : (
        <>
          <Text style={styles.textDescription}>No Data!</Text>
        </>
      )}
      
    </TouchableOpacity>
  );
}

export default SubscriptionItem;
