import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Loading from './Screens/Loading'
import SignUp from './Screens/SignUp'
import Login from './Screens/Login'
import LoggedIn from './Screens/LoggedIn'
import SetUp from './Screens/SetUp'
import Settings from './Screens/Settings'

const LoggedInStack = createStackNavigator({
  LoggedIn,
  Settings
},
{
  initialRouteName: 'LoggedIn',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: 'red',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})

const App = createAppContainer(createSwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    LoggedInStack,
    SetUp
  },
  {
    initialRouteName: 'Loading'
  }
))
export default App