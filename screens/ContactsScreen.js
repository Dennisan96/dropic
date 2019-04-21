import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';


export default class ContactsScreen extends React.Component {
  static navigationOptions = {
    title: 'Contacts',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Contacts List</Text>
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
