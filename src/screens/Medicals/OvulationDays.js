import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

//Import Icons
import { Ionicons } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const OvulationDays = () => {
  const navigation = useNavigation();

  const [cycle, setCycle] = useState('');
  const [ovulationStart, setOvulationStart] = useState('');
  const [ovulationEnd, setOvulationEnd] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  let displayDate = date.getDate() + "/"+ parseInt(date.getMonth()+1) +"/"+date.getFullYear();
  let displayTime = date.toLocaleTimeString('en-US', { hour: 'numeric', hour24: true });

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

  const back = () => {
    navigation.goBack();
  }

  const calculate = () => {
    if ( cycle === '24') {
      setOvulationStart( moment(date).add(7, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(11, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '25') {
      setOvulationStart( moment(date).add(8, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(12, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '26') {
      setOvulationStart( moment(date).add(9, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(13, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '27') {
      setOvulationStart( moment(date).add(10, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(14, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '28') {
      setOvulationStart( moment(date).add(11, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(15, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '29') {
      setOvulationStart( moment(date).add(12, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(16, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '30') {
      setOvulationStart( moment(date).add(13, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(17, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '31') {
      setOvulationStart( moment(date).add(14, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(18, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '32') {
      setOvulationStart( moment(date).add(15, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(19, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '33') {
      setOvulationStart( moment(date).add(16, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(20, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '34') {
      setOvulationStart( moment(date).add(17, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(21, 'day').format('MMMM Do YYYY'))
    }
    else if ( cycle === '35') {
      setOvulationStart( moment(date).add(18, 'day').format('MMMM Do YYYY'))
      setOvulationEnd( moment(date).add(22, 'day').format('MMMM Do YYYY'))
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor='#BD7C11' />
      <View style={styles.header}>
        <Ionicons name="md-arrow-back-outline" size={30} color="#fff" onPress={back} />
      </View>
      <View style={{ width: '100%', paddingHorizontal: '6%', marginTop: 10 }}>
          <Text style={styles.title}>Ovulation Calculators</Text>
      </View>
      <View style={{ width: '100%', paddingHorizontal: '6%', marginVertical: 10 }}>
          <Text style={styles.text2}>What is the start date of your last period?</Text>
      </View>
      <Pressable onPress={showDatepicker} style={styles.inputstyle}>
          <Text style={styles.text}>{displayDate}</Text>
      </Pressable>
      <View style={{ width: '100%', paddingHorizontal: '6%', marginVertical: 10 }}>
          <Text style={styles.text2}>How many days is your cycle?</Text>
      </View>
      <View style={styles.inputstyle}><Picker
               selectedValue={cycle}
               onValueChange={(itemValue, itemIndex) =>
                setCycle(itemValue)
                }
                style={styles.input}> 
               <Picker.Item label="" value="" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} /> 
               <Picker.Item label="24" value="24" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="25" value="25" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="26" value="26" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="27" value="27" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="28" value="28" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="29" value="29" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="30" value="30" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="31" value="31" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="32" value="32" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="33" value="33" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="34" value="34" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
               <Picker.Item label="35" value="35" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 24}} />
      </Picker></View>
      {show && (
              <RNDateTimePicker
                value={date}
                mode='date'
                onChange={onChange}
              />
               )}
      <TouchableOpacity onPress={calculate} style={styles.button}>
          <Text style={styles.text}>Calculate</Text>
      </TouchableOpacity>
      {ovulationStart !==""?<View style={styles.result}>
      <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 10 }}>
          <Text style={styles.text3}>Ovulation Cycle Result</Text>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 10 }}>
          <Text style={styles.text4}> Your Fertile Window is from 
          <Text style={styles.text5}>{" "}{ovulationStart}</Text> to <Text style={styles.text5}>{ovulationEnd}</Text>
          </Text>
      </View>
      </View>: null}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: "#BD7C11",
    },
    header: {
      paddingHorizontal: '6%',
      flexDirection: 'row',
      width: "100%",
      paddingTop: 20,
      paddingBottom: 10,
    },
    title:{
        fontSize: 24,
        color: '#fff',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Bold',

    },
    input: {
      fontSize: 24,
      color: '#fff',
      width: '88%',
    },
    inputstyle: {
      borderColor: '#F2F2F2',
      borderWidth: 2,
      width: '88%',
      height: 60,
      borderRadius: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginVertical: 10,
      paddingHorizontal: 20
    },
    result: {
      backgroundColor: '#F2F2F2',
      width: '88%',
      borderRadius: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      marginVertical: 10,
      paddingHorizontal: 20
    },
    text2: {
        color: '#f2f2f2',
        fontFamily: "Monstserrat_SemiBold",
        fontSize: 14,
      },
    text4: {
        color: '#5e5e5e',
        fontFamily: "Monstserrat_SemiBold",
        fontSize: 14,
    },
    text5: {
      color: '#2e2e2e',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 16,
  },
    text: {
      color: '#fff',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 16,
    },
    text3: {
      color: '#2e2e2e',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 16,
    },
    button:{
        backgroundColor: "#00000085",
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

export default OvulationDays