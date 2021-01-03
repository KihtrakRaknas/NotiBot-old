import React from 'react'
import { StyleSheet, Platform, Image, Text, View, FlatList, ActivityIndicator, Button} from 'react-native'
import { ListItem } from 'react-native-elements'
import * as firebase from 'firebase';
import '@firebase/firestore';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default class Settings extends React.Component {
  state = { currentUser: null , loading:true}

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
    }
  };

  componentDidMount() {
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
        {this.state.loading && <ActivityIndicator size="large"/>}
        {!this.state.loading && <FlatList
          style={{height:"100%"}}
          data={projects}
          renderItem={({ item }) => <ListItem title="item" bottomDivider topDivider/>}
          keyExtractor={item => item}
          ListEmptyComponent = {<View style={{flex:1,justifyContent: 'center',alignItems: 'center', padding:20}}><Text>You currently have no projects</Text><Button title="Create a new project" onPress={this.createNewProject}/></View>}
        />}
        <Button title="Sign Out" onPress={()=>firebase.auth().signOut().then(()=>this.props.navigation.navigate('Loading'), (error) => console.error('Sign Out Error', error))}/>
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