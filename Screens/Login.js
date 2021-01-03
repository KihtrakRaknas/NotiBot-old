import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Alert, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import * as firebase from 'firebase';
import {checkUserFeilds} from '../checkUserFeilds'

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }  
  handleLogin = () => {
    firebase
    .auth()
    .signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      if(checkUserFeilds(doc.data()))
        this.props.navigation.navigate('LoggedIn')
      else
        this.props.navigation.navigate('SetUp')
    })
    .catch(error => {
      if(error.message.includes("The user may have been deleted"))
        error.message = error.message.substring(0,error.message.indexOf("The user may have been deleted"))
      Alert.alert(error.message)
      this.setState({ errorMessage: error.message })
    })
  }  
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {this.state.errorMessage &&
      <Text style={{ color: 'blue', marginBottom:20 }}>
          {this.state.errorMessage}
      </Text>} 
      <View style={styles.textInputBox}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
      </View>
      <View style={styles.textInputBox}>
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="white"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
      </View>
      <TouchableOpacity 
        style={styles.submitButton}
        onPress={this.handleSignUp}
      >
        <Text style={{color:"white",fontSize:20,}}>Sign In</Text>
      </TouchableOpacity>
      <Button
        color="#d1faff"
        title="Don't have an account? Sign Up"
        onPress={() => this.props.navigation.navigate('SignUp')}
      />
  </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"red",
    
  },
  textInputBox: {
    borderBottomColor:"white",
    borderBottomWidth: 1,
    marginBottom: 40,
    width:"90%",
  },
  textInput: {
    alignSelf: 'stretch',
    fontSize: 24,
    height: 40,
    fontWeight: '200',
    marginBottom: 0,
    color:"white",
    
  },
  title: {
    fontSize:50,
    marginBottom:30,
    color:"white"
  },
  submitButton:{
    alignItems: 'center',
    backgroundColor:"blue",
    width:"90%",
    padding:15,
    borderRadius:7,
    marginBottom:10
  },
})