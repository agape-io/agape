import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Icon } from './index';
import styles, { DARK_GRAY } from "../../assets/styles";

const City = () => (
  <TouchableOpacity style={styles.city}>
    <Text style={styles.cityText}>
      <Icon name="location-sharp" size={13} color={DARK_GRAY} />
    </Text>
  </TouchableOpacity>
);

export default City;
