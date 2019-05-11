import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


export default class AddTripScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add a New Trip',
    }
  };

  state  = {
      tripName: ''
  }

  handleTextChange = () => {
    console.log(this.state.tripName);
  }

  render() {
    return (
        <View style={styles.container}>
            <Input
            label="TRIP NAME"
            placeholder='Type in a cool name for your trip'
            onChangeText={(text) => this.setState({tripName: text})}
            value={this.state.text}
            onSubmitEditing={this.handleTextChange}
            />
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