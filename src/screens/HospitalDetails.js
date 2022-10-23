import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, ScrollView, Dimensions} from 'react-native';
import React from 'react';

import { Ionicons } from '@expo/vector-icons';

import Checkbox from '../component/CheckBox';
import CustomButton from '../component/CustomButton';

import { useNavigation } from '@react-navigation/native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const HospitalDetails = () => {
    const image = "https://upload.wikimedia.org/wikipedia/commons/2/25/Teaching_Hospital%2C_Akure%2C_Ondo_State.jpg";
    const navigation = useNavigation();

    const back = () => {
        navigation.goBack();
      }
    
  return (
    <View style={styles.container}>
        <ScrollView>
            <ImageBackground source={{ uri: image }} resizeMode="cover" style={styles.image}>
              <View style={styles.imageBack}></View> 
            </ImageBackground>
            <View style={styles.containerSpace}>
                <Text style={styles.name}>Akure General Hospital</Text>
                <View style={{ flexDirection: 'row',}}>
                    <Ionicons name="md-time-outline" size={20} color="#4e4e4e" />
                    <Text style={styles.subtext}>08:00 AM - 05:00 PM</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Ionicons name="md-location-outline" size={20} color="#4e4e4e" />
                    <Text style={styles.subtext} numberOfLines={2} ellipsizeMode='tail'>Hospital Road, Around NEPA</Text>
                </View>
                <Text style={styles.title}>Services</Text>
                <View style={{ flexWrap: 'wrap', flexDirection: 'row'}}>
                    <View style={styles.buttonList}>
                       <Text style={styles.listText}>Dentistry</Text>
                    </View>
                    <View style={styles.buttonList}>
                       <Text style={styles.listText}>Dermatology</Text>
                    </View>
                    <View style={styles.buttonList}>
                       <Text style={styles.listText}>ENT</Text>
                    </View>
                    <View style={styles.buttonList}>
                       <Text style={styles.listText}>Psychology</Text>
                    </View>
                    <View style={styles.buttonList}>
                       <Text style={styles.listText}>Sport Medicine</Text>
                    </View>
                    <View style={styles.buttonList}>
                       <Text style={styles.listText}>Urology</Text>
                    </View>
                </View>
                <Text style={styles.title}>Location</Text>
                <View style={{alignItems: "center"}}>                
                <CustomButton
                 text="Make an Appointment" 
                    onPress={back} 
                    customColor={{backgroundColor: '#4351D8'}} 
                    customText={{color: 'white',}} 
                />
                </View>
            </View>
        </ScrollView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={back}>
          <Ionicons name="md-close-outline" size={35} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
    },
    containerSpace: {
        backgroundColor: '#fff',
        width: SCREEN_WIDTH,
        flexDirection: 'column',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
    },
    imageBack: {
        flex: 1,
        backgroundColor: '#fff',
        width: SCREEN_WIDTH,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        top: 280
    },
    header: {
      position: 'absolute',
      backgroundColor: '#ffffff00',
      paddingHorizontal: 15,
      flexDirection: 'row',
      paddingTop: 5,
      height: 60,
      width: "100%",
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 1,
    },
    buttonList:{
        backgroundColor: "#E8E8E8",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginHorizontal: 5, 
        height: 40,
        margin: 5 
    },
    back: {
        backgroundColor: '#f2f2f270',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name:{
        fontSize: 18,
        color: '#111',
        marginTop: 15,
        marginBottom: 10,
        fontFamily:'Monstserrat_Bold',
        marginHorizontal: 5,
    },
    title:{
        fontSize: 16,
        color: '#111',
        marginTop: 15,
        marginBottom: 10,
        fontFamily:'Monstserrat_Bold',
        marginHorizontal: 5,
    },
    subtext:{
        fontSize: 12,
        color: '#4e4e4e',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 5,
    },
    listText:{
        fontSize: 12,
        color: '#4e4e4e',
        fontFamily:'Monstserrat_Light',
    },
    image: {
        height: 300,
        width: SCREEN_WIDTH,
        justifyContent: 'flex-end',
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
    text: {
      color: '#fff',
      fontFamily: "Monstserrat_Light",
      fontSize: 14,
    },
    button:{
      backgroundColor: "#4351D8",
      color: '#FFF',
      fontSize: 16,
      fontFamily:'Monstserrat_SemiBold',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
      alignItems: 'center',
      marginHorizontal: 5, 
      height: 40,
      marginHorizontal: 10
    },
    map: {
      marginHorizontal: 15,
      height: SCREEN_WIDTH-100,
    },
  });

export default HospitalDetails