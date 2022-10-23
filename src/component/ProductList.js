import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
//import { Rating } from 'react-native-ratings';
import NumberFormat from 'react-number-format';

//import icons
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const ProductList = ({onPress, image, productName, sold, price, rating, reviews}) => {
    var sumRating = rating.reduce((x, y) => x + y);
    var newRating = sumRating/rating.length
    return (
        <Pressable onPress={onPress} style={styles.container}>
          <View style={styles.cover}>
              <Image source={{ uri: image }}  resizeMode="cover" style={styles.image}/>
                <View style={{ flexDirection: 'column', justifyContent: 'center',  width: 0.9*SCREEN_WIDTH-140,}}>
                    <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>{productName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,}}>
                     {/*<Rating readonly={true} imageSize={12} startingValue={newRating} />*/}
                    <Text style={styles.review}>({sold.length})</Text>
                    </View>
                    <View style={{ flexDirection: 'row'}}>
                        <NumberFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'₦'} renderText={(value) => <Text style={styles.price}>{value}</Text>}/>
                    </View>
                </View>
           </View>
        </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 150,
        width: "100%",
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cover: {
        alignItems: 'center',
        flexDirection: 'row',
        width: "90%",
        borderBottomColor: "#f2f2f2",
        borderBottomWidth: 2
    },
    image: {
        height: 100,
        width: 100,
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
})

export default ProductList