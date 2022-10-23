import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import React from 'react';

//Import Icons
import { Ionicons, Feather } from '@expo/vector-icons';

import { COLORS } from '../colors';

const FloatingActionButton = ({onPress}) => {
  return (
    <View style={styles.container}>
    <Pressable
      onPress={onPress} 
      style={styles.button}>
      <Feather name="plus" size={40} color="#fff" />
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
      },
    button: {
        backgroundColor: COLORS.main,
        position: 'absolute',
        width: 60,
        height: 60,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 5,
        shadowRadius: 10,
        shadowColor: COLORS.main,
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 14,
     },
});


export default FloatingActionButton