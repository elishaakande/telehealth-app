import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomButton = ({onPress, text, customColor, customText, loading }) => {
    return (
        <TouchableOpacity 
        onPress={onPress} 
        style={[styles.container, customColor]}>
            {loading =="true"?
            <ActivityIndicator size="large" color="#fff" />:
            <Text style={[styles.text, customText]}>{text}</Text>}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4351D8',
        height: 50,
        width: SCREEN_WIDTH-40,
        padding: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
    },

    text: {
        fontFamily: 'Monstserrat_Bold',
        fontSize: 16,
        color: 'white',
    },

});

export default CustomButton
