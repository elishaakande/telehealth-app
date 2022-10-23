import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView, 
  DrawerItemList, 
  DrawerItem,
 } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

//Credential Context
import { CredentialsContext } from '../component/CredentialsContext';

import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

//import screens
import MainScreen from './MainScreen';

//Menu Screens
import Appointments from './Menu/Appointments';
import Diagnostic from './Menu/Diagnostic';
import MyHealth from './Menu/MyHealth';
import OrderMedicine from './Menu/OrderMedicine';
import Profile from './Menu/Profile';
import Hospitals from './Hospitals';
import Medicals from './Medicals';

import Popupmenu from '../component/Popupmenu';


const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  var username, email, id, name, profilePicture;
  //Context
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const {user, setUser} = useContext(CredentialsContext);

  if (user != null) {
    name = user.firstname +" "+ user.lastname;
    username = user.username;
    email = user.email;
    profilePicture= user.profilePicture;
    id = user._id;
}




  const onLogout = async () => {
    try {
        
    } catch (e) {
        console.log(e);
    }
  };


  
  const clearDetails = async () => { 
  
    try {
      if (!__DEV__) {
        await AsyncStorage.removeItem('vMask');
        
      } else {
        await AsyncStorage.removeItem('vMask');
      }
        onLogout();
        setUser("");
    } catch ({message}){
      console.log(message)
    }
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
       {profilePicture?
        <Image
          source={{ uri: profilePicture }}
          style={styles.profile}
        />:
        <Image
            source={require("../../assets/Images/avatar.png")}
            style={styles.profile}
          />}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.username}>@JohnDoe</Text>
        </View>
        <View style={{ flexDirection: "column"}}>
             <View style={{flex: 1, height: 1, backgroundColor: "#d9d9d9", marginBottom: 10}}/>
             <View style={{flex: 1, height: 1, backgroundColor: "#d9d9d9",}}/>
             </View>
        <DrawerItemList {...props} />
          <View style={{ flexDirection: "column"}}>
             <View style={{flex: 1, height: 1, backgroundColor: "#d9d9d9", marginBottom: 10}}/>
             <View style={{flex: 1, height: 1, backgroundColor: "#d9d9d9",}}/>
          </View>
          <View style= {{paddingHorizontal: "6%", margin: 10}}>
            <Text style={styles.text} onPress={clearDetails}> Logout</Text>
          </View>
      
    </DrawerContentScrollView>
  );
}

const Dashboard = () => {


  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{
    swipeEnabled: false,
    drawerLabelStyle: {
      fontFamily:'Monstserrat_Light',
      fontSize: 16,
      color: "#111"
    },
    drawerItemStyle: {
      width: 400
    },
    drawerActiveTintColor: "white",
  }} initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={MainScreen}
        options={{
           drawerLabel: () => <View style={{flex: 1, height: 0, }}/>,
           drawerItemStyle: {
            height: 0
          },
           headerShown: false, 
           
            }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ 
          swipeEnabled: false,
          drawerLabel: 'My Profile',
          headerShown: false,
          drawerIcon: ({ tintColor }) => <FontAwesome name="user-o" size={24} color={tintColor} /> }}
      />
      <Drawer.Screen
        name="Diagnostic"
        component={Diagnostic}
        options={{ 
          drawerLabel: 'Browse Marketplace',
          headerShown: false, 
          drawerIcon: ({ tintColor }) => <Ionicons name="md-medical-outline" size={24} color={tintColor} /> }}
      />
      <Drawer.Screen
        name="Appointments"
        component={Appointments}
        options={{ 
          drawerLabel: 'Find Workers', 
          headerShown: false,
          drawerIcon: ({ tintColor }) => <Ionicons name="md-calendar-outline" size={24} color={tintColor} /> }}
      />
      <Drawer.Screen
        name="OrderMedicine"
        component={OrderMedicine}
        options={{ 
          drawerLabel: 'Rent Apartments', 
          headerShown: false,
          drawerIcon: ({ tintColor }) => <Ionicons name="md-cart-outline" size={24} color={tintColor} /> }}
      />
      <Drawer.Screen
        name="Purchase Vehicle"
        component={Medicals}
        options={{ 
          drawerLabel: 'Purchase vehicles', 
          headerShown: false,
          drawerIcon: ({ tintColor }) => <Ionicons name="md-cart-outline" size={24} color={tintColor} /> }}
      />
      <Drawer.Screen
        name="Properties"
        component={Hospitals}
        options={{ 
          drawerLabel: 'Property for Sale', 
          headerShown: false,
          drawerIcon: ({ tintColor }) => <Ionicons name="md-cart-outline" size={24} color={tintColor} /> }}
      />
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '6%',
    flexDirection: 'column',
  },
  profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: "1%"
  },
  name:{
    fontSize: 20,
    color: '#2E2E2E',
    marginTop: 5,
    marginBottom: 5,
    fontFamily:'Monstserrat_SemiBold',
    marginHorizontal: '1%',
  },
  username:{
    fontSize: 14,
    color: '#5E5E5E',
    
    marginBottom: 5,
    fontFamily:'Monstserrat_Regular',
    marginHorizontal: '1%',
  },
  text:{
    fontSize: 18,
    color: '#5E5E5E',
    
    marginBottom: 5,
    fontFamily:'Monstserrat_Regular',
    marginHorizontal: '1%',
  },
  drawer: {
    margin: 0
  }
})

export default Dashboard