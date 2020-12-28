import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import RegisterScreen from '../screens/RegisterScreen'
import LoginScreen from '../screens/LoginScreen'
import LandingScreen from '../screens/LandingScreen'

const AuthStack = createStackNavigator()

export default function AuthNavigator() {
    return (
      <AuthStack.Navigator headerMode="none" initialRouteName="Landing">
        <AuthStack.Screen name="Landing" component={LandingScreen} />
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Register" component={RegisterScreen} />
      </AuthStack.Navigator>
    );
}