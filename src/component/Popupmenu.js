import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Appointments from "../screens/Menu/Appointments";
import Diagnostic from "../screens/Menu/Diagnostic";
import MyHealth from "../screens/Menu/MyHealth";
import OrderMedicine from "../screens/Menu/OrderMedicine";
import Profile from "../screens/Menu/Profile";

//import menu and menu item
import { Menu } from "react-native-material-menu";
import { MenuItem } from "react-native-material-menu";

import { CredentialsContext } from "./CredentialsContext";

const Popupmenu = (props) => {
  var name, email, id, firstname, lastname, profilePicture;

  //Context
  const { user, setUser } = useContext(CredentialsContext);
  if (user != null) {
    name = user.firstname + " " + user.lastname;
    email = user.email;
    id = user._id;
    profilePicture = user.profilePicture;
  }

  let _menu = null;

  return (
    <View style={props.menustyle}>
      <Menu
        ref={(ref) => (_menu = ref)}
        anchor={
          props.isIcon ? (
            <TouchableOpacity style={styles.box} onPress={() => _menu.show()}>
              {profilePicture ? (
                <Image
                  source={{ uri: profilePicture }}
                  style={styles.profile}
                />
              ) : (
                <Image
                  source={require("../../assets/Images/avatar.png")}
                  style={styles.profile}
                />
              )}
            </TouchableOpacity>
          ) : (
            <Text onPress={() => _menu.show()} style={props.textStyle}>
              {props.menutext}
            </Text>
          )
        }
        onRequestClose={() => _menu.hide()}
      >
        <MenuItem
          onPress={() => {
            props.navigation.navigate("Profile");
            _menu.hide();
          }}
        >
          <Text style={styles.text}>My Profile</Text>
        </MenuItem>
        <MenuItem
          onPress={() => {
            props.navigation.navigate("Store");
            _menu.hide();
          }}
        >
          <Text style={styles.text}>MarketPlace</Text>
        </MenuItem>
        <MenuItem
          onPress={() => {
            props.navigation.navigate("Rent Apartment");
            _menu.hide();
          }}
        >
          <Text style={styles.text}>Rent Apartment</Text>
        </MenuItem>
        <MenuItem
          onPress={() => {
            props.navigation.navigate("Profile");
            _menu.hide();
          }}
        >
          <Text style={styles.text}>Logout</Text>
        </MenuItem>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#FFF",
    alignItems: "flex-end",
  },
  text: {
    color: "#111",
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 16,
  },
});

export default Popupmenu;
