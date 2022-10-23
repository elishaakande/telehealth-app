import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';

import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

//Import Icons
import { Ionicons } from '@expo/vector-icons';

//Credential Context
import { CredentialsContext } from '../../component/CredentialsContext';


const Appointments = () => {
  const navigation = useNavigation();
  var username, email, id, avatar;

  //Context
  const {user, setUser} = useContext(CredentialsContext);
  
  const [keyword, setKeyword] = useState('');
  const [chatlist, setChatlist] = useState([]);
  const [loading, setLoading] = useState(true);

  if (user != null) {
    username = user.displayName;
    email = user.email;
    id = user.uid;
}

  const onChat = () => {
    navigation.navigate('Posts');
  }

  const back = () => {
    navigation.goBack();
  }

  function getChat(){

    firebase.firestore().collection('Chats')
    .onSnapshot((querySnapshot) => {
    const data = []
    querySnapshot.forEach((documentSnapshot)=> {
    data.push({
      ...documentSnapshot.data(),
      id: documentSnapshot.id
    })
  })
  if (!querySnapshot.metadata.hasPendingWrites) {  // <======
    setChatlist(data);
    setLoading(false)
  }
  })
  }

  

  useEffect(() => {
  }, [])

  function listEmptyComponent () {
    return (
        <View >
          {loading !== true ? <View style={{alignItems: 'center', justifyContent: 'center', height: 300}}>
          <ActivityIndicator size="large" color="#000" />
        </View>: null}
        </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
           <View style={styles.back}>
              <Ionicons name="md-arrow-back-outline" size={25} color="#000" onPress={back} />
            </View>
            <View style={styles.inputstyle}>
                <Text style={styles.bold}>Appointments</Text>
            </View>
            <View></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  back: {
    width: 30,
  },
  input: {
    width: '70%',
    color: '#5E5E5E',
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  inputstyle: {
    width: '90%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  bold: {
    color: '#111',
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 20,
  },
  button:{
    backgroundColor: "#4351D8",
    color: '#FFF',
    fontSize: 16,
    fontFamily:'Monstserrat_SemiBold',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignItems: 'center',
    marginHorizontal: 5, 
    height: 40,
    marginHorizontal: 10
  },
});


export default Appointments