/**
 * Sign In Screen
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface State {
  username: string;
  password: string;
};

function SignUp({ username, password }: State) {
  const [user, setUser] = useState(username);
  const [credentials, setCredentials] = useState(password);

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