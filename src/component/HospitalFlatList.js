import { View, Text, StyleSheet, ImageBackground, Image, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const HospitalFlatList = ({onPress, image, name, time ,location}) => {
  return (
    <View style={styles.container}>
        <Image source={{ uri: image }} resizeMode="cover" style={styles.image} />
        <View style={styles.section}>
            <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>{name}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="md-time-outline" size={16} color="#4e4e4e" />
                <Text style={styles.subtext}>{time}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="md-location-outline" size={16} color="#4e4e4e" />
                <Text style={styles.subtext} numberOfLines={1} ellipsizeMode='tail'>{location}</Text>
            </View>
            <TouchableOpacity style={styles.linkBox} onPress={onPress}>
                <Text style={styles.linkText}>VIEW LOCATION</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH*0.5,
        paddingTop: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 150,
        width: (SCREEN_WIDTH-60)*0.5,
        justifyContent: 'flex-end',
    },
    name:{
        fontSize: 12,
        color: '#4351D8',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_SemiBold',
        marginHorizontal: 5,
    },
    section: {
        padding: 7,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    subtext:{
        fontSize: 10,
        color: '#4e4e4e',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 5,
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

export default HospitalFlatList