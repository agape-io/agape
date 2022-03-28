import React, { useState, useEffect, useRef, FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  Platform,
  RefreshControl,
  Switch,
  Alert,
  Modal
} from 'react-native'
// import Icon from 'react-native-vector-icons/Entypo'

import { SettingsScreen, SettingsData, Chevron } from '../components'

import {
  HomeTabNavigatorParamList,
  RootNavigatorParamsList,
  MessageStackParamList
} from "../types";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAuth } from '../navigation';


const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif'


export interface SettingsProps {
  navigation: CompositeNavigationProp<NativeStackNavigationProp<HomeTabNavigatorParamList, 'Settings'>,
    NativeStackNavigationProp<RootNavigatorParamsList>>;
}

const Settings: FC<SettingsProps> = ({ navigation }) => {
  // state = {
  //   refreshing: false,
  // }
  // const [chat, setChat] = useState({ message: '', sid: '', time: '', rid: '' });
  const [refreshing] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const auth = useAuth();

  const { userId, token } = auth.authData;

  const settingsData: SettingsData = [
    {
      type: 'SECTION',
      // header: 'General'.toUpperCase(),
      rows: [
        {
          title: 'Security',
          showDisclosureIndicator: true,
          onPress: () => renderSecurity()
        },
        {
          title: "Terms of Service",
          showDisclosureIndicator: true,
        },
        {
          title: "About Us",
          showDisclosureIndicator: true,
        },
      ],
    },
    {
      type: 'SECTION',
      header: 'Log out'.toUpperCase(),
      rows: [
        {
          title: 'Log Out',
          showDisclosureIndicator: true,
          onPress: () => signOut()
        },
      ],
    },
  ]

  const signOut = async () => {
    auth.signOut()
      .then(() => {
        navigation.navigate("Auth", { screen: "SignIn" });
      });
  };

  const renderSecurity = () => {
    console.log("renderMyView");
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="white" />
      {/* <View style={styles.navBar}>
        <Text style={styles.navBarTitle}>Settings</Text>
      </View> */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
      >
        <Text>GO BACK</Text>
      </TouchableOpacity> */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text>Show Modal</Text>
      </TouchableOpacity> */}
      <SettingsScreen
        data={settingsData}
        globalTextStyle={{ fontFamily }}
      />
    </View>
  )
};

export default Settings;

const statusBarHeight = Platform.OS === 'ios' ? 35 : 0

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBar: {
    backgroundColor: 'white',
    height: 55 + statusBarHeight,
    alignSelf: 'stretch',
    paddingTop: statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarTitle: {
    color: 'black',
    fontFamily,
    fontSize: 17,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})