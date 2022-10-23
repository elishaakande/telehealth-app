import { View, Text, StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

//Import Icons
import { Ionicons } from '@expo/vector-icons';

const BodyWeight = () => {
  const navigation = useNavigation();

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

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
    if ( gender == 'Male' ) {
      var weigh = 50+(0.91*[height-152.4]);
      var weigh = weigh.toFixed(2)
      setWeight(weigh);
    }
    if ( gender == 'Female' ) {
      var weigh = 45.5+(0.91*[height-152.4]);
      var weigh = weigh.toFixed(2)
      setWeight(weigh);
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor='#000' />
      <View style={styles.header}>
        <Ionicons name="md-arrow-back-outline" size={30} color="#fff" onPress={back} />
      </View>
      <View style={{ width: '100%', paddingHorizontal: '6%', marginTop: 10 }}>
          <Text style={styles.title}>Ideal Body Weight</Text>
      </View>
      <View style={{ width: '100%', paddingHorizontal: '6%', marginVertical: 10 }}>
          <Text style={styles.text2}>What is your height in centimeters?</Text>
      </View>
      <View style={styles.inputstyle}>
        <TextInput 
            value={height} 
            onChangeText={setHeight}
            placeholder= "height"
            placeholderTextColor="#f2f2f2" 
            keyboardType="default"
            style={styles.input} 
        />
        </View>
      <View style={{ width: '100%', paddingHorizontal: '6%', marginVertical: 10 }}>
          <Text style={styles.text2}>Select your Gender</Text>
      </View>
      <View style={styles.inputstyle}>
        <Picker
               selectedValue={gender}
               onValueChange={(itemValue, itemIndex) =>
                setGender(itemValue)
                }
                style={styles.input}> 
               <Picker.Item label="" value="" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 16}} /> 
               <Picker.Item label="Male" value="Male" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 16}} />
               <Picker.Item label="Female" value="Female" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' style={{ fontSize: 16}} />
      </Picker></View>
      <TouchableOpacity onPress={calculate} style={styles.button}>
          <Text style={styles.text}>Calculate</Text>
      </TouchableOpacity>
      {weight !==""?<View style={styles.result}>
      <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 10 }}>
          <Text style={styles.text3}>Result</Text>
      </View>
      <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 10 }}>
          <Text style={styles.text4}> Your Ideal Body Weight is 
          <Text style={styles.text5}>{" "}{weight} {""}Kg</Text>
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
      backgroundColor: "#000",
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
      fontSize: 16,
      fontFamily:'Monstserrat_SemiBold',
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
        backgroundColor: "#9C27B090",
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


export default BodyWeight