import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';


export default class AddScreen extends React.Component {
  static navigationOptions = {
    title: 'Add',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Add Screen</Text>
      </ScrollView>
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