import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, {useState} from 'react'

const Selector = (props) => {
    const [isPressed, setPressed] = useState(false);

    function Touch() { 
      setPressed(!isPressed);
    }
  return (
    <View>
      {isPressed?<Pressable style={styles.button2} onPress={Touch}>
          <Text style={styles.regular2}>{props.text}</Text>
      </Pressable>:
      <Pressable style={styles.button} onPress={Touch}>
          <Text style={styles.regular}>{props.text}</Text>
      </Pressable>
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
      fontFamily:'Monstserrat_Regular',
    },
    regular2:{
        fontSize: 14,
        color: '#fff',
        fontFamily:'Monstserrat_Regular',
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
      fontFamily:'Monstserrat_SemiBold',
      borderRadius: 10,
      padding: 10,
      paddingHorizontal: 15,
      alignItems: 'center',
      marginHorizontal: 5, 
      height: 40,
      margin: 5 
     },
    button2:{
      backgroundColor: "#4351D8",
      color: '#FFF',
      fontFamily:'Monstserrat_SemiBold',
      borderRadius: 10,
      padding: 10,
      paddingHorizontal: 15,
      alignItems: 'center',
      marginHorizontal: 5,
      height: 40,
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

export default Selector