import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";

import "react-native-gesture-handler";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons, Feather } from "@expo/vector-icons";

import useFont from "../../Hook/useFont";

//Credential Context
import { CredentialsContext } from "../component/CredentialsContext";

//import screens
import Home from "./Home";
import Chats from "./Chats";
import Settings from "./Settings";
import Doctors from "./Doctors";
import BookDoctor from "./BookDoctor";
import Medicals from "./Medicals";
import Hospitals from "./Hospitals";
import Store from "./Store";
import HospitalDetails from "./HospitalDetails";
import BookAppointment from "./BookAppointment";
import StoreDetails from "./StoreDetails";
import Cart from "./Cart";
import Menu from "./Menu";

//Import Components
import Popupmenu from "../component/Popupmenu";

//Menu Screens
import Appointments from "./Menu/Appointments";
import Diagnostic from "./Menu/Diagnostic";
import MyHealth from "./Menu/MyHealth";
import OrderMedicine from "./Menu/OrderMedicine";
import Profile from "./Menu/Profile";

//Medicals Screens
import OvulationDays from "./Medicals/OvulationDays";
import EstimatedDelivery from "./Medicals/EstimatedDelivery";
import BodyMaintenance from "./Medicals/BodyMaintenance";
import BodyWeight from "./Medicals/BodyWeight";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      screenOptions={({ route, navigation }) => ({
        headerLeft: () => (
          <Popupmenu
            menutext="menu"
            menustyle={{ marginRight: 16, marginLeft: 10 }}
            textStyle={{ color: "white" }}
            navigation={navigation}
            route={route}
            isIcon={true}
          />
        ),
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#2e2e2e",
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "md-home" : "md-home-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Marketplace"
        component={Store}
        options={{
          tabBarLabel: "Marketplace",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "md-basket" : "md-basket-outline"}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "md-mail" : "md-mail-outline"}
              color={color}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainScreen = () => {
  const { user, setUser } = useContext(CredentialsContext);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Appointments"
          component={Appointments}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Diagnostic"
          component={Diagnostic}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="My Health"
          component={MyHealth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order Medicine"
          component={OrderMedicine}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Doctors"
          component={Doctors}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Book Doctor"
          component={BookDoctor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Book Appointment"
          component={BookAppointment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Medicals"
          component={Medicals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hospitals"
          component={Hospitals}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Store"
          component={Store}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Store Details"
          component={StoreDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Body Maintenance"
          component={BodyMaintenance}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Body Weight"
          component={BodyWeight}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Estimated Delivery Date"
          component={EstimatedDelivery}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ovulation Days"
          component={OvulationDays}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hospital Details"
          component={HospitalDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
