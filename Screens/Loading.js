import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import * as firebase from 'firebase';

export default class Loading extends React.Component {
    componentDidMount() {
      var firebaseConfig = {
        apiKey: "AIzaSyBc_AtukKnVqdNYRefB-NtZLy5otD8KMvA",
        authDomain: "notibotapp.firebaseapp.com",
        databaseURL: "https://notibotapp.firebaseio.com",
        projectId: "notibotapp",
        storageBucket: "notibotapp.appspot.com",
      };

      firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'LoggedIn' : 'SignUp')
        })
    }
  render() {
    return (
      <View style={styles.container}>
        <Text color="white" stle={styles.loadingText}>Loading</Text>
        <ActivityIndicator size="large" color="white"/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"red"
  },
  loadingText:{
    marginBottom:20
  }
})