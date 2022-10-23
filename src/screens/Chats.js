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
import ChatList from "../component/ChatList";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Chats = () => {
  const navigation = useNavigation();
  var username, email, id, avatar;

  //Context
  const { user, setUser } = useContext(CredentialsContext);

  const [keyword, setKeyword] = useState("");
  const [chatlist, setChatlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  if (user != null) {
    username = user.username;
    email = user.email;
    id = user._id;
  }

  const onChat = () => {
    navigation.navigate("Posts");
  };

  const onRefresh = async () => {
    setIsFetching(true);
    
    setIsFetching(false);
  };

  async function getChat() {
    const url = "https://whispering-dusk-07432.herokuapp.com/chat/" + id;
    await axios.get(url).then((response) => {
      const result = response.data;
      setChatlist(result);
      console.log(result);
      setLoading(false);
    });
  }

  function renderItem({ item }) {
    return (
      <ChatList
        id={item._id}
        onPress={() => {
          navigation.navigate("Room", {
            id: item._id,
            fullname: item.userDetails[0].name,
            username: item.userDetails[0].username,
            image: item.userDetails[0].profilePicture,
          });
        }}
        lastMessage={item.lastMessage}
        lastMessageTime={moment(item.updatedAt).format("LT")}
        name={item.userDetails[0].name}
        image={item.userDetails[0].profilePicture}
      />
    );
  }
  function listEmptyComponent() {
    return (
      <View>
        {loading !== true ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 300,
            }}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputstyle}>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Search for chats"
            placeholderTextColor="#5E5E5E"
            keyboardType="default"
            style={styles.input}
          />
          <Ionicons name="md-search-outline" size={25} color="#5e5e5e" />
        </View>
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={chatlist}
        keyExtractor={(item) => item.id}
        refreshing={isFetching}
        onRefresh={onRefresh}
        renderItem={renderItem}
        maxToRenderPerBatch={10} //render only 5 items per scroll.
      />
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
  input: {
    width: SCREEN_WIDTH * 0.6,
    color: "#5E5E5E",
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  inputstyle: {
    backgroundColor: "#F2F2F2",
    flex: 1,
    marginRight: 10,
    height: 30,
    borderRadius: 2,
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

export default Chats;
