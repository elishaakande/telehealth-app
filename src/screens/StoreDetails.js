import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";

import { useNavigation } from "@react-navigation/native";
//import { Rating, AirbnbRating } from "react-native-ratings";
import NumberFormat from "react-number-format";

//Credential Context
import { CredentialsContext } from "../component/CredentialsContext";
//Import Icons
import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";


const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const StoreDetails = ({ route }) => {
  var username, email, userId;
  //Context
  const { user, setUser } = useContext(CredentialsContext);
  const {
    id,
    productName,
    brand,
    images,
    description,
    price,
    rating,
    reviews,
    freeShipping,
    shippingFee,
    sold,
    available,
    sellerId,
  } = route.params;
  {
    /*var sumRating = rating.reduce((x, y) => x + y);*/
  }
  {
    /*var newRating = sumRating/rating.length;*/
  }
  const [descriptionLength, setDescriptionLength] = useState(4);
  const [desPress, setDesPressed] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  if (user != null) {
    username = user.displayName;
    email = user.email;
    userId = user._id;
  }

  const back = () => {
    navigation.goBack();
  };

  function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  async function setDescription() {
    await setDesPressed(!desPress);
    if (desPress) {
      setDescriptionLength(400);
    } else {
      setDescriptionLength(4);
    }
  }

  function addQuantity() {
    setQuantity(quantity + 1);
  }
  function subQuantity() {
    setQuantity(quantity - 1);
  }

  function addToCart() {
    firebase
      .firestore()
      .collection("Users")
      .doc(userId)
      .collection("Cart")
      .doc()
      .set({
        productId: id,
        quantity: quantity,
        price: price + shippingFee,
      })
      .then(() => {
        setModalVisible(!modalVisible);
        console.log("Product Added to Cart!");
      });
  }

  function buyNow() {

  }

  const CloseAlert = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="arrow-left" size={25} color="#111" onPress={back} />
        <View style={styles.inputstyle}></View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 90,
          width: SCREEN_WIDTH,
          alignItems: "center",
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        >
          {images.map((item, key) => (
            <View
              key={key}
              style={{
                width: SCREEN_WIDTH,
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Image
                source={{ uri: item }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
          ))}
        </ScrollView>
        
        <View
          style={{
            width: SCREEN_WIDTH,
            flexDirection: "row",
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <NumberFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"NGN "}
            renderText={(value) => <Text style={styles.bold}>{value}</Text>}
          />
          {freeShipping ? (
            <Text style={styles.lightBold}> </Text>
          ) : (
            <Text style={styles.lightBold}></Text>
          )}
        </View>
        <View style={{ width: SCREEN_WIDTH, paddingHorizontal: 20 }}>
          <Text style={styles.productName}>{productName}</Text>
        </View>
        {/* <View style={{ width: SCREEN_WIDTH, flexDirection: "row", paddingTop: 10, paddingHorizontal: 20}}>
                <Rating readonly={true} imageSize={20} startingValue={newRating}/>
                <Text style={styles.regular}>{round(newRating, 1)} </Text>
                <Text style={styles.regular}>| {sold.length} orders</Text>
                </View> */}
        {/*        <View style={{ width: SCREEN_WIDTH, flexDirection: "column", paddingTop: 10, paddingHorizontal: 20}}>
                <Text style={styles.light}>Quantity </Text>
                <View style={{ width: SCREEN_WIDTH, flexDirection: "row", paddingTop: 10,}}>
                    {quantity <2?
                    <Pressable style={styles.subtract}>
                        <Ionicons name="ios-remove" size={18} color="#f2f2f2" />
                    </Pressable>: 
                    <Pressable style={styles.add} onPress={subQuantity}>
                        <Ionicons name="ios-remove" size={18} color="#f2f2f2" />
                    </Pressable>}
                    <View style={{ width: 40, alignItems: "center"}}>
                        <Text style={styles.quantity}>{quantity}</Text>
                    </View>
                    {quantity !== available?
                    <Pressable style={styles.add} onPress={addQuantity}>
                        <Ionicons name="ios-add" size={18} color="#f2f2f2" />
                    </Pressable>:
                    <Pressable style={styles.subtract}>
                        <Ionicons name="ios-add" size={18} color="#f2f2f2" />
                    </Pressable>}
                    <View  style={{ width: 100, height: 20, alignItems: "center"}}>
                        <Text style={styles.regular}>{available} available</Text>
                    </View>
                </View>
            </View>*/}
        <View
          style={{
            width: SCREEN_WIDTH,
            flexDirection: "column",
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.productName}>Description</Text>
          <Text
            onPress={setDescription}
            style={styles.regular}
            numberOfLines={descriptionLength}
            ellipsizeMode="tail"
          >
            {description} orders
          </Text>
        </View>
      </ScrollView>
      <View style={styles.fixed}>
        <View style={styles.row}>
          <View style={styles.bottomicon}>
            <MaterialCommunityIcons
              name="storefront-outline"
              size={30}
              color="#333"
            />
          </View>
          <TouchableOpacity style={styles.contactseller} onPress={buyNow}>
            <Text style={styles.boldwhite}>Contact Seller</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    width: "70%",
    color: "#5E5E5E",
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  inputstyle: {
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  productName: {
    color: "#444",
    fontFamily: "Monstserrat_Light",
    fontSize: 16,
  },
  add: {
    backgroundColor: "#5e5e5e",
    borderRadius: 10,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  subtract: {
    backgroundColor: "#5e5e5e50",
    borderRadius: 10,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  regular: {
    color: "#5e5e5e",
    fontFamily: "Monstserrat_Regular",
    fontSize: 14,
  },
  quantity: {
    color: "#00cc66",
    fontFamily: "Monstserrat_Light",
    fontSize: 16,
  },
  light: {
    color: "#5e5e5e",
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  boldwhite: {
    color: "#fff",
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 14,
  },
  bold: {
    color: "#111",
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 25,
  },
  lightBold: {
    color: "#555",
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 20,
  },
  image: {
    width: SCREEN_WIDTH - SCREEN_WIDTH * 0.1,
    height: SCREEN_WIDTH - SCREEN_WIDTH * 0.1,
    borderRadius: 20,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginHorizontal: 5,
  },
  fixed: {
    justifyContent: "center",
    backgroundColor: "#fff",
    borderTopColor: "#f2f2f2",
    borderTopWidth: 3,
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: "center",
    width: SCREEN_WIDTH,
    height: 80,
    bottom: 0,
    position: "absolute",
  },
  bottomicon: {
    width: SCREEN_WIDTH - 0.9 * SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginVertical: 10,
  },
  addtocart: {
    backgroundColor: "#5e5e5e",
    height: 40,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: SCREEN_WIDTH - 0.6 * SCREEN_WIDTH,
  },
  buynow: {
    backgroundColor: "#4351D8",
    height: 40,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    width: SCREEN_WIDTH - 0.6 * SCREEN_WIDTH,
  },
  contactseller: {
    backgroundColor: "#4351D8",
    height: 50,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    flex: 1,
  },

  column: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
});

export default StoreDetails;
