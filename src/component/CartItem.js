import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import { Rating } from 'react-native-ratings';
import NumberFormat from 'react-number-format';

import firebase from '../../config/firebase';

//import icons
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const CartItem = ({id, userId, navigation, productId, quantity, iPrice, addItems, removeItems, setPriceInit, setPriceTotal, setPriceTotalR}) => {

    const [productName, setProductName] = useState("");
    const [sellerId, setSellerId] = useState("");
    const [price, setPrice] = useState(iPrice);
    const [newQuantity, setQuantity] = useState(0);
    const [available, setAvailable] = useState(0);
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [freeShipping, setFreeShipping] = useState(false);
    const [images, setImages] = useState(["1"]);
    const [rating, setRating] = useState([1]);
    const [reviews, setReviews] = useState([1]);
    const [sold, setSold] = useState([1]);
    const [shippingFee, setShippingFee] = useState(0);

    var sumRating = rating.reduce((x, y) => x + y);
    var newRating = sumRating/rating.length

    function viewItem() {
        navigation.navigate('Store Details', {
            id: productId,
            productName: productName,
            description: description,
            brand: brand,
            images: images,
            price: price,
            sold: sold,
            rating: rating,
            reviews: reviews,
            freeShipping: freeShipping,
            shippingFee: shippingFee,
            available: available,
            sellerId: sellerId
        })
    }

    function getItem () {
        firebase.firestore()
        .collection('Store')
        .doc(productId)
        .onSnapshot(documentSnapshot => {
          setProductName(documentSnapshot.data().productName);
          setSellerId(documentSnapshot.data().sellerId);
          setPrice(documentSnapshot.data().price);
          setAvailable(documentSnapshot.data().available);
          setBrand(documentSnapshot.data().brand);
          setCategory(documentSnapshot.data().category);
          setDescription(documentSnapshot.data().description);
          setShippingFee(documentSnapshot.data().shippingFee);
          setFreeShipping(documentSnapshot.data().freeShipping);
          setRating(documentSnapshot.data().rating);
          setReviews(documentSnapshot.data().reviews);
          setSold(documentSnapshot.data().sold);
          setImages(documentSnapshot.data().images);
          setQuantity(quantity)
        });
    }

    function removeFromCart () {
        firebase.firestore()
              .collection('Users')
              .doc(userId)
              .collection('Cart')
              .doc(id)
              .delete()
              .then(() => {
                removeTotal();
                console.log('Product Deleted from Cart!');
              });
    }

    function updateQuantity () {
        firebase.firestore()
              .collection('Users')
              .doc(userId)
              .collection('Cart')
              .doc(id)
              .update({
                quantity: newQuantity
              })
              .then(() => {
                removeTotal();
                console.log('Cart uodated!');
              });
    }
    async function addQuantity() {
        await setQuantity(newQuantity+1);
        await setPriceTotal1();
    }
    async function subQuantity() {
        await setQuantity(newQuantity-1);
        await setPriceTotal2();
    }
    function totalItems() {
        addItems();
    }
    function removeTotal() {
        removeItems();
    }

    function setPriceTotal1() {
        setPriceTotal(price+shippingFee)
    }
    function setPriceTotal2() {
        setPriceTotalR()
    }

    async function fetchDetails() {
        await getItem();
        await totalItems();
        setPriceInit(price+shippingFee)
    }

    useEffect(() => {
        let isMounted = true;
            if (isMounted){
                fetchDetails()
            }
          return () => { isMounted = false }; // cleanup toggles value, if unmounted
      }, [])

    return (
        <View style={styles.container}>
          <View style={styles.cover}>
              <Image source={{ uri: images[0] }}  resizeMode="cover" style={styles.image}/>
                <View style={{ flexDirection: 'column', justifyContent: 'center',  width: 0.9*SCREEN_WIDTH-100,}}>
                    <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail' onPress={viewItem}>{productName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center", paddingTop: 5}}>
                        <Ionicons name="md-trash-outline" size={25} color="#444" onPress={removeFromCart} />
                        <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value) => <Text style={styles.price}>{value}</Text>}/>
                        {newQuantity <2?
                        <Pressable style={styles.subtract}>
                            <Ionicons name="ios-remove" size={18} color="#f2f2f2" />
                        </Pressable>: 
                        <Pressable style={styles.add} onPress={subQuantity}>
                            <Ionicons name="ios-remove" size={18} color="#f2f2f2" />
                        </Pressable>}
                        <View style={{ width: 40, alignItems: "center"}}>
                            <Text style={styles.quantity}>{newQuantity}</Text>
                        </View>
                        {newQuantity !== available?
                        <Pressable style={styles.add} onPress={addQuantity}>
                            <Ionicons name="ios-add" size={18} color="#f2f2f2" />
                        </Pressable>:
                        <Pressable style={styles.subtract}>
                            <Ionicons name="ios-add" size={18} color="#f2f2f2" />
                        </Pressable>}
                    </View>
                </View>
           </View>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 120,
        width: "100%",
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: 5
    },
    cover: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 20,
        marginVertical: 10,
    },
    name:{
        fontSize: 14,
        color: '#444',
        marginTop: 1,
        marginBottom: 1,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 10,
    },
    price:{
        fontSize: 20,
        color: '#111',
        marginTop: 1,
        marginBottom: 1,
        fontFamily:'Monstserrat_SemiBold',
        marginHorizontal: 10,
    },
    currency:{
        fontSize: 16,
        color: '#111',
        marginTop: 1,
        marginBottom: 1,
        fontFamily:'Monstserrat_SemiBold',
        marginHorizontal: 10,
    },
    regulartext:{
        fontSize: 10,
        color: '#5e5e5e',
        marginTop: 1,
        marginBottom: 1,
        fontFamily:'Monstserrat_Regular',
        marginHorizontal: 10,
    },
    text2:{
        fontSize: 12,
        color: '#000',
        height: 14,
        marginTop: 1,
        marginBottom: 1,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 10,
    },
    review:{
        fontSize: 12,
        color: '#555',
        height: 14,
        marginTop: 1,
        marginBottom: 1,
        fontFamily:'Monstserrat_Regular',
        marginHorizontal: 2,
    },
    productManufacturer:{
        fontSize: 12,
        color: '#4351D8',
        height: 14,
        marginTop: 1,
        marginBottom: 1,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 10,
    },
    description:{
        fontSize: 10,
        color: '#5e5e5e',
        marginTop: 1,
        marginBottom: 1,
        fontFamily:'Monstserrat_Regular',
        marginHorizontal: 10,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        padding: 2
    },
    linkText:{
        fontSize: 11,
        color: '#4e4e4e',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 5,
    },
    linkBox: {
        height: 40,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        borderColor:'#c8c8c8',
        borderWidth: 1
    },
    add: {
        backgroundColor: "#5e5e5e",
        borderRadius: 10,
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subtract: {
        backgroundColor: "#5e5e5e50",
        borderRadius: 10,
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    regular: {
        color: '#5e5e5e',
        fontFamily: "Monstserrat_Regular",
        fontSize: 14,
    },
    quantity: {
        color: '#333',
        fontFamily: "Monstserrat_Light",
        fontSize: 16,
    },
})

export default CartItem