import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import moment from "moment";
import { useNavigation } from "@react-navigation/native";

//Import Icons
import {
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

//Credential Context
import { CredentialsContext } from "../component/CredentialsContext";

//Import Components
import ProductItem from "../component/ProductItem";


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const list = [
  {
    id: 1,
    fullName: "Austin Distel",
    email: "distel@gmail.com",
    specialty: "Primary Care Physicians",
    avatar: "https://firebasestorage.googleapis.com/v0/b/ileraapp-cf05b.appspot.com/o/austin-distel-min.jpg?alt=media&token=ad9da0ff-07cb-4f81-a9e9-9c8b2f5acef5",
    rating: 4.5,
    reviews: 10
  },
  {
    id: 2,
    fullName: "Rian Ramirez",
    email: "haw@gmail.com",
    specialty: "Obstetricians and gynecologists",
    avatar: "https://firebasestorage.googleapis.com/v0/b/ileraapp-cf05b.appspot.com/o/rian-ramirez.jpg?alt=media&token=82d83e27-8563-429a-ba23-4cc872633ff3",
    rating: 4.7,
    reviews: 290
  },
  {
    id: 3,
    fullName: "Bruno Rodrigues",
    email: "haw@gmail.com",
    specialty: "Pediatricians",
    avatar: "https://firebasestorage.googleapis.com/v0/b/ileraapp-cf05b.appspot.com/o/bruno-rodrigues-min.jpg?alt=media&token=2ffea315-4182-452d-b3df-159d574898ca",
    rating: 4.7,
    reviews: 50
  },
  {
    id: 4,
    fullName: "Dalton Ngangi",
    email: "haw@gmail.com",
    specialty: "Family physicians",
    avatar: "https://firebasestorage.googleapis.com/v0/b/ileraapp-cf05b.appspot.com/o/dalton-ngangi-min.jpg?alt=media&token=c7f0c76d-e410-4c7a-92b4-eb4ea44ae935",
    rating: 4.8,
    reviews: 20
  }
]

const Store = () => {
  const navigation = useNavigation();
  var username, email, id, avatar;

  //Context
  const { user, setUser } = useContext(CredentialsContext);

  const [keyword, setKeyword] = useState("");
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const back = () => {
    navigation.goBack();
  };

  async function getProducts() {
    const url = "https://whispering-dusk-07432.herokuapp.com/store/";

    await axios.get(url).then((response) => {
      const result = response.data;
      setProductList(result);
      console.log(result);
    });
  }

  async function categoryProducts(category) {
    await setModalVisible(!modalVisible);
    const url =
      "https://whispering-dusk-07432.herokuapp.com/store/category/" + category;

    await axios.get(url).then((response) => {
      const result = response.data;
      setProductList(result);
      console.log(result);
    });
  }

  async function Search() {
    const url =
      "https://whispering-dusk-07432.herokuapp.com/store/search/" + keyword;

    await axios.get(url).then((response) => {
      const result = response.data;
      setProductList(result);
      console.log(result);
    });
  }

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setModalVisible(!modalVisible);
  };


  function renderItem({ item }) {
    const date = new Date(
      item.createdAt.seconds * 1000 + item.createdAt.nanoseconds / 1000000
    );
    const time = moment(item.createdAt).fromNow();

    return (
      <ProductItem
        productName={item.productname}
        image={item.images[0]}
        price={item.price}
        description={item.description}
        rating={item.rating}
        reviews={item.reviews}
        sold={item.sold}
        onPress={() => {
          navigation.navigate("Store Details", {
            id: item.id,
            productName: item.productname,
            description: item.description,
            images: item.images,
            price: item.price,
            available: item.available,
            sellerId: item.sellerId,
          });
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputstyle}>
          <TextInput
            value={keyword}
            onChangeText={setKeyword}
            placeholder="Search MarketPlace"
            placeholderTextColor="#5E5E5E"
            keyboardType="default"
            style={styles.input}
            onSubmitEditing={() => Search()}
          />
          <Ionicons name="md-search-outline" size={20} color="#5e5e5e" />
        </View>
        <Ionicons
          name="md-filter-outline"
          size={25}
          color="#111"
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
      <FlatList
        style={{ width: "100%" }}
        data={productList}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={renderItem}
        maxToRenderPerBatch={6} //render only 5 items per scroll.
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
  filterView: {
    flex: 1,
  },
  filterContainer: {
    backgroundColor: "#fff",
    height: SCREEN_HEIGHT - 20,
    width: SCREEN_WIDTH - 50,
    right: 0,
  },
  bottomBold: {
    color: "#111",
    fontFamily: "Monstserrat_Bold",
    fontSize: 16,
  },
  bottomheader: {
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
  bottomHeading: {
    flex: 1,
    height: 40,
    justifyContent: "center",
  },
  bottomItem: {
    width: "100%",
    height: 50,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  bottomIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  bottomItemText: {
    color: "#111",
    fontFamily: "Monstserrat_Light",
    fontSize: 16,
  },
});

export default Store;
