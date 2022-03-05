import React, { FC, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Icon, ProfileItem } from "../components";
import DEMO from "../../assets/data/demo";
import styles, { WHITE } from "../../assets/styles";
import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeTabNavigatorParamList, RootNavigatorParamsList } from "../types";

export interface ProfileProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Discover'>,
  NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Profile: FC<ProfileProps> = ({ navigation }) => {
  
  const [modal, setModal] = useState<boolean>(false);
  // use this state to populate data through an object
  const [profile, setProfile] = useState<any>(null);
  
  const {
    age,
    image,
    info1,
    info2,
    info3,
    info4,
    location,
    match,
    name,
  } = DEMO[7];

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.bg}
    >
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={image} style={styles.photo}>
          <View style={styles.top}>
            <TouchableOpacity>
              <Icon
                name="chevron-back"
                size={20}
                color={WHITE}
                style={styles.topIconLeft}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <ProfileItem
          matches={match}
          name={name}
          age={age}
          location={location}
          info1={info1}
          info2={info2}
          info3={info3}
          info4={info4}
        />

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton} onPress={() => navigation.navigate('ProfileModal')}>
            <Icon name="pencil-outline" size={30} color={WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.textButton}>Change Your Preferences</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.circledButton}>
            <Icon name="settings-outline" size={30} color={WHITE} />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Profile;
