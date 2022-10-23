import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import * as NavigationBar from "expo-navigation-bar";

import { useNavigation } from "@react-navigation/native";

//Import Icons
import { Ionicons } from "@expo/vector-icons";

//Import Components
import PostItem from "../component/PostItem";
import FAB from "../component/FAB";

//Import Firebase
import firebase from "../../config/firebase";
import axios from "axios";

//Credential Context
import { CredentialsContext } from "../component/CredentialsContext";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

NavigationBar.setBackgroundColorAsync("#fff");
NavigationBar.setButtonStyleAsync("dark");

const Posts = () => {
  var username, myEmail, userid, myAvatar;

  //Context
  const { user, setUser } = useContext(CredentialsContext);
  const [keyword, setKeyword] = useState("");
  const [posts, setPosts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const navigation = useNavigation();

  const postTest = [
    {
      _id: "62faa056653d17047e8ea2e6",
      comments: [],
      createdAt: "2022-08-15T19:36:54.225Z",
      isReel: true,
      likes: [],
      tags: [],
      text: "Test reel 2",
      image: [
        "https://bafybeigxnvb6wr57dcb7f6qxaghwxzntj6h42bje4xjws4rlzlcwnohn6i.ipfs.dweb.link/891e3431-1b0d-4346-956c-272f7b1328cc.jpg",
        "https://bafybeigxnvb6wr57dcb7f6qxaghwxzntj6h42bje4xjws4rlzlcwnohn6i.ipfs.dweb.link/891e3431-1b0d-4346-956c-272f7b1328cc.jpg",
      ],
      userDetails: [
        {
          firstname: "Elisha",
          lastname: "Akande",
          profilePicture:
            "http://res.cloudinary.com/radical007/image/upload/v1657562076/ilera/avatars/zxqss5ixkepbrdiwrvy7.jpg",
          username: "elisha1234",
        },
      ],
      userId: "62c41f443a730a08381d487d",
      views: [],
    },
  ];

  const onPost = () => {
    navigation.navigate("Posts");
  };
  const onExplore = () => {
    navigation.navigate("Explore");
  };

  if (user != null) {
    username = user.username;
    myEmail = user.email;
    userid = user._id;
  }
  async function Trending() {
    const url = "https://whispering-dusk-07432.herokuapp.com/tag";

    await axios.get(url).then((response) => {
      const result = response.data;
      setTrending(result);
    });
  }

  async function Timeline(userid) {
    const url =
      "https://whispering-dusk-07432.herokuapp.com/post/" +
      userid +
      "/timeline";

    await axios.get(url).then((response) => {
      const result = response.data;
      setPosts(result);
      console.log(result);
      setLoading(false);
    });
  }
  const onRefresh = async () => {
    setIsFetching(true);
    await Trending();
    setIsFetching(false);
  };

  const postLink = () => {
    navigation.navigate("Create Post");
  };

  const searchLink = () => {
    navigation.navigate("Search Post");
  };

  useEffect(() => {
    if (user != null) {
      username = user.username;
      myEmail = user.email;
      userid = user._id;
      Trending();
    }
  }, []);

  function listEmptyComponent() {
    return (
      <View>
        {loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: SCREEN_HEIGHT,
            }}
          >
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : null}
      </View>
    );
  }

  function renderItem({ item, index }) {
    return (
      <View>
        <Pressable
          style={styles.trendingItem}
          onPress={() => {
            navigation.navigate("Trend", { trend: item._id });
          }}
        >
          <Text style={styles.trendId}>{item._id}</Text>
          <Text style={styles.trendCount}>{item.count} posts</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => searchLink()} style={styles.inputstyle}>
          <Text style={styles.input}>Search</Text>
          <Ionicons name="md-search-outline" size={25} color="#5e5e5e" />
        </Pressable>
        <Ionicons name="ios-settings-outline" size={24} color="#111" />
      </View>
      <View>
        <FlatList
        style={{ width: "100%", paddingBottom: 70 }}
          data={trending}
          windowSize={4}
          initialNumToRender={0}
          maxToRenderPerBatch={20}
          renderItem={renderItem}
          ListHeaderComponent={
            <>
              {trending.length > 0 ? (
                <View style={styles.trendingHeader}>
                  <Text style={styles.trendHeading}>Now Trending</Text>
                </View>
              ) : null}
            </>
          }
          keyExtractor={(item) => item._id}
          decelerationRate={"normal"}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
      </View>
      <FAB onPress={postLink} />
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
  trendingHeader: {
    paddingHorizontal: 20,
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  trendHeading: {
    color: "#000",
    fontFamily: "Monstserrat_Bold",
    fontSize: 16,
  },
  trendingItem: {
    paddingHorizontal: 20,
    flexDirection: "column",
    height: 70,
    width: "100%",
    justifyContent: "center",
  },
  trendId: {
    color: "#000",
    fontFamily: "Monstserrat_Bold",
    fontSize: 14,
  },
  index: {
    color: "#111",
    fontFamily: "Monstserrat_Light",
    fontSize: 12,
  },
  trendCount: {
    color: "#5e5e5e",
    fontFamily: "Monstserrat_Regular",
    fontSize: 14,
  },
  showMore: {
    color: "#4351D8",
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
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
    height: 30,
    marginHorizontal: 10,
  },
});

export default Posts;
