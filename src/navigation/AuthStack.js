import React from "react";
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import DocSignup from "../screens/DocSignup";
import Dashboard from "../screens/Dashboard";
import ForgotPassword from "../screens/ForgotPassword";
import Onboarding from "../screens/Onboarding";

//Credential Context
import { CredentialsContext } from '../component/CredentialsContext';

const Stack = createStackNavigator();

const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

const AuthStack = () => {
    return (
      <CredentialsContext.Consumer>
        {({user}) => (
          <NavigationContainer theme={navTheme}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {user ?
                <Stack.Screen name="Dashboard" component={Dashboard} />
              : (<>
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Doctor Signup" component={DocSignup} />
                <Stack.Screen name="Forgot Password" component={ForgotPassword} />
                </>
              )}  
            </Stack.Navigator>
        </NavigationContainer>
        )}
        </CredentialsContext.Consumer>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    }
})

export default AuthStack;