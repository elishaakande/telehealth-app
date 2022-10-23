import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';
import ErrorMessage from '../component/ErrorMessage';
import KeyboardAVoidingWrapper from '../component/KeyboardAvoidingWrapper';
import { useNavigation } from '@react-navigation/native';

import LottieView from "lottie-react-native";

const Onboarding = () => {
  const navigation = useNavigation();
  
  const handleSignIn = async () => {
    navigation.navigate('Login');
  }
  const handleSignUp = async () => {
    navigation.navigate('Signup');
  }


  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/welcome_lottie.json")}
        style={styles.animation}
        autoPlay={true}
        loop={false}
      />
      
      <CustomButton text="Sign Up" 
              onPress={handleSignUp} 
              customColor={{backgroundColor: '#4351D8'}} 
              customText={{color: 'white',}} 
              />
       <Text style={styles.subTitle}>OR</Text>
       <Text style={styles.subTitle}>Have an account? {}
          <Text style={styles.link} onPress={handleSignIn}>Sign In</Text>
        </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center'
   
  },
  HelloText: {
    marginTop: 60,
    fontSize: 36,
    fontFamily:'Monstserrat_SemiBold',
    alignSelf: 'center'
  },
  Middle: {
    alignItems:'center',
    justifyContent:'center',
  },
  subTitle:{
    fontSize: 14,
    color: '#2E2E2E',
    marginTop: 10,
    marginBottom: 10,
    fontFamily:'Monstserrat_Regular',
    marginHorizontal: '1%',
    textAlign: 'center'
  },
  link:{
    fontSize: 14,
    color: '#4351D8',
    marginTop: 10,
    marginBottom: 10,
    fontFamily:'Monstserrat_SemiBold',
    marginHorizontal: '1%',
  },

  root: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
},
animation: {
  width: 231,
  height: 320,
  alignSelf: 'center'
},
text: {
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black',
},
});

export default Onboarding