import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  Animated,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import moment from "moment";

import { useNavigation, NavigationContainer } from "@react-navigation/native";

//Import Components
//import axios from "axios";

//Credential Context
import { CredentialsContext } from "../component/CredentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

//import icons
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../colors";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const defaultavatar = require("../../assets/Images/avatar.png");

const Menu = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(CredentialsContext);
  var username, name, email, userId, profilePicture;

  const [avatar, setAvatar] = useState("");
  const [image, setImage] = useState("");
  const docavatar = avatar || defaultavatar;
  const [tab, setTab] = useState("Post");

  const back = () => {
    navigation.goBack();
  };

  const onLogout = async () => {
    try {
      
    } catch (e) {
      console.log(e);
    }
  };

  const clearLogin = async () => {
    try {
      if (!__DEV__) {
        await AsyncStorage.removeItem("vMask");
        
      } else {
        await AsyncStorage.removeItem("vMask");
      }
      setUser(null);
      onLogout();
    } catch ({ message }) {
      console.log(message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="arrow-left"
          size={25}
          color="#111"
          onPress={() => back()}
        />
        <View style={styles.inputstyle}>
          <Text style={styles.bold}>Settings</Text>
        </View>
        <View style={{ width: 30 }} />
      </View>
      <ScrollView>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TouchableOpacity style={styles.list}>
            <Ionicons name="ios-person-outline" size={20} color="#5e5e5e" />
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.light}>Manage Account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Ionicons name="ios-shield-checkmark-outline" size={20} color="#5e5e5e" />
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.light}>Privacy and Security</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Ionicons name="ios-qr-code-outline" size={20} color="#5e5e5e" />
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.light}>QR Code</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list}>
            <Ionicons name="ios-notifications-outline" size={20} color="#5e5e5e" />
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.light}>Push Notifications</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.list} onPress={clearLogin}>
            <Ionicons name="ios-exit-outline" size={20} color="#5e5e5e" />
            <View style={{ width: 10 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.light}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: SCREEN_WIDTH * 0.6,
    color: "#5E5E5E",
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  inputstyle: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    flexDirection: "row",
    marginTop: 5,
    height: 50,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
  },
  profileView: {
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  walletLink: {
    height: 50,
    width: 50,
    borderRadius: 2,
    borderColor: "#e2e2e2",
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  bold: {
    color: "#000",
    fontFamily: "Monstserrat_Bold",
    fontSize: 16,
  },
  semibold: {
    color: "#111",
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 16,
  },
  regular: {
    color: "#5e5e5e",
    fontFamily: "Monstserrat_Regular",
    fontSize: 12,
  },
  light: {
    color: "#111",
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  list: {
    flexDirection: "row",
    width: SCREEN_WIDTH,
    padding: 20,
    alignItems: "center",
  },
  inactiveText: {
    color: "#5e5e5e",
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 16,
  },
  details: {
    flexDirection: "row",
    width: 300,
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderLeftColor: "#f5f5f5",
    borderLeftWidth: 1,
  },
  detailsBoxDefault: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  edit: {
    height: 50,
    width: 200,
    borderRadius: 2,
    borderColor: "#e2e2e2",
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollview: {
    alignItems: "center",
  },
  scrollviewgrid: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  scroll: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flex: 1,
    marginBottom: 100,
  },
  scrollgrid: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    flex: 1,
    marginBottom: 100,
  },
  heading: {
    width: SCREEN_WIDTH,
    flexDirection: "row",
  },
  profileHeader: {
    width: SCREEN_WIDTH,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    flex: 1,
    borderBottomColor: COLORS.main,
    borderBottomWidth: 2,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inactiveTab: {
    flex: 1,
    borderBottomColor: "lightgray",
    borderBottomWidth: 2,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  grid: {
    width: SCREEN_WIDTH / 3 - 2,
    height: SCREEN_WIDTH / 3,
    margin: 1,
  },
});

export default Menu;
