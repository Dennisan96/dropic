import React from 'react';
import { TextInput, Button, StyleSheet, Text, View, Alert } from 'react-native';
import { Auth } from 'aws-amplify';

export default class SignUpScreen extends React.Component {
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
  signUp() {
    Auth.signUp({
      username: this.state.email,
      password: this.state.password,
      attributes: {
        email: this.state.email,
        nickname: this.state.nickname,
      },
    })
      .then(() => {
        Alert.alert('successful sign up!');
        this.props.navigation.navigate('SignIn');
      })
      .catch(err => Alert.alert('error signing up!: ', err));
  }
  // confirmSignUp() {
  //   Auth.confirmSignUp(this.state.username, this.state.confirmationCode)
  //     .then(() => console.log('successful confirm sign up!'))
  //     .catch(err => console.log('error confirming signing up!: ', err));
  // }
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
        {/* <TextInput
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder="confirmation Code"
        />
        <Button
          title="Confirm Sign Up"
          onPress={this.confirmSignUp.bind(this)}
        /> */}
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