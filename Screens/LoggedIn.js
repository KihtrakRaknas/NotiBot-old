import React from 'react'
import { StyleSheet, Platform, Image, Text, View, FlatList, ActivityIndicator, Button} from 'react-native'
import { ListItem } from 'react-native-elements'
import * as firebase from 'firebase';
import '@firebase/firestore';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Dialog from "react-native-dialog";

export default class LoggedIn extends React.Component {
  state = { currentUser: null , loading:true}

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: () => (
        <Button
          onPress={navigation.getParam('createNewProject')}
          title="+"
          color="#fff"
        />
      ),
      headerLeft: () => (
        <Button
          onPress={navigation.getParam('settings')}
          title="⚙️"
          color="#fff"
        />
      ),
      title: 'Projects',
    }
  };

  registerForPushNotificationsAsync = async() => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    const { currentUser } = firebase.auth()
    firebase.firestore().collection('Users').doc(currentUser.uid).set({
      'Push Tokens':firebase.firestore.FieldValue.arrayUnion(token)
    }, { merge: true })
  }

  createNewProject = () =>{
    alert('This is a button!')
    db.collection('Projects').doc('id').get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        db.collection('users').doc('id')
          .onSnapshot((doc) => {
            // do stuff with the data
          });
      }
    });
    firebase.firestore().collection('Users').doc(currentUser.uid).set({
      'Push Tokens':firebase.firestore.FieldValue.arrayUnion(token)
    }, { merge: true })
    firebase.firestore().collection('Projects').doc(currentUser.uid).set({
      'Push Tokens':firebase.firestore.FieldValue.arrayUnion(token)
    }, { merge: true })
  }

  checkProjName = () =>{

  }

  settings = () =>{
    this.props.navigation.navigate('Settings')
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync()
    this.props.navigation.setParams({createNewProject:this.createNewProject, settings: this.settings})
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase.firestore().collection('Users').doc(currentUser.uid).onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
      let data = (doc.data()&&doc.data()["Projects"])?doc.data()["Projects"]:[]
      this.setState({loading:false,projects:data})
   });
  }

  render() {
    const { currentUser } = this.state
    const { projects } = this.state
    return (
      <View style={styles.container}>
        <Dialog.Container visible={true}>
          <Dialog.Title>New Project</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this account? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Input label="Name"  onChangeText={(text) => this.setState({projName : text})} />
          <Dialog.Button label="Cancel" />
          <Dialog.Button label="Create" onPress={(name) => this.checkProjName(name)} />
        </Dialog.Container>
        {this.state.loading && <ActivityIndicator size="large"/>}
        {!this.state.loading && <FlatList
          style={{height:"100%"}}
          data={projects}
          renderItem={({ item }) => <ListItem title="item" bottomDivider topDivider/>}
          keyExtractor={item => item}
          ListEmptyComponent = {<View style={{flex:1,justifyContent: 'center',alignItems: 'center', padding:20}}><Text>You currently have no projects</Text><Button title="Create a new project" onPress={this.createNewProject}/></View>}
        />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})