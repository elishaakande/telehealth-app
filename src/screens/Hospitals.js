import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import moment from "moment";
import { useNavigation } from "@react-navigation/native";

//Import Icons
import { Ionicons } from "@expo/vector-icons";

//Credential Context
import { CredentialsContext } from "../component/CredentialsContext";

//Import Components
import HospitalFlatList from "../component/HospitalFlatList";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Hospitals = () => {
  const navigation = useNavigation();
  var username, email, id, avatar;

  //Context
  const { user, setUser } = useContext(CredentialsContext);

  const [keyword, setKeyword] = useState("");
  const [hospitalList, setHospitalList] = useState([]);
  const [loading, setLoading] = useState(true);

  const back = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="md-arrow-back-outline"
          size={24}
          color="#000"
          onPress={back}
        />
        <View style={styles.inputstyle}>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Search for Hospitals"
            placeholderTextColor="#5E5E5E"
            keyboardType="default"
            style={styles.input}
          />
          <Ionicons name="md-search-outline" size={25} color="#5e5e5e" />
        </View>
      </View>
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        <HospitalFlatList
          name={"Akure Teaching Hospital"}
          image="https://upload.wikimedia.org/wikipedia/commons/2/25/Teaching_Hospital%2C_Akure%2C_Ondo_State.jpg"
          time={"08:00 AM - 05:00 PM"}
          location={"Hospital Road, Around NEPA"}
        />
        <HospitalFlatList
          name={"Mother and Child Hospital, Akure"}
          image="https://topgov-media.s3.amazonaws.com/photos/photos/IMG_0375_large_thumbnail.JPG"
          time={"08:00 AM - 05:00 PM"}
          location={"Oke aro"}
        />
        <HospitalFlatList
          name={"Federal Medical Center Owo"}
          image="https://tvcnews.gridpapacdn.com/wp-content/uploads/2018/04/FMC-Owo-TVC.jpg"
          time={"08:00 AM - 05:00 PM"}
          location={"Owo, Nigeria"}
        />
        <HospitalFlatList
          name={"Akure Tradomedical and Surgical General Hospital"}
          image="https://ehealth.eletsonline.com/wp-content/uploads/2009/07/best-hospital-in-south-india.jpg"
          time={"08:00 AM - 05:00 PM"}
          location={"Hospital Road, Around NEPA"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    flexDirection: "row",
    marginTop: 5,
    height: 60,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  input: {
    width: (SCREEN_WIDTH - 30) * 0.6,
    color: "#5E5E5E",
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  inputstyle: {
    backgroundColor: "#F2F2F2",
    width: (SCREEN_WIDTH - 30) * 0.85,
    marginHorizontal: 10,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#4351D8",
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Monstserrat_SemiBold",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    alignItems: "center",
    marginHorizontal: 5,
    height: 40,
    marginHorizontal: 10,
  },
});

export default Hospitals;
