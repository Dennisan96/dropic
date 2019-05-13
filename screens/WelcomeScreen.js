import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native'

// Load the app logo
const logo = require('./static/images/logo.png')

export default class WelcomeScreen extends React.Component {
  handleRoute = async (destination) => {
    await this.props.navigation.navigate(destination)
  }
  render() {
    return (
      <View style={styles.container}>
        {/* App Logo */}
        <Image 
          source={logo}
          style={{ width: 120, height: 120 }}
        />
        <TouchableOpacity 
          onPress={() => this.handleRoute('SignIn')}
          style={styles.button1Style}>
          <Text style={styles.textStyle}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => this.handleRoute('SignUp')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Sign Up</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity 
          onPress={() => this.handleRoute('ForgetPassword')}
          style={styles.buttonStyle}>
          <Text style={styles.textStyle}>Forget password ?</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // #b13366
    alignItems: 'center',
    justifyContent: 'center',
  },
  button1Style: {
    alignItems: 'center',
    backgroundColor: '#2f95dc',
    width: 280,
    height: 50,
    // padding: 14,
    marginTop: 100,
    borderRadius: 3,
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#2f95dc',
    width: 280,
    height: 50,
    // padding: 14,
    marginTop: 20,
    borderRadius: 3,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    color: 'white'
  }
})