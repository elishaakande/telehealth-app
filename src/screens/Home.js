import { View, Text,StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Pressable, ActivityIndicator, Dimensions, SafeAreaView} from 'react-native'
import React, {useContext, useEffect, useState} from 'react';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

//Credential Context
import { CredentialsContext } from '../component/CredentialsContext';

//Import Component
import Popupmenu from '../component/Popupmenu';
import DoctorList from '../component/DoctorList';
import HospitalFlatList from '../component/HospitalFlatList';
import ProductList from '../component/ProductList';

//import icons
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

//import reanimated

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const doctors = [
  {
    id: 1,
    fullName: "Austin Distel",
    email: "distel@gmail.com",
    specialty: "Primary Care Physicians",
    avatar: "https://firebasestorage.googleapis.com/v0/b/ileraapp-cf05b.appspot.com/o/austin-distel-min.jpg?alt=media&token=ad9da0ff-07cb-4f81-a9e9-9c8b2f5acef5",
    rating: 4.5,
    reviews: 10
  },
  {
    id: 2,
    fullName: "Rian Ramirez",
    email: "haw@gmail.com",
    specialty: "Obstetricians and gynecologists",
    avatar: "https://firebasestorage.googleapis.com/v0/b/ileraapp-cf05b.appspot.com/o/rian-ramirez.jpg?alt=media&token=82d83e27-8563-429a-ba23-4cc872633ff3",
    rating: 4.7,
    reviews: 290
  },
  {
    id: 3,
    fullName: "Bruno Rodrigues",
    email: "haw@gmail.com",
    specialty: "Pediatricians",
    avatar: "https://firebasestorage.googleapis.com/v0/b/ileraapp-cf05b.appspot.com/o/bruno-rodrigues-min.jpg?alt=media&token=2ffea315-4182-452d-b3df-159d574898ca",
    rating: 4.7,
    reviews: 50
  },
  {
    id: 4,
    fullName: "Dalton Ngangi",
    email: "haw@gmail.com",
    specialty: "Family physicians",
    avatar: "https://firebasestorage.googleapis.com/v0/b/ileraapp-cf05b.appspot.com/o/dalton-ngangi-min.jpg?alt=media&token=c7f0c76d-e410-4c7a-92b4-eb4ea44ae935",
    rating: 4.8,
    reviews: 20
  }
]

const Home = () => {
  var name, email, id, firstname, lastname, profilePicture;

  //Context
  const {user, setUser} = useContext(CredentialsContext);
  const navigation = useNavigation();
  
  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [greetings, setGreetings] = useState('');
  const [doclist, setDoclist] = useState([]);
  const [storelist, setStorelist] = useState([]);
  const [realtor, setRealtor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [homeLoading, setHomeLoading] = useState(true);

  if (user != null) {
    name = user.firstname +" "+ user.lastname;
    email = user.email;
    id = user._id;
    profilePicture = user.profilePicture;
}

const getGreetings = () => {
  const afternoon = 12
  const evening = 17
  const currentHour = moment().format("HH")

  if(currentHour >= afternoon && currentHour <= evening) {
      setGreetings("Good Afternoon")
  } else if(currentHour >= evening) {
    setGreetings("Good Evening")
  } else {
    setGreetings("Good Morning")
  }
}

const handleSignIn = async (email, password) => {
  await firebase.auth.signInWithEmailAndPassword(email, password)
};

function getProducts(){

  firebase.firestore().collection('Store')
  .onSnapshot((querySnapshot) => {
  const data = []
  querySnapshot.forEach((documentSnapshot)=> {
  data.push({
    ...documentSnapshot.data(),
    id: documentSnapshot.id
  })
})
if (!querySnapshot.metadata.hasPendingWrites) {  // <======
  setStorelist(data);
  setLoading(false)
}
})
}

function getRealtor(){

  firebase.firestore().collection('Realtor')
  .onSnapshot((querySnapshot) => {
  const data = []
  querySnapshot.forEach((documentSnapshot)=> {
  data.push({
    ...documentSnapshot.data(),
    id: documentSnapshot.id
  })
})
if (!querySnapshot.metadata.hasPendingWrites) {  // <======
    setRealtor(data);
  }
})
}

function getDoctorData(){

  firebase.firestore().collection('Doctors')
  .onSnapshot((querySnapshot) => {
  const data = []
  querySnapshot.forEach((documentSnapshot)=> {
  data.push({
    ...documentSnapshot.data(),
    id: documentSnapshot.id
  })
})
if (!querySnapshot.metadata.hasPendingWrites) {  // <======
  setDoclist(data);
  setLoading(false)
}
})
}
  
  const postLink = () => {
    navigation.navigate('Create Post');
  }
  const medicalsLink = () => {
    navigation.navigate('Medicals');
  }
  const profileLink = () => {
    navigation.navigate('Profile');
  }
  const bookDoctor = () => {
    navigation.navigate('Book Doctor');
  }
  const doctorLink = () => {
    navigation.navigate('Doctors');
  }
  const hospitalLink = () => {
    navigation.navigate('Hospitals');
  }
  const storeLink = () => {
    navigation.navigate('Store');
  }
  const myHealth = () => {
    navigation.navigate('My Health');
  }
  const hospitalDetails = () => {
    navigation.navigate('Hospital Details');
  }
  const cartLink = () => {
    navigation.navigate('Cart');
  }
  const scanLink = () => {
    navigation.navigate('Scan');
  }
  
  function getAvatar (id) {
    firebase.firestore()
    .collection('Users')
    .doc(id)
    .onSnapshot(documentSnapshot => {
      setAvatar(documentSnapshot.data().avatar);
    });
  }


  function renderItem({ item }) {
    return(
      <DoctorList 
        onPress={() => {navigation.navigate('Book Doctor', {
          id: item.id,
          fullName: item.fullName,
          email: item.email,
          avatar: item.avatar,
          specialty: item.specialty,
          rating: item.rating,
          reviews: item.reviews
        })}}
        id={item.id}
        name={item.fullName}
        avatar={item.avatar}
        specialist={item.specialty}
        rating={item.rating}
        reviews={item.reviews}
      />
    )
}

function listEmptyComponent () {
  return (
      <View >
        {loading !== true ? <View style={{alignItems: 'center', justifyContent: 'center', height: 300}}>
        <ActivityIndicator size="large" color="#000" />
      </View>: null}
      </View>
  )
}



  useEffect(() => {
    getGreetings();
  }, [])

  function topScroll () {
    return (
      <View>
        <View style={styles.section}>
          <View style={styles.heading}>
            <View style={{ width: "50%", alignItems: "flex-start"}}>
              <Text style={styles.services}>SERVICES</Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end"}}>
              <Text onPress={doctorLink} style={styles.more}>SEE ALL</Text>
            </View>
          </View>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginVertical: 10, height: 70, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 20, paddingBottom: 15}}>
              <TouchableOpacity onPress={doctorLink} style={styles.iconStyle}>
                <Ionicons name="md-person" size={22} color="#f2f2f2" />
              </TouchableOpacity>
              <Text style={styles.itemTitle}>Doctors</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 20, paddingBottom: 15}}>
              <TouchableOpacity onPress={doctorLink} style={styles.iconStyle}>
                <FontAwesome5 name="ambulance" size={18} color="#f2f2f2" />
              </TouchableOpacity>
              <Text style={styles.itemTitle}>Ambulance</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 20, paddingBottom: 15}}>
              <TouchableOpacity onPress={storeLink} style={styles.iconStyle}>
                <FontAwesome5 name="shopping-basket" size={20} color="#f2f2f2" />
              </TouchableOpacity>
              <Text style={styles.itemTitle}>Store</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 15}}>
              <TouchableOpacity onPress={medicalsLink} style={styles.iconStyle}>
              <Ionicons name="md-medical" size={25} color="#f2f2f2" />
              </TouchableOpacity>
              <Text style={styles.itemTitle}>Medicals</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20, paddingBottom: 15}}>
              <TouchableOpacity onPress={hospitalLink} style={styles.icon}>
              <FontAwesome5 name="clinic-medical" size={20} color="#f2f2f2" />
              </TouchableOpacity>
              <Text style={styles.itemTitle}>Hospital</Text>
            </View>
          </View>
        </View>
        <View style={styles.section2}>
          <View style={styles.heading}>
            <View style={{ width: "100%", alignItems: "flex-start"}}>
              <Text style={styles.services}>TOP DOCTORS</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  function footerScroll () {
    return (
      <View>
        <View style={styles.section}>
          <View style={styles.heading}>
            <View style={{ width: "50%", alignItems: "flex-start"}}>
              <Text style={styles.services}>HOSPITALS</Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end"}}>
              <Text onPress={hospitalLink} style={styles.more}>SEE ALL</Text>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>
            <HospitalFlatList 
              name={"Akure Teaching Hospital"}
              image="https://upload.wikimedia.org/wikipedia/commons/2/25/Teaching_Hospital%2C_Akure%2C_Ondo_State.jpg"
              time={"08:00 AM - 05:00 PM"}
              location={"Hospital Road, Around NEPA"}
              onPress={hospitalDetails}
            />
            <HospitalFlatList 
              name={"Mother and Child Hospital, Akure"}
              image="https://topgov-media.s3.amazonaws.com/photos/photos/IMG_0375_large_thumbnail.JPG"
              time={"08:00 AM - 05:00 PM"}
              location={"Oke aro"}
              onPress={hospitalDetails}
            />
            <HospitalFlatList 
              name={"Federal Medical Center Owo"}
              image="https://tvcnews.gridpapacdn.com/wp-content/uploads/2018/04/FMC-Owo-TVC.jpg"
              time={"08:00 AM - 05:00 PM"}
              location={"Owo, Nigeria"}
              onPress={hospitalDetails}
            />
          </ScrollView>
        </View>
        {/*
        <View style={styles.section2}>
          <View style={styles.heading}>
            <View style={{ width: "50%", alignItems: "flex-start"}}>
              <Text style={styles.services}>STORE</Text>
            </View>
            <View style={{ width: "50%", alignItems: "flex-end"}}>
              <Text onPress={storeLink} style={styles.more}>SEE ALL</Text>
            </View>
          </View>
          { storelist .map((item, key)=>(
                     <ProductList key={key} 
                        productName={item.productName}
                        image={item.images[0]}
                        price={item.price}
                        description={item.description}
                        rating={item.rating}
                        reviews={item.reviews}
                        sold={item.sold}
                        onPress={() => {navigation.navigate('Store Details', {
                          id: item.id,
                          productName: item.productName,
                          description: item.description,
                          brand: item.brand,
                          images: item.images,
                          price: item.price,
                          sold: item.sold,
                          rating: item.rating,
                          reviews: item.reviews,
                          freeShipping: item.freeShipping,
                          shippingFee: item.shippingFee,
                          available: item.available,
                          sellerId: item.sellerId
                        })}}
                      />
                    )
          )}
        </View>
        */}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <View style={styles.menu}>
            <View style={styles.greetings}>
              <Text style={styles.regular}>👋 {greetings}</Text>
              <Text style={styles.username}>Elisha Akande!</Text>
            </View>
          </View>
          <View style={styles.profileView}>
            <View style={{paddingRight: 15}}>
              <Ionicons name="ios-scan-outline" size={26} color="#111" />
            </View>
            <View style={{paddingRight: 15}}>
              <Ionicons name="ios-cart-outline" size={26} color="#111" onPress={cartLink} />
            </View>
            <Pressable onPress={profileLink}>
              {profilePicture?<Image
              source={{ uri: profilePicture }}
              style={styles.profile}
              />:<Image
              source={require("../../assets/Images/avatar.jpg")}
              style={styles.profile}
              />}
            </Pressable>
            
          </View>
       </View>
        <FlatList style={{width:'100%'}}
          data={doctors}
          keyExtractor={(item)=>item.id}
          renderItem={renderItem}
          ListEmptyComponent={listEmptyComponent}
          ListHeaderComponent={topScroll}
          ListFooterComponent={footerScroll}
          maxToRenderPerBatch={10} //render only 5 items per scroll.
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    flexDirection: 'row',
    paddingTop: 20,
    height: 70,
    width: "100%",
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  section: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingTop: 10,
    width: "100%",
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#f2f2f2'
  },
  section2: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingTop: 10,
    width: "100%",
    alignItems: 'center',
    paddingBottom: 10,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    paddingLeft: 16,
    marginHorizontal: "6%",
    alignItems: 'center'
  },
  input: {
      width: '44%',
      alignItems: 'flex-start',
      color: '#111',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 14,
  },
  input2: {
    width: '44%',
    alignItems: 'flex-end',
    color: '#111',
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 14,
  },
  doctorText: {
    color: '#111',
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 14,
  },
  iconStyle: {
    height: 60,
    width: 60,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#4351D8",
    borderRadius: 30,
    borderColor: "#4351D870",
    borderWidth: 10
  },
  iconStyleAmb: {
    height: 60,
    width: 60,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#065f46",
    borderRadius: 30,
    borderColor: "#077e5c",
    borderWidth: 10
  },
  iconStyleStore: {
    height: 60,
    width: 60,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#9c6137",
    borderRadius: 30,
    borderColor: "#cc9966",
    borderWidth: 10
  },
  iconStyleStore: {
    height: 60,
    width: 60,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#9c6137",
    borderRadius: 30,
    borderColor: "#cc9966",
    borderWidth: 10
  },
  iconStyleMedic: {
    height: 60,
    width: 60,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#1260cc",
    borderRadius: 30,
    borderColor: "#3a9bdc",
    borderWidth: 10
  },
  heading: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  services: {
    color: '#111',
    fontFamily: "Monstserrat_Bold",
    fontSize: 12,
  },
  itemTitle: {
    color: '#2e2e2e',
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 12,
  },
  more: {
    color: '#8e8e8e',
    fontFamily: "Monstserrat_Bold",
    fontSize: 12,
  },
  show: {
    color: '#111',
    fontFamily: "Monstserrat_Light",
    fontSize: 12,
  },
  greetings: {
    paddingHorizontal: '6%',
    paddingVertical: 10,
    flexDirection: 'column',
    width: "100%"
  },
  columnTab: {
    paddingHorizontal: '6%',
    flexDirection: 'row',
    width: "100%"
  },
  myHealth: {
    width: "47%",
    height: 150,
    backgroundColor: "#4351D8",
    borderRadius: 10,
    margin: 5,
    flexDirection: 'column',
  },
  diagnostic: {
    width: "47%",
    height: 150,
    backgroundColor: "#FFF",
    borderRadius: 10,
    margin: 5,
    flexDirection: 'column',
  },
  menu: {
    width: "47%",
  },
  profileView: {
    width: "50%",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  animation: {
    width: 150,
    height: 200,
    alignSelf: 'center'
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#FFF",
    alignItems:"flex-end"
  },
  regular:{
    fontSize: 12,
    color: '#2E2E2E',
    fontFamily:'Monstserrat_Regular',
    marginHorizontal: '1%',
  },
  light:{
    fontSize: 10,
    color: '#F2F2F2',
    fontFamily:'Monstserrat_Light'
  },
  lightdark:{
    fontSize: 10,
    color: '#5e5e5e',
    fontFamily:'Monstserrat_Light'
  },
  bold:{
    fontSize: 25,
    color: '#000',
    fontFamily:'Monstserrat_Bold',
    marginHorizontal: '1%',
  },
  username:{
    fontSize: 16,
    color: '#000',
    fontFamily:'Monstserrat_Bold',
    marginHorizontal: '1%',
    height: 20
  },
  semiboldWhite:{
    fontSize: 18,
    color: '#FFF',
    fontFamily:'Monstserrat_SemiBold',
  },
  semiboldBlue:{
    fontSize: 18,
    color: '#4351D8',
    fontFamily:'Monstserrat_SemiBold',
  },
  semiboldBlack:{
    fontSize: 18,
    color: '#2e2e2e',
    fontFamily:'Monstserrat_SemiBold',
  },
  semibold:{
    fontSize: 16,
    color: '#2E2E2E',
    fontFamily:'Monstserrat_SemiBold',
  },
  button:{
    backgroundColor: "#FFF",
    fontSize: 16,
    color: '#2E2E2E',
    fontFamily:'Monstserrat_SemiBold',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 5
  },
  button2:{
    backgroundColor: "#4351D8",
    fontSize: 16,
    color: '#FFF',
    fontFamily:'Monstserrat_SemiBold',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 5
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

export default Home