import React, { useEffect, useState, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, YellowBox } from 'react-native';

import PhoneInput from 'react-native-phone-number-input';

import CustomButton from '../component/CustomButton';
import CustomInput from '../component/CustomInput';
import ErrorMessage from '../component/ErrorMessage';
import KeyboardAVoidingWrapper from '../component/KeyboardAvoidingWrapper';

import firebase from '../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

//Credential Context
import { CredentialsContext } from '../component/CredentialsContext';

import CryptoES from "crypto-es";

YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

const auth = firebase.auth();
const db = firebase.firestore()
const userRef = db.collection('Users')

const DocSignup = () => {
      const [email, setEmail] = useState('');
      const [checknumber, setChecknumber] = useState('');
      const [username, setUsername] = useState('');
      const [checkuser, setCheckuser] = useState('');
      const [password, setPassword] = useState('');
      const [verifyPassword, setVerifyPassword] = useState('');
      const [lastName, setLastname] = useState('');
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
      const [specialty, setSpecialty] = useState('');

      //Context
      const {user, setUser} = useContext(CredentialsContext);

      const navigation = useNavigation();

      const back = () => {
        navigation.goBack();
      }

      function checkPhone(number){ 
        if ( checknumber !== '') {
              firebase.firestore().collection('Doctors')
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
              firebase.firestore().collection('Doctors')
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
            .collection('Doctors')
            .doc(userId)
            .set({
              email: email,
              username: username,
              password: CryptoES.SHA256(password).toString(),
              firstName: firstName,
              lastName: lastName,
              fullName: "Dr. "+lastName+" "+firstName,
              phoneNumber: phoneNumber,
              specialty: specialty,
              address: address,
              rating: 0,
              reviews: 0,
              registerDate: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
              console.log('Doctor added!');
            });
     }
 

      const handleSignUp = async () => {
         //Validate User
         setSigningUp(true);
         try {
          if (email !== '' && password !== '' && phoneNumber !== '' && address !== '' && specialty !== '') {
            if (password == verifyPassword) {
              await auth.createUserWithEmailAndPassword(email, password)
              .then(userCredentials => {
                if(userCredentials.user){
                  userCredentials.user.updateProfile({
                    displayName: username
                  }).then((s)=> {
                    const user = userCredentials.user;
                    const uid = userCredentials.user.uid;
                    userDetails(uid);
                    persistLogin(user);
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
        AsyncStorage.setItem('ileraCredentials', JSON.stringify(credential))
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
          <KeyboardAVoidingWrapper><View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="md-close-outline" size={35} color="#000" onPress={back} />
            </View>
              <Text style={styles.LoginText}>Doctors' Sign up</Text>
              <Text style={styles.subTitle}>Enter your credentials to register</Text>
  
              <CustomInput 
              formType="Normal"
              placeholder="Email"
              keyboard="email-address"
              value={email} 
              setValue={setEmail}
              />
              
              <CustomInput 
              formType="Normal"
              placeholder="Username"
              keyboard="default"
              value={checkuser} 
              setValue={setCheckuser}
              func={checkUsername(checkuser)} 
              />
              {usernameError ? <ErrorMessage error={usernameError} visible={true} /> : null}
              {usernameAvailable ? <ErrorMessage error={usernameAvailable} visible={true} success={true} /> : null}
              <CustomInput 
              formType="Normal"
              placeholder="Last Name"
              keyboard="default"
              value={lastName} 
              setValue={setLastname} 
              />
              <CustomInput 
              formType="Normal"
              placeholder="First Name"
              keyboard="default"
              value={firstName} 
              setValue={setFirstname} 
              />
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
              <Picker
               selectedValue={specialty}
               onValueChange={(itemValue, itemIndex) =>
                setSpecialty(itemValue)
                }
                style={styles.inputContainer}>  
               <Picker.Item label="Specialty" value="" fontFamily='Monstserrat_SemiBold' color='#5e5e5e' />
               <Picker.Item label="Allergists/Immunoligist" value="Allergists/Immunoligist" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Anesthesiologists" value="Anesthesiologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Cardiologists" value="Cardiologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Colon and Rectal Surgeons" value="Colon and Rectal Surgeons" fontFamily='Monstserrat_Ligh' color='#5e5e5e' />
               <Picker.Item label="Critical Care Medicine Specialists" value="Critical Care Medicine Specialists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Endocrinologists" value="Endocrinologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Family Physicians" value="Family Physicians" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Gastroenterologists" value="Gastroenterologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Geriatric Medicine Specialists" value="Geriatric Medicine Specialists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Hematologists" value="Hematologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Infectious Disease Specialists" value="Infectious Disease Specialists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Internists" value="Internists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Nephrologists" value="Nephrologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Neurologists" value="Neurologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Obstetricians and Gynecologists" value="Obstetricians and Gynecologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Oncologists" value="Oncologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Ophthalmologists" value="Ophthalmologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Osteopaths" value="Osteopaths" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Otolaryngologists" value="Otolaryngologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Pathologists" value="Pathologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Pediatricians" value="Pediatricians" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Plastic Surgeons" value="Plastic Surgeons" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Podiatrists" value="Podiatrists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Preventive Medicine Specialists" value="Preventive Medicine Specialists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Psychiatrists" value="Psychiatrists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Pulmonologists" value="Pulmonologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Pulmonologists" value="Pulmonologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Radiologists" value="Radiologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Sleep Medicine Specialists" value="Sleep Medicine Specialists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Sports Medicine Specialists" value="Sports Medicine Specialists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="General Surgeons" value="General Surgeons" fontFamily='Monstserrat_Light' color='#5e5e5e' />
               <Picker.Item label="Urologists" value="Urologists" fontFamily='Monstserrat_Light' color='#5e5e5e' />
            </Picker>
              <CustomInput 
              formType="Normal"
              placeholder="Address"
              keyboard="default"
              value={address} 
              setValue={setAddress} 
              />
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
              onPress={handleSignUp} 
              customColor={{backgroundColor: '#4351D8'}} 
              customText={{color: 'white',}} 
              />}

              
          </View>
          </KeyboardAVoidingWrapper>
          
      );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: '6%',
    flexDirection: 'column',
  },
  header: {
    paddingHorizontal: '4%',
    flexDirection: 'row',
    width: "100%",
    alignItems: 'flex-start',
    marginTop: 30,
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    
    height: 70,
    borderRadius: 5,
    paddingLeft: 16,
    
    marginVertical: 10,
    marginHorizontal: "1%",
    alignItems: 'center',
  },
  input: {
      width: '86%',
      color: '#5E5E5E',
      backgroundColor: '#E8E8E8',
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
});


export default DocSignup
