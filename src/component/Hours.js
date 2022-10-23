import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'


var hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00','15:00', '16:00'];

const Hours = (props) => {
    const [selectable, setSelectable] = useState(true);
    const [isPressed, setPressed] = useState(false);

    function checkSelected(){
      
    }


    useEffect(() => {
      checkSelected();
    }, []);

    function Touch() { 
      setPressed(!isPressed);
      if (isPressed) {
        props.removeArray();
        props.setHoursSelected(false)
      } else {
        props.addArray();
        props.setHoursSelected(true)
      }
    }
    function Touchalt() { 
        setPressed(!isPressed);
    }
  return (
    <View>
      {selectable ?
      <>{isPressed?<Pressable style={styles.button1} onPress={Touch}>
          <Text style={styles.regular1}>{props.hours}</Text>
      </Pressable>:
      <Pressable style={styles.button} onPress={Touch}>
          <Text style={styles.regular}>{props.hours}</Text>
      </Pressable>
      }</>:
      <View style={styles.button3}>
          <Text style={styles.regular1}>{props.hours}</Text>
      </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center"
    },
    regular:{
      fontSize: 14,
      color: '#111',
      fontFamily:'Monstserrat_Light',
    },
    regular1:{
        fontSize: 14,
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
      borderRadius: 10,
      padding: 10,
      paddingHorizontal: 10,
      alignItems: 'center',
      marginHorizontal: 5, 
      margin: 5 
     },
    button1:{
      backgroundColor: "#4351D8",
      borderRadius: 10,
      padding: 10,
      paddingHorizontal: 10,
      alignItems: 'center',
      marginHorizontal: 5, 
      margin: 5 
      },
    button3:{
    backgroundColor: "#5e5e5e",
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

export default Hours