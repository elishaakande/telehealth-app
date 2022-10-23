import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'

var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT','SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Days = (props) => {
    const [selected, setSelected] = useState('1');
    const [currentDate, setCurrentDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [date2, setDate2] = useState('');
    const [date3, setDate3] = useState('');
    const [date4, setDate4] = useState('');
    const [date5, setDate5] = useState('');
    const [date6, setDate6] = useState('');
    const [date7, setDate7] = useState('');

    //Date Names
    var day1 = days[new Date().getDay()];
    var day2 = days[new Date().getDay()+1];
    var day3 = days[new Date().getDay()+2];
    var day4 = days[new Date().getDay()+3];
    var day5 = days[new Date().getDay()+4];
    var day6 = days[new Date().getDay()+5];
    var day7 = days[new Date().getDay()+6];

    useEffect(() => {
        var myCurrentDate = new Date();
        var myFutureDate = new Date(myCurrentDate); 
        var date = new Date().getDate(); //Current Date
        var date2 = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 1);
        var date3 = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 2);
        var date4 = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 3);
        var date5 = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 4);
        var date6 = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 5);
        var date7 = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 6);
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        setMonth(month);
        setYear(year)
        setCurrentDate(date);
        setDate2(new Date(date2).getDate());
        setDate3(new Date(date3).getDate());
        setDate4(new Date(date4).getDate());
        setDate5(new Date(date5).getDate());
        setDate6(new Date(date6).getDate());
        setDate7(new Date(date7).getDate());
      }, []);
    const [isPressed, setPressed] = useState(false);

    function Touch() { 
      setPressed(!isPressed);
      if (isPressed) {
        props.removeArray()
      } else {
        props.addArray()
      }
    }
    function Touchalt() { 
        setPressed(!isPressed);
    }
    function select1() { 
      var currentDate = new Date().getDate(); //Current Date
      var date = Date.now();
      setSelected("1");
      props.setSchedule(date);
      props.setVisting([]);
      props.setScheduleSelected(true)
    }
    function select2() { 
      var myCurrentDate = new Date();
      var date = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 1);
      setSelected("2");
      props.setSchedule(date);
      props.setVisting([]);
      props.setScheduleSelected(true)
    }
    function select3() { 
      var myCurrentDate = new Date();
      var date = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 2);
      setSelected("3");
      props.setSchedule(date);
      props.setVisting([]);
      props.setScheduleSelected(true)
    }
    function select4() { 
      var myCurrentDate = new Date();
      var date = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 3);
      setSelected("4");
      props.setSchedule(date);
      props.setVisting([]);
      props.setScheduleSelected(true)
    }
    function select5() { 
      var myCurrentDate = new Date();
      var date = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 4);
      setSelected("5");
      props.setSchedule(date);
      props.setVisting([]);
      props.setScheduleSelected(true)
    }
    function select6() { 
      var myCurrentDate = new Date();
      var date = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 5);
      setSelected("6");
      props.setSchedule(date);
      props.setVisting([]);
      props.setScheduleSelected(true)
    }
    function select7() { 
      var myCurrentDate = new Date();
      var date = (new Date(myCurrentDate)).setDate(new Date(myCurrentDate).getDate()+ 6);
      setSelected("7");
      props.setSchedule(date);
      props.setVisting([]);
      props.setScheduleSelected(true)
    }
    function selectNone() { 
      var date = Date.now();
        setSelected("1");
        props.setSchedule(date);
        props.setVisting([]);
      props.setScheduleSelected(false)
    }
  return (
    <View>
      {selected == ("") && (
        <View style={{flexDirection: 'row',  paddingVertical: 8, justifyContent: "center", width: "100%"}}>
            <Pressable style={styles.button} onPress={select1}>
                <Text style={styles.regular}>{currentDate}</Text>
                <Text style={styles.regular}>{day1}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select2}>
                <Text style={styles.regular}>{date2}</Text>
                <Text style={styles.regular}>{day2}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select3}>
                <Text style={styles.regular}>{date3}</Text>
                <Text style={styles.regular}>{day3}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select4}>
                <Text style={styles.regular}>{date4}</Text>
                <Text style={styles.regular}>{day4}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select5}>
                <Text style={styles.regular}>{date5}</Text>
                <Text style={styles.regular}>{day5}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select6}>
                <Text style={styles.regular}>{date6}</Text>
                <Text style={styles.regular}>{day6}</Text>
            </Pressable>
        </View>
      )}
      {selected == ("1") && (
        <View style={{flexDirection: 'row', paddingVertical: 8, justifyContent: "center", width: "100%"}}>
            <Pressable style={styles.button1} onPress={selectNone}>
                <Text style={styles.regular1}>{currentDate}</Text>
                <Text style={styles.regular1}>{day1}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select2}>
                <Text style={styles.regular}>{date2}</Text>
                <Text style={styles.regular}>{day2}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select3}>
                <Text style={styles.regular}>{date3}</Text>
                <Text style={styles.regular}>{day3}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select4}>
                <Text style={styles.regular}>{date4}</Text>
                <Text style={styles.regular}>{day4}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select5}>
                <Text style={styles.regular}>{date5}</Text>
                <Text style={styles.regular}>{day5}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select6}>
                <Text style={styles.regular}>{date6}</Text>
                <Text style={styles.regular}>{day6}</Text>
            </Pressable>
        </View>
      )}
      {selected == ("2") && (
        <View style={{flexDirection: 'row', paddingVertical: 8, justifyContent: "center", width: "100%"}}>
            <Pressable style={styles.button} onPress={select1}>
                <Text style={styles.regular}>{currentDate}</Text>
                <Text style={styles.regular}>{day1}</Text>
            </Pressable>
            <Pressable style={styles.button1} onPress={selectNone}>
                <Text style={styles.regular1}>{date2}</Text>
                <Text style={styles.regular1}>{day2}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select3}>
                <Text style={styles.regular}>{date3}</Text>
                <Text style={styles.regular}>{day3}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select4}>
                <Text style={styles.regular}>{date4}</Text>
                <Text style={styles.regular}>{day4}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select5}>
                <Text style={styles.regular}>{date5}</Text>
                <Text style={styles.regular}>{day5}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select6}>
                <Text style={styles.regular}>{date6}</Text>
                <Text style={styles.regular}>{day6}</Text>
            </Pressable>
        </View>
      )}
      {selected == ("3") && (
        <View style={{flexDirection: 'row', paddingVertical: 8, justifyContent: "center", width: "100%"}}>
            <Pressable style={styles.button} onPress={select1}>
                <Text style={styles.regular}>{currentDate}</Text>
                <Text style={styles.regular}>{day1}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select2}>
                <Text style={styles.regular}>{date2}</Text>
                <Text style={styles.regular}>{day2}</Text>
            </Pressable>
            <Pressable style={styles.button1} onPress={selectNone}>
                <Text style={styles.regular1}>{date3}</Text>
                <Text style={styles.regular1}>{day3}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select4}>
                <Text style={styles.regular}>{date4}</Text>
                <Text style={styles.regular}>{day4}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select5}>
                <Text style={styles.regular}>{date5}</Text>
                <Text style={styles.regular}>{day5}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select6}>
                <Text style={styles.regular}>{date6}</Text>
                <Text style={styles.regular}>{day6}</Text>
            </Pressable>
        </View>
      )}
      {selected == ("4") && (
        <View style={{flexDirection: 'row', paddingVertical: 8, justifyContent: "center", width: "100%"}}>
            <Pressable style={styles.button} onPress={select1}>
                <Text style={styles.regular}>{currentDate}</Text>
                <Text style={styles.regular}>{day1}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select2}>
                <Text style={styles.regular}>{date2}</Text>
                <Text style={styles.regular}>{day2}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select3}>
                <Text style={styles.regular}>{date3}</Text>
                <Text style={styles.regular}>{day3}</Text>
            </Pressable>
            <Pressable style={styles.button1} onPress={selectNone}>
                <Text style={styles.regular1}>{date4}</Text>
                <Text style={styles.regular1}>{day4}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select5}>
                <Text style={styles.regular}>{date5}</Text>
                <Text style={styles.regular}>{day5}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select6}>
                <Text style={styles.regular}>{date6}</Text>
                <Text style={styles.regular}>{day6}</Text>
            </Pressable>
        </View>
      )}
      {selected == ("5") && (
        <View style={{flexDirection: 'row', paddingVertical: 8, justifyContent: "center", width: "100%"}}>
            <Pressable style={styles.button} onPress={select1}>
                <Text style={styles.regular}>{currentDate}</Text>
                <Text style={styles.regular}>{day1}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select2}>
                <Text style={styles.regular}>{date2}</Text>
                <Text style={styles.regular}>{day2}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select3}>
                <Text style={styles.regular}>{date3}</Text>
                <Text style={styles.regular}>{day3}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select4}>
                <Text style={styles.regular}>{date4}</Text>
                <Text style={styles.regular}>{day4}</Text>
            </Pressable>
            <Pressable style={styles.button1} onPress={selectNone}>
                <Text style={styles.regular1}>{date5}</Text>
                <Text style={styles.regular1}>{day5}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select6}>
                <Text style={styles.regular}>{date6}</Text>
                <Text style={styles.regular}>{day6}</Text>
            </Pressable>
        </View>
      )}
      {selected == ("6") && (
        <View style={{flexDirection: 'row', paddingVertical: 8, justifyContent: "center", width: "100%"}}>
            <Pressable style={styles.button} onPress={select1}>
                <Text style={styles.regular}>{currentDate}</Text>
                <Text style={styles.regular}>{day1}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select2}>
                <Text style={styles.regular}>{date2}</Text>
                <Text style={styles.regular}>{day2}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select3}>
                <Text style={styles.regular}>{date3}</Text>
                <Text style={styles.regular}>{day3}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select4}>
                <Text style={styles.regular}>{date4}</Text>
                <Text style={styles.regular}>{day4}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={select5}>
                <Text style={styles.regular}>{date5}</Text>
                <Text style={styles.regular}>{day5}</Text>
            </Pressable>
            <Pressable style={styles.button1} onPress={selectNone}>
                <Text style={styles.regular1}>{date6}</Text>
                <Text style={styles.regular1}>{day6}</Text>
            </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    regular:{
      fontSize: 12,
      color: '#111',
      fontFamily:'Monstserrat_Light',
    },
    regular1:{
        fontSize: 12,
        color: '#fff',
        fontFamily:'Monstserrat_Light',
      },
    light:{
      fontSize: 10,
      color: '#F2F2F2',
      fontFamily:'Monstserrat_Light'
    },
    lightdark:{
      fontSize: 10,
      color: '#4351D8',
      fontFamily:'Monstserrat_Light'
    },
    bold:{
      fontSize: 25,
      color: '#000',
      fontFamily:'Monstserrat_Bold',
      marginHorizontal: '1%',
    },
    semiboldWhite:{
      fontSize: 16,
      color: '#FFF',
      fontFamily:'Monstserrat_SemiBold',
    },
    semiboldBlue:{
      fontSize: 18,
      color: '#4351D8',
      fontFamily:'Monstserrat_SemiBold',
    },
    semibold:{
      fontSize: 16,
      color: '#2E2E2E',
      fontFamily:'Monstserrat_SemiBold',
    },
    button:{
      backgroundColor: "#E8E8E8",
      flexDirection: "column",
      borderRadius: 10,
      padding: 10,
      paddingHorizontal: 10,
      alignItems: 'center',
      marginHorizontal: 5, 
      margin: 5 
     },
     button1:{
        backgroundColor: "#4351D8",
        flexDirection: "column",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginHorizontal: 5, 
        margin: 5 
       },
    box: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
      width: 45,
      backgroundColor: "#FFF",
      borderRadius: 10,
      marginHorizontal: "1%",
  },
  });

export default Days