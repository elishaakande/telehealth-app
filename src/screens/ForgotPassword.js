import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import CryptoES from "crypto-es";


import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';
import ErrorMessage from '../component/ErrorMessage';
import KeyboardAVoidingWrapper from '../component/KeyboardAvoidingWrapper';

import firebase from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';

//Credential Context
import { CredentialsContext } from '../component/CredentialsContext';

const auth = firebase.auth();

const ForgotPassword = () => {
      const [code, setCode] = useState('');
      const [uid, setUid] = useState('');
      const [email, setEmail] = useState('');
      const [myName, setMyName] = useState('');
      const [password, setPassword] = useState('');
      const [verifyPassword, setVerifyPassword] = useState('');
      const [loginError, setLoginError] = useState('');
      const [error, setError] = useState('');
      const [otpError, setOtpError] = useState('');
      const [loggingIn, setLoggingIn] = useState(false);
      const [screen, setScreen] = useState('A');
      const [OTP, setOTP] = useState("");
      //Context
      const {user, setUser} = useContext(CredentialsContext);

      const navigation = useNavigation();
      
      const back = () => {
        navigation.goBack();
      }
      const backA = () => {
        setScreen("A")
      }
      const backB = () => {
        setScreen("B")
      }

      const handleSignIn = async (password) => {
        setLoggingIn(true);
        // validates user
        try {
              await auth
              .signInWithEmailAndPassword(email, password)
              .then(() => {
                generateCode();
              })
            setLoggingIn(false);
          } catch (error) {
            console.log(error)
            setLoggingIn(false);
          }
      };

      const persistLogin = (credential) => {
        AsyncStorage.setItem('ileraCredentials', JSON.stringify(credential))
        .then(() => {
          setUser(credential);
        })
        .catch((error) => {
          console.log(error)
        })
      }

      const confirmCode = async () => {
        if ( OTP == code) {
          setScreen("C")
        } else {
          setOtpError("wrong Code");
        }
      }
      

      const generateCode = async () => {
          var seq = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
          setCode(seq);
          sendEmail(seq) 
      }

      let sendEmail = async (code) => {
        const URL = "https://script.google.com/macros/s/AKfycbw6FuPEcC6YtvGgAzqH2IiQlveQH6vu5olgNeFenylPiPy7as1Y0Ke7hOJW8-mcFozjeA/exec";
        let data = {
          "recipient": email,
          "subject": "Pasword Recovery",
          "name": myName,
          "otp": code
        }
        axios.post(URL, JSON.stringify(data))
        .then(response => console.log(response.data));
        setScreen("B")
      };

    async function getUserByEmail() {
      const url ='https://whispering-dusk-07432.herokuapp.com/user/email/'+email;
      try {
          await axios.get(url)
                  .then((response) => {
                    const result = response.data;
                    const id = result._id;
                    console.log(result)
                    getUser(id);
                  })
                  .catch(error => {
                    if (error.response) {
                      setError(error.response.data);
                      console.log(error.response.data);
                    }
                  })

      } catch(error){
        console.log(error);
      }
    }

  async function getUser(uid) {
    setUid(uid);
    const url ='https://whispering-dusk-07432.herokuapp.com/user/'+uid;
    try {
        await axios.get(url)
                .then((response) => {
                  const result = response.data;
                  handleSignIn(result.password);
                  console.log(result)
                })
                .catch(error => {
                  if (error.response) {
                    console.log(error.response.data);
                  }
                })

    } catch(error){
      console.log(error);
    }
  }

  const changeFirebasePassword = (credential) => {
    // Ask signed in user for current password.
    firebase.auth().currentUser.updatePassword(password)
    .then(() => {
      persistLogin(credential)
    });
  }

  const ChangeMongoPass = async () => {
    setLoggingIn(false);
    const url ='https://whispering-dusk-07432.herokuapp.com/user/'+uid;
    try {
      if (uid !== '' && password !== '') {
        if (password == verifyPassword) {
          await axios
                .put(url, {
                  "currentUserId": uid,
                  "password": password.trim()
                })
                .then((response) => {
                  const result = response.data;
                  changeFirebasePassword(result)
                })
                .catch(error => {
                  if (error.response) {
                    setLoginError(error.response.data);
                  }
                })
        } else {
          setLoginError("Password and Confirm Password do not match");
        }
      } else {
        console.log("Id is empty")
      }
    } catch (error) {
      setLoginError('Invalid credentials');
      console.log(error);
      setLoggingIn(false);
    }
  }

  
      return (
        <>
         { screen == "A" && (
          <KeyboardAVoidingWrapper><View style={styles.container}>
            <View style={styles.header}>
            <Feather name="arrow-left" size={25} color="#111" onPress={back}/>
              <View style={styles.inputstyle}>
                  <Text style={styles.bold}>Reset Password</Text>
              </View>
            </View>
            <View style={{height: 10}}/>
              <CustomInput 
              formType="Normal"
              label={"Email Address"}
              keyboard="email-address"
              value={email} 
              setValue={setEmail} 
              />
              
              {error ? <ErrorMessage error={error} visible={true} /> : null}
              {email ?
              <>
              {loggingIn ? 
              <CustomButton text="Send Code" 
              onPress={getUserByEmail} 
              customColor={{backgroundColor: '#4351D8'}} 
              customText={{color: 'white', fontSize: 16}} 
              loading="true"
              />:
              <CustomButton text="Send Code" 
              onPress={getUserByEmail} 
              customColor={{backgroundColor: '#4351D8'}} 
              customText={{color: 'white', fontSize: 16}} 
              />}
              </>:
              <CustomButton text="Send Code"
              customColor={{backgroundColor: 'gray'}} 
              customText={{color: 'white', fontSize: 16}} 
              />}
          </View>
          </KeyboardAVoidingWrapper>)}
          { screen == "B" && (
          <KeyboardAVoidingWrapper><View style={styles.container}>
            <View style={styles.header}>
              <Feather name="arrow-left" size={25} color="#111" onPress={() => setScreen("A")}/>
              <View style={styles.inputstyle}>
                  <Text style={styles.bold}>Confirm Code</Text>
              </View>
            </View>
            <CustomInput 
              formType="Normal"
              label={"Enter OTP"}
              keyboard="number-pad"
              value={OTP} 
              setValue={setOTP} 
              />
            {otpError ? <ErrorMessage error={otpError} visible={true} /> : null}

            {OTP?
            <>
            {loggingIn ? 
            <CustomButton text="Confirm" 
            onPress={confirmCode} 
            customColor={{backgroundColor: '#4351D8'}} 
            customText={{color: 'white', fontSize: 16}} 
            loading="true"
            />:
            <CustomButton text="Confirm" 
            onPress={confirmCode} 
            customColor={{backgroundColor: '#4351D8'}} 
            customText={{color: 'white', fontSize: 16}} 
            />}
            </>:
            <CustomButton text="Confirm"
            customColor={{backgroundColor: 'gray'}} 
            customText={{color: 'white', fontSize: 16}} 
            />}
          </View>
          </KeyboardAVoidingWrapper>)}
          { screen == "C" && (
          <KeyboardAVoidingWrapper><View style={styles.container}>
            <View style={styles.header}>
              <Feather name="arrow-left" size={25} color="#111" onPress={back}/>
              <View style={styles.inputstyle}>
                  <Text style={styles.bold}>Reset Password</Text>
              </View>
            </View>
            <View style={{padding: 20}}>
            <CustomInput 
              formType="Password"
              placeholder="Create Password"
              keyboard="default"
              value={password} 
              setValue={setPassword}
              />
              <CustomInput 
              formType="Password"
              placeholder="Verify Password"
              keyboard="default"
              value={verifyPassword} 
              setValue={setVerifyPassword}
              />
            {loggingIn ? 
              <CustomButton text="Change Password & Login" 
              onPress={ChangeMongoPass} 
              customColor={{backgroundColor: '#4351D8'}} 
              customText={{color: 'white', fontSize: 16}} 
              loading="true"
              />:
              <CustomButton text="Change Password & Login" 
              onPress={ChangeMongoPass} 
              customColor={{backgroundColor: '#4351D8'}} 
              customText={{color: 'white', fontSize: 16}} 
              />}
            </View>
          </View>
          </KeyboardAVoidingWrapper>)}
          </>
      );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: '6%',
    flexDirection: 'row',
    marginTop: 5,
    height: 60,
    width: "100%",
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  input: {
    width: '70%',
    color: '#5E5E5E',
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  bold: {
    color: '#111',
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 14,
  },
  boldlight: {
    color: '#5e5e5e',
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 14,
  },
  light: {
    color: '#5e5e5e',
    fontFamily: "Monstserrat_Light",
    fontSize: 13,
  },
  inputstyle: {
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  LoginText: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: '1%',
    fontSize: 24,
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


export default ForgotPassword