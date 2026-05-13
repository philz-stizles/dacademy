import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goals, setGoals] = useState([]);
  
  const emailInputHandler = (value) => {
    setEmail(value);
  };

  const passwordInputHandler = (value) => {
    setPassword(value);
  };

  const signupHandler = () => {
    setGoals((prevState) => [
      ...prevState,
      { id: Math.random().toString(), text: email },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working cccc on your app</Text>
      <TextInput
        style={styles.input}
        onChangeText={emailInputHandler}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={passwordInputHandler}
        placeholder="Password"
      />
      <TextInput
        style={styles.input}
        onChangeText={passwordInputHandler}
        placeholder="Confirm Password"
      />
      <Button title="Sign up" onPress={signupHandler} />
      <FlatList
        data={goals}
        keyExtractor={(item, index) => item.id}
        alwaysBounceHorizontal={false}
        renderItem={(itemData) => <Text>{itemData.item.text}</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  input: {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    marginBottom: 24
  }
});
