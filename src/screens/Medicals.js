import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import LottieView from "lottie-react-native";

//Import Icons
import { Ionicons } from '@expo/vector-icons';

const Medicals = () => {
    const navigation = useNavigation();
    const back = () => {
        navigation.goBack();
    }
    const onOvulation = () => {
        navigation.navigate("Ovulation Days");
    }
    const onDuedate = () => {
        navigation.navigate("Estimated Delivery Date");
    }
    const onWeight = () => {
        navigation.navigate("Body Weight");
    }
    const onBodyMaintenance = () => {
        navigation.navigate("Body Maintenance");
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="md-close-outline" size={35} color="#000" onPress={back} />
      </View>
      <View>
        <LottieView
           source={require("../../assets/hello.json")}
           style={styles.animation}
           autoPlay={false}
          />
      </View>
      <View style={{ width: '100%', paddingHorizontal: '6%', marginTop: 10 }}>
          <Text style={styles.title}>Getting Started</Text>
      </View>
      <View style={{ width: '100%', paddingHorizontal: '7%', marginVertical: 10 }}>
          <Text style={styles.text2}>Select any of the options below</Text>
      </View>
      <ScrollView style={{ alignSelf: 'stretch'}} showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: 'center'}}>
      <TouchableOpacity onPress={onOvulation} style={styles.button3}>
          <Text style={styles.text}>Fertile/Ovulation Days</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDuedate} style={styles.button2}>
          <Text style={styles.text}>Estimated Delivery Date</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onWeight} style={styles.button}>
          <Text style={styles.text}>Ideal Body Weight</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    animation: {
        width: 231,
        height: 200,
        alignSelf: 'center'
      },
    header: {
      paddingHorizontal: '6%',
      flexDirection: 'row',
      width: "100%",
      paddingTop: 20,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2'
    },
    title:{
        fontSize: 20,
        color: '#000',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Bold',
        marginHorizontal: 10,
    },
    input: {
      width: '70%',
      color: '#5E5E5E',
      fontFamily: "Monstserrat_Light",
      fontSize: 14,
    },
    inputstyle: {
      backgroundColor: '#F2F2F2',
      width: '100%',
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    text2: {
        color: '#5e5e5e',
        fontFamily: "Monstserrat_SemiBold",
        fontSize: 14,
      },
    text: {
      color: '#fff',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 14,
    },
    button:{
        backgroundColor: "#000",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '6%',
        alignItems: 'center',
        margin: 5, 
        height: 60,
        marginHorizontal: 10,
        width: '88%'
    },
    button2:{
        backgroundColor: "#9C27B0",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '6%',
        alignItems: 'center',
        margin: 5, 
        height: 60,
        marginHorizontal: 10,
        width: '88%'
    },
    button3:{
        backgroundColor: "#BD7C11",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '6%',
        alignItems: 'center',
        margin: 5, 
        height: 60,
        marginHorizontal: 10,
        width: '88%'
    },
    button4:{
        backgroundColor: "#3FA774",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '6%',
        alignItems: 'center',
        margin: 5, 
        height: 60,
        marginHorizontal: 10,
        width: '88%'
    },
  });
  

export default Medicals