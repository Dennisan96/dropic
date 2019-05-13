import React from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { Auth } from 'aws-amplify';

export default class CreateProfileScreen extends React.Component {
  state = {
    email: '',
    nickname: '',
    password: '',
    confirmationCode: '',
  };
  
  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={value => this.onChangeText('email', value)}
          style={styles.input}
          placeholder="email"
        />
        <TextInput
          onChangeText={value => this.onChangeText('nickname', value)}
          style={styles.input}
          placeholder="nickname"
        />
        <TextInput
          onChangeText={value => this.onChangeText('password', value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder="password"
        />
        <Button title="Sign Up" onPress={this.signUp.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
});