import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';


import { MonoText } from '../components/StyledText';

export default class SharesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Shares',
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
        <Text
          onPress={() => {
            this.props.navigation.toggleDrawer();
          }}
        >
          Shares Page
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
  },
});
