/**
 * Settings Screen
 */
// Libraries
import React, {
  useState,
  useEffect,
  useRef,
  FC
} from "react";
import {
  Text,
  View,
  StatusBar,
  Image,
  Platform,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native'

// Components
import { SettingsScreen, SettingsData } from '../components'

// Types
import { SettingsProps } from "../types";

// Utils
import { useAuth } from '../context';

// Styles
import styles from "../../assets/styles";

const fontFamily = Platform.OS === 'ios' ? 'Avenir' : 'sans-serif';
const statusBarHeight = Platform.OS === 'ios' ? 35 : 0

const Settings: FC<SettingsProps> = ({ navigation }) => {
  const [refreshing] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const auth = useAuth();
  
  const { userId, token } = auth.authData;

  const settingsData: SettingsData = [
    {
      type: 'SECTION',
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
        navigation.navigate("Auth", { screen: "SignIn"});
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
    <View style={styles.settingsContainer}>
      <StatusBar barStyle="light-content" backgroundColor="white" />
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