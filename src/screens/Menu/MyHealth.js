import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';


//Import Icons
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const MyHealth = () => {
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
      <View style={{ width: '100%', paddingHorizontal: '6%', marginTop: 10 , marginBottom: 20 }}>
          <Text style={styles.title}>My Health</Text>
      </View>
      <ScrollView style={{ alignSelf: 'stretch'}} showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: 'center', flexDirection: 'row', paddingHorizontal: '6%', marginVertical: 10}}>
        <View style={styles.bloodPressure}>
          <View style={{marginBottom: 10, alignItems:'flex-start'}}>
              <View style={{ backgroundColor:"#4351D860", 
                height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="md-pulse" size={30} color="#4351D8" />
              </View>
          </View>
          <Text style={styles.headline}>Blood Pressure</Text>
          <Text style={styles.headline2}>Sys - 11 </Text>
          <Text style={styles.headline2}>Dia - 11 </Text>
          <Text style={styles.headline2}>PR - 11 </Text>
          <TouchableOpacity style={styles.button}>
            <View style={{flexDirection:'row',}}>
            <Feather name="edit" size={20} color="#4351D8" style={{ marginRight: 5}}/> 
            <Text style={styles.headline2}>Update</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'column', width: "50%" }}>
          <View style={styles.glucose}>
          <View style={{marginBottom: 10, alignItems:'flex-start'}}>
              <View style={{ backgroundColor:"#9C27B060", 
                height: 30, width: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="md-pulse" size={20} color="#9C27B0" />
              </View>
          </View>
          <Text style={styles.headline}>Glucose Level</Text>
          <Text style={styles.headline2}>Sys - 11 </Text>    
          </View>
          <View style={styles.allergy}>
          <View style={{marginBottom: 10, alignItems:'flex-start'}}>
              <View style={{ backgroundColor:"#cc000060", 
                height: 30, width: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="md-pulse" size={20} color="#CC0000" />
              </View>
          </View>
          <Text style={styles.headline}>Allergy</Text>
          <Text style={styles.headline2}>Nill </Text>  
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
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
    bloodPressure: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      width: "50%",
      maxWidth: 200,
      height: 250,
      paddingTop: 20,
      paddingBottom: 10,
      paddingHorizontal: 15,
      borderRadius: 10
    },
    glucose: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      width: "90%",
      maxWidth: 200,
      height: 120,
      paddingTop: 20,
      paddingBottom: 10,
      marginBottom: 10,
      paddingHorizontal: 15,
      borderRadius: 10
    },
    allergy: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      width: "90%",
      maxWidth: 200,
      height: 120,
      paddingTop: 20,
      paddingBottom: 10,
      paddingHorizontal: 15,
      borderRadius: 10
    },
    title:{
        fontSize: 24,
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
    headline: {
      color: '#000',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 15,
      marginBottom: 5
    },
    headline2: {
      color: '#4351D8',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 14,
      marginBottom: 5
    },
    headline3: {
      color: '#fff',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 16,
      marginBottom: 5
    },
    button:{
        backgroundColor: "#4351D860",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginVertical: 5, 
        height: 40,
        width: '100%'
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
export default MyHealth