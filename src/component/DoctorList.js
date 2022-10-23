import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';

//import icons
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';

const DoctorList = ({onPress, avatar, name, specialist, rating, reviews }) => {
    const defaultavatar = require('../../assets/Images/avatar.png');
    const docavatar = avatar || defaultavatar;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      {avatar? <Image source={{ uri: avatar }} style={styles.profile}/>: 
          <Image source={docavatar} style={styles.profile}/>}
            <View style={styles.column}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.regulartext}>{specialist}</Text>
                <View style={styles.row}>
                    <Ionicons name="md-star" size={20} color="#F1C644" />
                    <Text style={styles.text2}>{rating} | {reviews} Reviews</Text>
                </View>
            </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2'
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 20,
    },
    name:{
        fontSize: 14,
        color: '#111',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_SemiBold',
        marginHorizontal: 10,
        height: 20
    },
    regulartext:{
        fontSize: 12,
        color: '#5e5e5e',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Regular',
        marginHorizontal: 10,
    },
    text2:{
        fontSize: 12,
        color: '#000',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 10,
    },
    column: {
        flexDirection: 'column',
        width: '90%'
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        padding: 2
    }
})

export default DoctorList