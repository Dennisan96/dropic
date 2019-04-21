import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerLeft: (
        <Button
          onPress={() => navigation.toggleDrawer()}
          title="Menu"
          color="#000"
        />
      )
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});