import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, YellowBox, Dimensions } from 'react-native';

import PhoneInput from 'react-native-phone-number-input';

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

import CryptoES from "crypto-es";

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

const auth = firebase.auth();
const db = firebase.firestore();
const userRef = db.collection('Users');

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const Signup = () => {
      const [email, setEmail] = useState('');
      const [checknumber, setChecknumber] = useState('');
      const [username, setUsername] = useState('');
      const [checkuser, setCheckuser] = useState('');
      const [password, setPassword] = useState('');
      const [verifyPassword, setVerifyPassword] = useState('');
      const [lastName, setLastname] = useState('');
      const [name, setName] = useState('');
      const [screen, setScreen] = useState(1);
      const [firstName, setFirstname] = useState('');
      const [phoneNumber, setPhonenumber] = useState('');
      const [address, setAddress] = useState('');
      const [signupError, setSignupError] = useState('');
      const [numberError, setNumberError] = useState('');
      const [numberAvailable, setNumberAvailable] = useState('');
      const [usernameError, setUsernameError] = useState('');
      const [usernameAvailable, setUsernameAvailable] = useState('');
      const [passwordError, setPasswordError] = useState('');
      const [signingUp, setSigningUp] = useState(false);
      const phoneInput = useRef(null);

      //Context
      const {user, setUser} = useContext(CredentialsContext);

      const navigation = useNavigation();

      const back = () => {
        navigation.goBack();
      }
      const doctor = () => {
        navigation.navigate("Doctor Signup");
      }

      function checkPhone(number){ 
        if ( checknumber !== '') {
              firebase.firestore().collection('Users')
              .where("phoneNumber", "==", number)
              .get()
              .then(querySnapshot => {
                if (!querySnapshot.empty) {
                  setNumberError("You already have an account with this phone number");
                  setPhonenumber('');
                  setNumberAvailable('');
                }
                else {
                  setPhonenumber(number);
                  setNumberError('');
                }
              });
        }
      }

      function checkUsername(user){ 
        const username = user.toLowerCase();
        if ( checkuser !== '') {
              firebase.firestore().collection('Users')
              .where("username", "==", username)
              .get()
              .then(querySnapshot => {
                if (!querySnapshot.empty) {
                  setUsernameError("Username has been taken!");
                  setUsernameAvailable('');
                }
                else {
                  setUsername(username);
                  setUsernameError('');
                  setUsernameAvailable("This Username is available");
                }
              });
        }
      }

      const handleValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        
        if (val.length === 0) {
          setEmailError('Email address must be enter');
          setEmail('');
          setEmailAvailable('');
        } else if (reg.test(val) === false) {
          setEmailError('Enter valid email address');
          setEmail('');
          setEmailAvailable('');
        } else if (reg.test(val) === true) {
          setEmailError('');
          setEmail(val);
          setEmailAvailable("This Email is available");
        }
      };

      const handleValidPassword = val => {
        let reg = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        
        if (val.length === 0) {
          setPasswordError('The password must be at least eight characters and contain at least 1 lowercase alphabetic character, 1 uppercase character and 1 numeric character');
          setPassword('');
        } else if (reg.test(val) === false) {
          setPasswordError('The password must be at least eight characters and contain at least 1 lowercase alphabetic character, 1 uppercase character and 1 numeric character');
          setPassword('');
        } else if (reg.test(val) === true) {
          setPasswordError('');
          setPassword(val);
        }
      };


      const userDetails = async (userId) => {
        //Validate User
        firebase.firestore()
            .collection('Users')
            .doc(userId)
            .set({
              email: email,
              username: username,
              firstName: firstName,
              lastName: lastName,
              fullName: lastName+" "+firstName,
              phoneNumber: phoneNumber,
              address: address,
              registerDate: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              console.log('User added!');
            });
     }

     const handleRegister = async () => {
      setSigningUp(true);
      const url ='https://whispering-dusk-07432.herokuapp.com/auth/register';
      try {
        if (email !== '' && name !== '' && password !== '' && phoneNumber !== '') {
          if (password == verifyPassword) {
            await axios
                  .post(url, {
                    "username": (username).trim(),
                    "email": (email.toLowerCase()).trim(),
                    "password": password.trim(),
                    "name": name.trim(),
                    "phonenumber": phoneNumber,
                  })
                  .then((response) => {
                    setSignupError('');
                    const result = response.data;
                    if (response.status == 200) {
                      handleSignUp(result.email, result.password, result._id);
                    persistLogin(result)
                    } else {
                      setSignupError("Signup error");
                    }
                  })
                  .catch(error => {
                    if (error.response) {
                      setSignupError(error.response.data);
                    }
                  })
          } else {
            setSignupError('Password and Confirm Password do not match');
            setSigningUp(false);
          } 

        } else {
          setSignupError('Please, enter your details');
          setSigningUp(false);
        }
      } catch (error) {
        setSignupError('Invalid credentials');
        console.log(error);
        setSigningUp(false);
      }
    }
 

      const handleSignUp = async (newEmail, newPass,uid) => {
         //Validate User
         try {
          if (email !== '' && password !== '' && phoneNumber !== '' && address !== '') {
            if (password == verifyPassword) {
              await auth.createUserWithEmailAndPassword(newEmail, newPass)
              .then(userCredentials => {
                if(userCredentials.user){
                  userCredentials.user.updateProfile({
                    displayName: firstName+" "+lastName
                  }).then((s)=> {
                    userDetails(uid);
                  })
                }
            })
          } else {
            setSignupError('Password and Confirm Password do not match');
            setSigningUp(false);
          } 
          } else {
            setSignupError('Please, enter your details');
            setSigningUp(false);
          }
        } catch (error) {
          if (error.code === 'auth/email-already-in-use') {
            setSignupError('That email address is already in use!');
            setSigningUp(false);
          }
      
          else if (error.code === 'auth/invalid-email') {
            setSignupError('That email address is invalid!');
            setSigningUp(false);
          }
          else if (error.code === 'auth/weak-password') {
            setSignupError('Password should be atleast 6 characters');
            setSigningUp(false);
          }
          else {
          setSignupError('Error occurred when creating your account! Try again');
          setSigningUp(false);
          }
        }
      }

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
        
      }

      const onRegisterPressed = async () => {
        
      }


  
      return (
            <View style={styles.container}>
            <View style={styles.header}>
                <Feather name="arrow-left" size={25} color="#111" onPress={back}/>
                <View style={styles.inputstyle}>
                    <Text style={styles.bold}>Signup</Text>
                </View>
              </View>
              <KeyboardAVoidingWrapper>
              <View style={{flex: 1, alignItems: "center"}}>
                
              <CustomInput 
              formType="Normal"
              label={"Email"}
              keyboard="email-address"
              value={email} 
              setValue={setEmail}
              />
              
              <CustomInput 
              formType="Normal"
              label={"Username"}
              keyboard="default"
              value={username} 
              setValue={setUsername}
              />
              {usernameError ? <ErrorMessage error={usernameError} visible={true} /> : null}
              {usernameAvailable ? <ErrorMessage error={usernameAvailable} visible={true} success={true} /> : null}
              <CustomInput 
              formType="Normal"
              label={"Name"}
              keyboard="default"
              value={name} 
              setValue={setName} 
              />
              <View style={styles.customContainer}>
                <Text style={styles.placeholder}>Phone Number</Text>
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="NG"
                layout="first"
                containerStyle={styles.inputContainer}
                textContainerStyle={styles.input}
                onChangeFormattedText={text => {
                  setPhonenumber(text);
                }}
              />
              </View>
              <CustomInput 
              formType="Password"
              label={"Password"}
              keyboard="default"
              value={password} 
              setValue={setPassword}
              />
              <CustomInput 
              formType="Password"
              label={"Verify Password"}
              keyboard="default"
              value={verifyPassword} 
              setValue={setVerifyPassword}
              />
              
              {signupError ? <ErrorMessage error={signupError} visible={true} /> : null}
              
              <Text style={styles.subTerm}>
                By creating an account with us, you confirm that you accept our {} 
                <Text style={styles.term}>Terms of Use and Privacy Policy</Text>
              </Text>
              {signingUp ? 
              <CustomButton text="Sign Up" 
              customColor={{backgroundColor: '#4351D8'}} 
              customText={{color: 'white',}} 
              loading="true"
              />:
              <CustomButton text="Sign Up" 
              onPress={handleRegister} 
              customColor={{backgroundColor: '#4351D8'}} 
              customText={{color: 'white',}} 
              />}
          </View>
          </KeyboardAVoidingWrapper>
          </View>   
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
  backgroundColor: "#fff",
  color: '#000',
  fontFamily: "Monstserrat_Light",
  fontSize: 14,
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
  subTerm:{
    fontSize: 12,
    color: '#2E2E2E',
    marginTop: 15,
    marginBottom: 15,
    fontFamily:'Monstserrat_Light',
    marginHorizontal: '2%',
  },
  term:{
    fontSize: 12,
    color: '#4351D8',
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
placeholder: {
  fontFamily: "Monstserrat_SemiBold",
  color: '#5e5e5e',
  fontSize: 12,
},
customContainer: {
  justifyContent: 'center',
  paddingTop: 10,
},
});


export default Signup
