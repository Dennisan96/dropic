import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Input, Avatar } from 'react-native-elements';
import { getUserProfile, uploadProfilePhoto, saveUserProfile } from '../components/api/api';
import { ImagePicker } from 'expo';


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

  state  = {
    firstName: '',
    lastName: '',
    email: this.props.navigation.getParam('email'),
    userId: this.props.navigation.getParam('userId'),
    nickname: this.props.navigation.getParam('nickname'),
    profileUri: null,
    userProfile: null,
    newUser: true,
    toSave: false,
    profileKey: '',
    btnTitle: 'Save'
  }

  componentWillMount = () => {
    getUserProfile(this.props.navigation.getParam('userId'))
    // getUserProfile('user-uuid-fake-sheldon')
    .then(res => {
      // console.log(res);
      if (res) {
        const bucket = res.profilePhotoAddress.addressBucket;
        const key = res.profilePhotoAddress.addressKey;
        this.setState({
          firstName: res.firstName,
          lastName: res.lastName,
          profileUri: `https://s3.amazonaws.com/${bucket}/${key}`,
          userProfile: res,
          newUser: false
        });
      }
    });
  }

  handleSave = () => {
    const { newUser, firstName, lastName, profileKey, nickname, userId, email } = this.state;
    if (!newUser || lastName === '' || profileKey === '') {
      return; 
    }

    const bodyParams = {
      email: email,
      firstName: firstName,
      friends: [userId],
      id: userId,
      lastName: lastName,
      nickName: nickname,
      profilePhotoAddress: {
        addressBucket: 'anda-bucket-cloudphoto-app',
        addressKey: profileKey
      },
      profilePhotoId: profileKey,
      trips: {}
    };

    saveUserProfile(bodyParams)
    .then(res => {
      this.setState({
        toSave: false,
        btnTitle: 'Saved'
      })
    });

  }

  _launchCameraRollAsync = async () => {
    let {status} = await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);

    if (status !== 'granted') {
      console.log("Camera Roll permission not granted");
      return;
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.5
    });
    // console.log(result);

    if (!result.cancelled) {
      this.setState({ profileUri: result.uri });

      const now = Date.now();
      const msgList = {
        "messages": [
          {
            "msg_id": now,
            "img_id": "",
            "img": result.base64,
            "timestamp": now,
            "width": result.width,
            "height": result.height,
            "Schema": "Image"
          }
        ]
      };
      uploadProfilePhoto(msgList)
      .then((res) => {
        this.setState({profileKey: res[0].img_id, toSave: true});
      })
    }
  }





  render() {
    const { navigation } = this.props;
    const { email, firstName, lastName, nickname, profileUri, toSave, btnTitle } = this.state;

    return (
      <View style={styles.container}>
        {profileUri ? 
          <Avatar
            rounded
            size= 'xlarge'
            source={{
              uri: profileUri
            }}
          />
          :
          <Avatar
          rounded
          size= 'xlarge'
          title={nickname}
          onPress={this._launchCameraRollAsync}
        />
        }
        <Input
          style={styles.firstInput}
          label="FIRST NAME"
          placeholder='First Name'
          onChangeText={(text) => this.setState({firstName: text})}
          value={firstName}
          onSubmitEditing={this.handleTextChange}
        />
        <Input
          label="LAST NAME"
          placeholder='Last Name'
          onChangeText={(text) => this.setState({lastName: text})}
          value={lastName}
          onSubmitEditing={this.handleTextChange}
        />
        <Input
          label="NICKNAME"
          onChangeText={(text) => this.setState({nickame: text})}
          value={nickname}
          onSubmitEditing={this.handleTextChange}
        />
        <Input
          label="EMAIL"
          value={email}
          editable={false}
        />
        <Button
          style={styles.btn}
          title={btnTitle}
          onPress={() => this.handleSave()}
          disabled={!toSave}
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
  firstInput: {
    marginTop: 30
  },
  btn: {
    marginTop: 30
  },
});

