import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const HospitalList = ({onPress, image, name, time ,location}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <ImageBackground source={{ uri: image }} resizeMode="cover" style={styles.image} >
          <View style={styles.section}>
              <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail'>{name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="md-time-outline" size={20} color="#4e4e4e" />
                  <Text style={styles.subtext}>{time}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="md-location-outline" size={20} color="#4e4e4e" />
                  <Text style={styles.subtext} numberOfLines={1} ellipsizeMode='tail'>{location}</Text>
              </View>
          </View>
      </ImageBackground>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#fff',
        borderColor: '#f2f2f2',
        borderWidth: 2,
    },
    image: {
        height: 240,
        width: 240,
        justifyContent: 'flex-end'
    },
    name:{
        fontSize: 14,
        color: '#4351D8',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_SemiBold',
        marginHorizontal: 10,
    },
    section: {
        padding: 7,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    subtext:{
        fontSize: 12,
        color: '#4e4e4e',
        marginTop: 5,
        marginBottom: 5,
        height: 20,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 10,
    },
})

export default HospitalList