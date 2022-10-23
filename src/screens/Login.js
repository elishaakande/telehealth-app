import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';
import ErrorMessage from '../component/ErrorMessage';
import KeyboardAVoidingWrapper from '../component/KeyboardAvoidingWrapper';

import axios from 'axios';
import firebase from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';

//Credential Context
import { CredentialsContext } from '../component/CredentialsContext';

const auth = firebase.auth();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  //Context
  const {user, setUser} = useContext(CredentialsContext);

  const navigation = useNavigation();
  
  const back = () => {
    navigation.goBack();
  }

  const handleLogin = async () => {
    setLoggingIn(true);
    const url ='https://whispering-dusk-07432.herokuapp.com/auth/login';
    try {
      if (email !== '' && password !== '') {
        await axios
                .post(url, {
                  "email": (email.toLowerCase()).trim(),
                  "password": password.trim()
                })
                .then((response) => {
                  setLoginError('');
                  const result = response.data;
                  handleSignIn(result.email, result.password);
                  persistLogin(result)
                })
                .catch(error => {
                  if (error.response) {
                    setLoginError(error.response.data);
                  }
                })
      } else {
        setLoginError('Enter your email/password');
      }
      setLoggingIn(false);
    } catch (error) {
      setLoginError('Invalid credentials');
      console.log(error);
      setLoggingIn(false);
    }
  }

const handleSignIn = async (email, password) => {
  try {
      if (email !== '' && password !== '') {
        await auth
        .signInWithEmailAndPassword(email, password)
      } else {
        setLoginError('Enter your email/password');
      }
    } catch (error) {
      setLoginError('Invalid credentials');
    }
};

const persistLogin = (credential) => {
  AsyncStorage.setItem('vMask', JSON.stringify(credential))
  .then(() => {
    setUser(credential);
  })
  .catch((error) => {
    console.log(error)
  })
}

const onForgotPressed = async () => {
  navigation.navigate('Forgot Password');
}

const onRegisterPressed = async () => {
  navigation.navigate('Signup');
}


  
      return (
          <KeyboardAVoidingWrapper><View style={styles.container}>
              <View style={styles.header}>
                <Feather name="arrow-left" size={25} color="#111" onPress={back}/>
                <View style={styles.inputstyle}>
                    <Text style={styles.bold}>Login</Text>
                </View>
              </View>
              <View style={{flex: 1, alignItems: "center"}}>
                <View style={{height: 10}} />
              <CustomInput 
              formType="Normal"
              label="Email Address"
              keyboard="email-address"
              value={email} 
              setValue={setEmail} 
              />
              <CustomInput 
              formType="Password"
              label="Password"
              keyboard="default"
              value={password} 
              setValue={setPassword}
              />
              
              {loginError ? <ErrorMessage error={loginError} visible={true} /> : null}
  
              {loggingIn ? 
              <CustomButton text="Sign In" 
              onPress={handleLogin} 
              customColor={{backgroundColor: '#999'}} 
              customText={{color: 'white',}} 
              loading="true"
              />:
              <CustomButton text="Sign In" 
              onPress={handleLogin} 
              customColor={{backgroundColor: '#4351D8'}} 
              customText={{color: 'white',}} 
              />}

  
              <View style={{ alignItems:'flex-end', width:'100%', maxWidth: 350, padding: 10}}><Text onPress={onForgotPressed} style={{
              color: '#5e5e5e', fontFamily: 'Monstserrat_Light'
               }}>Forgot password?</Text></View>
            </View>
          </View>
          </KeyboardAVoidingWrapper>
          
      );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginTop: 5,
    height: 50,
    width: "100%",
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
},
inputstyle: {
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
},
bold: {
    color: '#111',
    fontFamily: "Monstserrat_Bold",
    fontSize: 16,
},
  LoginText: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: '1%',
    fontSize: 36,
    fontFamily:'Monstserrat_SemiBold',
  },
  Middle: {
    alignItems:'center',
    justifyContent:'center',
  },
  subTitle:{
    fontSize: 12,
    color: '#2E2E2E',
    marginTop: 15,
    marginBottom: 15,
    fontFamily:'Monstserrat_Light',
    marginHorizontal: '1%',
  },

  root: {
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
},
logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    paddingTop: 20,
},
text: {
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'black',
},
});


export default Login
