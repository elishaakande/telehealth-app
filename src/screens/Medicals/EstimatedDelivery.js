import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

//Import Icons
import { Ionicons } from '@expo/vector-icons';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const EstimatedDelivery = () => {
  const navigation = useNavigation();

  const [dueDate, setDueDate] = useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  let displayDate = date.getDate() + "/" + parseInt(date.getMonth() + 1) + "/" + date.getFullYear();
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
    if (date) {
      setDueDate(moment(date).subtract(3, 'month').add(1, 'year').add(7, 'day').format('MMMM Do YYYY'))
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor='#9C27B0' />
      <View style={styles.header}>
        <Ionicons name="md-arrow-back-outline" size={30} color="#fff" onPress={back} />
      </View>
      <View style={{ width: '100%', paddingHorizontal: '6%', marginTop: 10 }}>
        <Text style={styles.title}>Estimated Due Date</Text>
      </View>
      <View style={{ width: '100%', paddingHorizontal: '6%', marginVertical: 10 }}>
        <Text style={styles.text2}>What is the first day of your last menstrual period?</Text>
      </View>
      <Pressable onPress={showDatepicker} style={styles.inputstyle}>
        <Text style={styles.text}>{displayDate}</Text>
      </Pressable>
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
      {dueDate !== "" ? <View style={styles.result}>
        <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 10 }}>
          <Text style={styles.text3}>Result</Text>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 10, marginVertical: 10 }}>
          <Text style={styles.text4}> Your Estimated Due Date is
            <Text style={styles.text5}>{" "}{dueDate}</Text>
          </Text>
        </View>
      </View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#9C27B0",
  },
  header: {
    paddingHorizontal: '6%',
    flexDirection: 'row',
    width: "100%",
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Monstserrat_Bold',

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
  button: {
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
  button2: {
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
  button3: {
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
  button4: {
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

export default EstimatedDelivery