import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';


export default class PhotoScreen extends React.Component {
  static navigationOptions = {
    title: 'Photos',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Photos Screen</Text>
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