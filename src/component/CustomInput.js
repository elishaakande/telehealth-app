import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useTogglePasswordVisibility } from '../../Hook/useTogglePasswordVisibility';
import { borderColor } from 'styled-system';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const CustomInput = ({formType, value, setValue, placeholder, label, keyboard, func }) => {

    const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

    return (
        <View style={styles.container}>
            <Text style={styles.placeholder}>{label}</Text>
         { formType == "Password"?
          <View style={styles.inputContainer}>
            <TextInput 
            value={value} 
            onChangeText={setValue}
            keyboardType={keyboard}
            placeholder={placeholder}
            placeholderTextColor="#111"
            style={styles.input} 
            secureTextEntry={passwordVisibility}
            onSubmitEditing={func}
            
            />
             <Pressable onPress={handlePasswordVisibility}>
               <Ionicons name={rightIcon} size={22} color="#3e3e3e" />
             </Pressable>
            </View>: 
            <View style={styles.inputContainer}>
            <TextInput 
            value={value} 
            onChangeText={setValue}
            keyboardType={keyboard}
            placeholder={placeholder}
            placeholderTextColor="#111"
            style={styles.input} 
            onSubmitEditing={func}
            />
            </View>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        width: SCREEN_WIDTH-40,
        marginVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderBottomColor: "lightgray",
        borderColor: "white"
    },
    input: {
        flex: 1,
        color: '#000',
        fontFamily: "Monstserrat_Light",
        fontSize: 14,
        width: "10%"
    },
    placeholder: {
        fontFamily: "Monstserrat_SemiBold",
        color: '#5e5e5e',
        fontSize: 12,
    }
});

export default CustomInput
