import React, { useState, FC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  username: string;
  password: string;
};

const SignUp: FC<Props> = ({
  username,
  password
}) => {
  // const [username, setUsername] = useState(username);
  // const [password, setPassword] = useState(password);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Test Text</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea",
    alignItems: "center"
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
})

export default SignUp;