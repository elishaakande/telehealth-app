import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, FlatList, ActivityIndicator, Modal, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

//Import Icons
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

//Import Components
import DoctorList from '../component/DoctorList';
import Checkbox from '../component/CheckBox';
import CustomButton from '../component/CustomButton';
import ErrorMessage from '../component/ErrorMessage';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
var DoctorSpecialty = [ "Allergists/Immunologists", "Anesthesiologists", "Cardiologists", "Colon and Rectal Surgeons",
 "Critical Care Medicine Specialists", "Dermatologists", "Endocrinologists", "Emergency Medicine Specialists", "Family Physicians",
 "Gastroenterologists","General Surgeons", "Geriatric Medicine Specialists", "Hematologists", "Hospice and Palliative Medicine Specialists",
 "Infectious Disease Specialists","Internists","Medical Geneticists","Nephrologists","Neurologists", "Obstetricians and Gynecologists",
 "Oncologists", "Ophthalmologists", "Osteopaths", "Otolaryngologists", "Pathologists","Pediatricians", "Physiatrists", "Plastic Surgeons",
 "Podiatrists","Preventive Medicine Specialists","Psychiatrists","Pulmonologists","Radiologists","Rheumatologists", "Sleep Medicine Specialists",
 "Sports Medicine Specialists","Urologists"

 ];

const Doctors = () => {
  const navigation = useNavigation();

  const [keyword, setKeyword] = useState('');
  const [doclist, setDoclist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [filters, setFilter] = useState([]);
  const [filterError, setFilterError] = useState('');


  function Search(word) { 
    
    if ( keyword !== '') {
          
            
          }
        }
      function getDoctorData(){

        firebase.firestore().collection('Doctors')
        .orderBy('registerDate', 'desc')
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

  const onPost = () => {
    navigation.navigate('Posts');
  }
  const back = () => {
    navigation.goBack();
  } 



  const ApplyFilter = () => {
    
    if (filters.length) {
      if (filters.length < 9 ) {
        firebase.firestore().collection('Doctors')
          .where('specialty', 'in', filters)
          .onSnapshot((querySnapshot) => {
            const data = []
            querySnapshot.forEach((documentSnapshot)=> {
            data.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id
            })
          })
            CloseFilter();
            setDoclist(data);
            setFilter([]);
            setLoading(false)
          })
      } else {
        setFilterError("Select eight or lesser categories")
      }
    }
  } 
  const CloseFilter = () => {
    setModalVisible(!modalVisible);
    setFilter([]);
    setFilterError("")
  }

  function AddArray(item) { 
    setFilter(oldArray => [...oldArray, item]);
  }
  function RemoveArray() { 
    setFilter((filters) => filters.filter((_, i) => i !== filters.length - 1));
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Ionicons name="md-arrow-back-outline" size={25} color="#111" onPress={back} />
        </View>
        <View style={styles.inputstyle}>
        <TextInput 
            value={keyword} 
            onChangeText={setKeyword}
            placeholder= "Search Doctors"
            placeholderTextColor="#5E5E5E" 
            keyboardType="default"
            style={styles.input} 
            onSubmitEditing={() => Search(keyword)}
        />
        </View>
        <Feather name="filter" size={20} color="#111"  onPress={() => setModalVisible(!modalVisible)} />
      </View>
      <FlatList style={{width:'100%'}}
          data={doclist}
          keyExtractor={(item)=>item.id}
          renderItem={renderItem}
          ListEmptyComponent={listEmptyComponent}
          maxToRenderPerBatch={10} //render only 5 items per scroll.
        />
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row', marginBottom: 10, alignItems: 'center'}}>
              <Text style={{fontFamily: "Monstserrat_SemiBold", fontSize: 20, width: '80%', alignItems: 'center', justifyContent: 'center'}}>Filter</Text>
              <Ionicons name="md-close-outline" size={40} style={{alignItems: 'center', justifyContent: 'center'}} color="#111" onPress={() => setModalVisible(!modalVisible)} />
            </View>
            <ScrollView>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row'}}>
                { DoctorSpecialty.map((item, key)=>(
                    <Checkbox specialty={item}
                    addArray={() => setFilter(oldArray => [...oldArray, item])}
                    removeArray={() => RemoveArray()}
                    filter={filters} />
                    )
                )}
            </View>
            </ScrollView>
            {filterError ? <ErrorMessage error={filterError} visible={true} /> : null}
            <View style={{flexDirection: 'row'}}>
                <CustomButton text="Close" 
                  onPress={CloseFilter} 
                  customColor={{backgroundColor: '#555'}} 
                  customText={{color: 'white', fontFamily: 'Monstserrat_SemiBold', fontSize: 16}} 
                  />
                <CustomButton text="Apply" 
                  onPress={ApplyFilter} 
                  customColor={{backgroundColor: '#4351D8'}} 
                  customText={{color: 'white', fontFamily: 'Monstserrat_SemiBold', fontSize: 16}} 
                  />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topbar: {
    backgroundColor: '#fff',
    paddingHorizontal: '6%',
    flexDirection: 'column',
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginTop: 5,
    height: 60,
    width: "100%",
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2'
  },
  input: {
    width: '70%',
    color: '#5E5E5E',
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  modalText: {
    color: '#111',
    fontFamily: "Monstserrat_SemiBold",
    fontSize: 16,
  },
  modalText2: {
    color: '#111',
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 50,
    marginBottom: 0,
  },
  modalView: {
    marginTop: 5,
    marginBottom: 5,
    height: SCREEN_HEIGHT-100,
    width: SCREEN_WIDTH-20,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputstyle: {
    width: '77%',
    marginLeft: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  text: {
    color: '#fff',
    fontFamily: "Monstserrat_Light",
    fontSize: 14,
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

export default Doctors