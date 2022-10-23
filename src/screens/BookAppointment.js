import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Pressable, ImageBackground, Dimensions } from 'react-native';
import React, { useState, useContext } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

//Import Icons
import { Ionicons } from '@expo/vector-icons';

//Credential Context
import { CredentialsContext } from '../component/CredentialsContext';
import Review from '../component/Review';
import Days from '../component/Days';
import Hours from '../component/Hours';

const defaultAvatar = require('../../assets/Images/avatar.png');

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const BookAppointment = ({ route }) => {
  var username, myEmail, userid, myAvatar;

    //Context
    const {user, setUser} = useContext(CredentialsContext);
    const { id, fullName, email, avatar, specialty, rating, reviews } = route.params;
    const navigation = useNavigation();

    const [meetingType, setMeetingType] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [fee, setFee] = useState(50);
    const [scheduleSelected, setScheduleSelected] = useState(false);
    const [hoursSelected, setHoursSelected] = useState(false);
    const [schedule, setSchedule] = useState(Date.now());
    const [vistingHours, setVisting] = useState([]);
    const [hours, setHours] = useState(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00','15:00', '16:00']);


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
      firebase.firestore().collection('Chats')
              .doc(id+userid)
              .get()
              .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                  navigation.navigate('Room', {id: id+userid,
                    fullName: fullName,
                    email: email,
                    specialty: specialty
                  });
                } else {
                  firebase.firestore().collection('Chats')
                          .doc(id+userid)
                          .set({
                            participantsId: firebase.firestore.FieldValue.arrayUnion({doctor: id, user: userid}),
                            participantsEmail: firebase.firestore.FieldValue.arrayUnion({doctor: email, user: myEmail}),
                            isTyping: false,
                          })
                          .then(() => {
                            ChatDetails();
                          });
                }
              })
    }

    function getDoctorAvatar (id) {
      firebase.firestore()
      .collection('Doctors')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        setAvatar(documentSnapshot.data().avatar);
      });
    }

    function BookAppointment () {
      vistingHours.forEach((hour) => {
        
      })
    }
    

    const back = () => {
        navigation.goBack();
      }
  const handleState = async (e) => {
      setSchedule(e);
      await setHours([])
      setHours(['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00','15:00', '16:00'])
  };
  const handleSelected = (e) => {
    setScheduleSelected(e);
  };
  const handleHours = (e) => {
    setHoursSelected(e);
  };
  const handleVisiting = (e) => {
    setVisting(e);
  };
  function RemoveArray() { 
    setVisting((filters) => filters.filter((_, i) => i !== filters.length - 1));
  }

    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Pressable style={{ width: 30, height: 30, alignItems: 'center', justifyContent: "center", borderRadius: 15, backgroundColor:"#f2f2f2"}} onPress={back}>
            <Ionicons name="ios-chevron-back" size={25} color="#111" />
          </Pressable>
          <View style={styles.inputstyle}>
              <Text style={styles.bold}>Book Appointment</Text>
          </View>
      </View>
      <ScrollView style={styles.cover2} contentContainerStyle={styles.cover} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'column', width: SCREEN_WIDTH-(0.12*SCREEN_WIDTH), paddingTop: 10, alignItems: "flex-start"}}>
            <View style={styles.row}>
                {avatar?
                <ImageBackground source={{ uri: avatar }} resizeMode="cover" imageStyle={{ borderRadius: 40}} style={styles.image}>
                <View style={styles.online}></View>
                </ImageBackground>:
                <Image source={defaultAvatar} style={styles.image} />}
                <View style={styles.column}>
                    <Text style={styles.name}>{fullName}</Text>
                    <View style={{flexDirection: 'row', paddingVertical: 8}}>
                        <Ionicons name="ios-location-outline" size={18} color="#5e5e5e" style={{marginRight: 5}} />
                        <Text style={{color: '#5e5e5e', fontFamily: "Monstserrat_Light", fontSize: 14, paddingRight: 10}}>Akure, Nigeria</Text>
                    </View>
                </View>
                
            </View> 
        </View>
        <View style={{ flexDirection: 'column', width: SCREEN_WIDTH-(0.12*SCREEN_WIDTH), paddingTop: 10, alignItems: "flex-start"}}>
            <Text style={styles.bold}>Schedule</Text>
            <Days setSchedule={handleState} setScheduleSelected={handleSelected} setVisting={handleVisiting}/>
        </View>
        <View style={{ flexDirection: 'column', width: SCREEN_WIDTH-(0.06*SCREEN_WIDTH), paddingTop: 10, alignItems: "flex-start"}}>
            <View style={{ width: "100%", paddingLeft: 10, alignItems: "flex-start"}}>
              <Text style={styles.bold}>Visiting Hour</Text>
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 8, flexWrap: 'wrap', width: "100%"}}>
                { hours.map((item, key)=>(
                    <Hours
                      setHoursSelected={handleHours}
                      hours={item}
                      DoctorId={id}
                      Year={new Date(schedule).getFullYear()}
                      Month={new Date(schedule).getMonth() + 1}
                      Day={new Date(schedule).getDate()}
                      addArray={() => setVisting(oldArray => [...oldArray, item])}
                      removeArray={() => RemoveArray()}
                      filter={vistingHours}
                    />
                    )
                )}
            </View>
        </View>
        <View style={{ flexDirection: 'column', width: SCREEN_WIDTH-(0.12*SCREEN_WIDTH), paddingTop: 10, alignItems: "flex-start"}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', width: "50%", justifyContent: "flex-start"}}>
              <Text style={styles.bold}>Total Cost</Text>
            </View>
            <View style={{flexDirection: 'row', width: "50%", justifyContent: "flex-end"}}>
              <Text style={styles.bold}>${fee*vistingHours.length}</Text>
            </View>
          </View>
          {vistingHours.length > 0 ?<Text style={styles.light}>Session Fee for {vistingHours.length} hours</Text>: null}
        </View>
          <TouchableOpacity style={styles.book} onPress={BookAppointment}>
            <Text style={styles.contacttext}>Confirm & Pay</Text>
          </TouchableOpacity>
       </ScrollView>
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
      paddingTop: 10,
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
      fontSize: 14,
    },
    boldlight: {
      color: '#5e5e5e',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 14,
    },
    light: {
      color: '#5e5e5e',
      fontFamily: "Monstserrat_Light",
      fontSize: 13,
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
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginHorizontal: 5
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
      marginBottom: 30
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
  
  column: {
    flexDirection: 'column'
    },
   row: {
    flexDirection: 'row' 
    }
  });

export default BookAppointment