import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Pressable, ImageBackground, Dimensions } from 'react-native';
import React, { useState, useContext } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Rating, AirbnbRating } from 'react-native-ratings';

//Import Icons
import { Ionicons } from '@expo/vector-icons';

//Credential Context
import { CredentialsContext } from '../component/CredentialsContext';
import Review from '../component/Review';

const defaultAvatar = require('../../assets/Images/avatar.png');

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const BookDoctor = ({ route }) => {
  var username, myEmail, userid, myAvatar;

    //Context
    const {user, setUser} = useContext(CredentialsContext);
    const { id, fullName, email, avatar, specialty, rating, reviews } = route.params;
    const navigation = useNavigation();

    const [meetingType, setMeetingType] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    if (user != null) {
      username = user.username;
      myEmail = user.email;
      userid = user._id;
  }

    let displayDate = date.getDate() + "/"+ parseInt(date.getMonth()+1) +"/"+date.getFullYear();
    let displayTime = date.toLocaleTimeString('en-US', { hour: 'numeric', hour24: true })


    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };

    const ChatDetails = async () => {
      //Validate User
      firebase.firestore()
          .collection('Chats')
          .doc(id+userid)
          .collection('Details')
          .doc(id)
          .set({
            lastMessage: '',
            unreadMessageCount: firebase.firestore.FieldValue.increment(0),
            lastMessageTime: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            ChatDetailsTwo();
          });
   }

   const ChatDetailsTwo = async () => {
    //Validate User
    firebase.firestore()
        .collection('Chats')
        .doc(id+userid)
        .collection('Details')
        .doc(userid)
        .set({
          lastMessage: '',
          unreadMessageCount: firebase.firestore.FieldValue.increment(0),
          lastMessageTime: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          navigation.navigate('Room', {id: id+userid,
            fullName: fullName,
            email: email,
            specialty: specialty
          });
        });
 }

    const ChatRoom = () => {
      navigation.navigate('Room', {id: id+userid,
        userid: id,
        fullName: fullName,
        email: email,
        specialty: specialty
      });
    }

    function getDoctorAvatar (id) {
      firebase.firestore()
      .collection('Doctors')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        setAvatar(documentSnapshot.data().avatar);
      });
    }
    

    const back = () => {
        navigation.goBack();
      }

    const book = () => {
      navigation.navigate("Book Appointment", {id: id,
        fullName: fullName,
        email: email,
        specialty: specialty,
        avatar: avatar
      });
    }
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Pressable style={{ width: 30, height: 30, alignItems: 'center', justifyContent: "center", borderRadius: 15, backgroundColor:"#f2f2f2"}} onPress={back}>
            <Ionicons name="ios-chevron-back" size={25} color="#111" />
          </Pressable>
          <View style={styles.inputstyle}>
              <Text style={styles.bold}>Doctor Details</Text>
          </View>
      </View>
      <ScrollView style={styles.cover2} contentContainerStyle={styles.cover} showsVerticalScrollIndicator={false}>
          
            {avatar?
              <ImageBackground source={{ uri: avatar }} resizeMode="cover" imageStyle={{ borderRadius: 20}} style={styles.image}>
                <View style={styles.online}></View>
              </ImageBackground>:
              <Image source={defaultAvatar} style={styles.image} />}
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.specialization}>{specialty}</Text>
          <View style={{height: 5}}></View>
          <Rating 
            readonly={true}
            imageSize={20}
            startingValue={rating}
          />
          <View style={{ flexDirection: 'row', width: SCREEN_WIDTH-(0.12*SCREEN_WIDTH), alignItems: "center", justifyContent: 'center'}}>
            <TouchableOpacity style={styles.contact} onPress={ChatRoom}>
              <Ionicons name="md-chatbubble-ellipses" size={20} color="#fff" style={{marginRight: 10}} />
              <Text style={styles.contacttext}>Contact doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactoption}>
              <Ionicons name="ios-ellipsis-vertical" size={20} color="#6e6e6e" />
            </TouchableOpacity>
          </View>
          {/*<View style={{ flexDirection: 'row', width: SCREEN_WIDTH-(0.12*SCREEN_WIDTH), alignItems: "flex-start"}}>
            <Text style={{color: '#5e5e5e', fontFamily: "Monstserrat_Light", fontSize: 14, paddingRight: 10}}>Session fee</Text>
            <Text style={styles.bold}>$40.00/hr</Text>
            </View>**/}
          <View style={{ flexDirection: 'column', width: SCREEN_WIDTH-(0.12*SCREEN_WIDTH), paddingTop: 10, alignItems: "flex-start"}}>
            <Text style={styles.bold}>About Doctor</Text>
            <Text style={{color: '#111', fontFamily: "Monstserrat_Regular", fontSize: 14, paddingVertical: 10,}}>
              George A. Sample, MD, FCCP, is a graduate of George Washington University Medical School. He trained in internal medicine at the University of Oregon Health Sciences (UOHS) and pulmonary critical care medicine at UOHS and the University of Southern California.
            </Text>
          </View>
          <View style={{ flexDirection: 'column', width: SCREEN_WIDTH-(0.12*SCREEN_WIDTH), paddingTop: 10, alignItems: "flex-start"}}>
            <View style={{ flexDirection: 'row'}}>
              <Text style={styles.bold}>Reviews  </Text>
              <Ionicons name="md-star" size={20} color="#F1C644" />
              <Text style={styles.bold}> 4.9</Text>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Review
               name={"Jade Mcmachon"}
               rating={"5.0"}
               review={"He is a very good listener. the service was very good."}
               time={"2 days ago"}
            />
            <Review
               name={"Jade Mcmachon"}
               rating={"5.0"}
               review={"He is a very good listener. the service was very good. I trust is judgement and diagnosis very well. he is etremely competent"}
               time={"2 days ago"}
            />
          </ScrollView>
          <View style={{height: 100}}></View>
       </ScrollView>
       <TouchableOpacity style={styles.book} onPress={book}>
          <Text style={styles.contacttext}>Book Appointment</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: "#fff",
    },
    cover2: {
      width: "100%",
      paddingTop: 20,
      paddingBottom: 10,
    },
    cover: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    header: {
      backgroundColor: '#fff',
      paddingHorizontal: '6%',
      flexDirection: 'row',
      marginTop: 5,
      height: 60,
      width: "100%",
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2'
    },
    input: {
      width: '70%',
      color: '#5E5E5E',
      fontFamily: "Monstserrat_Light",
      fontSize: 14,
    },
    bold: {
      color: '#111',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 16,
    },
    boldlight: {
      color: '#5e5e5e',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 14,
    },
    inputstyle: {
      width: '80%',
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    inputtab: {
      alignSelf: 'stretch',
      height: 40,
      color: '#5E5E5E',
      backgroundColor: '#E8E8E8',
      justifyContent: 'center',
      marginHorizontal: 10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 20,
        alignItems: "flex-end",
        justifyContent: "flex-end"
    },
    online: {
      height: 30,
      width: 30,
      borderWidth: 5,
      borderColor: "#fff",
      borderRadius: 15,
      backgroundColor: "#00CC00"
    },
    name:{
      fontSize: 16,
      color: '#000',
      marginTop: 10,
      fontFamily:'Monstserrat_SemiBold',
  },
    boldtext:{
        fontSize: 16,
        color: '#fff',
        fontFamily:'Monstserrat_SemiBold',
    },
    specialization:{
        fontSize: 12,
        color: '#2e2e2e',
        marginTop: 10,
        fontFamily:'Monstserrat_Regular',
        marginHorizontal: 10,
    },
    text: {
      color: '#222',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 14,
      margin: 10,
    },
    text2: {
      color: '#5e5e5e',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 14,
      margin: 10,
    },
    button:{
      backgroundColor: '#5e5e5e',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      alignItems: 'center',
      marginVertical: 10, 
      height: 40,
      marginHorizontal: 10,
    },
    button2:{
      backgroundColor: '#BD7C11',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
      alignItems: 'center',
      marginVertical: 10, 
      height: 40,
      marginHorizontal: 10,
    },
    book:{
      backgroundColor: "#4351D8",
      borderRadius: 10,
      justifyContent: 'center',
      paddingHorizontal: 10,
      paddingVertical: 20,
      alignItems: 'center',
      marginVertical: 10,
      width: SCREEN_WIDTH-(0.12*SCREEN_WIDTH),
      bottom: 10,
      position: "absolute"
    },
    contact:{
      backgroundColor: "#111",
      borderRadius: 10,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 10, 
      width: "70%",
    },
    contacttext:{
      fontSize: 14,
      color: '#fff',
      fontFamily:'Monstserrat_SemiBold',
  },
  contactoption:{
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginHorizontal: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10, 
    width: 50,
  },
  });

export default BookDoctor