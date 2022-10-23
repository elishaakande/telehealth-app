import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, {useState} from 'react';

//import icons
import { Ionicons } from '@expo/vector-icons';

const Review = ({onPress, avatar, name, time, rating, review }) => {
    const defaultavatar = require('../../assets/Images/avatar.png');
    const docavatar = avatar || defaultavatar;
    const [lines, setLines] = useState(2);
  return (
    <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.row}>
            {avatar? <Image source={{ uri: avatar }} style={styles.profile}/>: 
            <Image source={docavatar} style={styles.profile}/>}
            <View style={styles.column}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
            <View style={styles.row}>
                <Ionicons name="md-star" size={15} color="#F1C644" />
                <Text style={styles.text2}>{rating}</Text>
            </View>
        </View>
        <View>
            <Text style={styles.regulartext} numberOfLines={lines} ellipsizeMode='tail'>{review}</Text>
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: 300,
        marginTop: 10,
        paddingHorizontal: 10,
        margin: 6,
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: 10,
        paddingTop: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#f2f2f2',
        borderRadius: 10,
        elevation: 5
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name:{
        fontSize: 14,
        color: '#111',
        marginBottom: 5,
        fontFamily:'Monstserrat_SemiBold',
        marginHorizontal: 10,
        height: 20
    },
    time:{
        fontSize: 12,
        color: '#5e5e5e',
        marginBottom: 5,
        fontFamily:'Monstserrat_SemiBold',
        marginHorizontal: 10,
        height: 20
    },
    regulartext:{
        fontSize: 12,
        color: '#5e5e5e',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Regular',
        marginHorizontal: 10,
    },
    text2:{
        fontSize: 12,
        color: '#000',
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 10,
    },
    column: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        padding: 2,
        
    }
})

export default Review