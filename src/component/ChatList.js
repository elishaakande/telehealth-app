import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import React, {useEffect, useState, useContext} from 'react';

import moment from 'moment';

//import icons
import { Ionicons } from '@expo/vector-icons';

//Credential Context
import { CredentialsContext } from '../component/CredentialsContext';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const ChatList = ({id, onPress, lastMessage, lastMessageTime, image, name }) => {
    var username, email, userid, myId;
    //Context
    const {user, setUser} = useContext(CredentialsContext);
    const [fullName, setFullName] = useState('');
    const [message, setMessage] = useState('');
    const [messageCount, setMessageCount] = useState(0);
    const [profilePic, setProfile] = useState('');
    const defaultavatar = require('../../assets/Images/avatar.png');
    if (user != null) {
        username = user.username;
        email = user.email;
        myId = user._id;
    }

    const createChat = async () => {
        firebase.firestore().collection('Chats')
        .doc(id)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            getUnreadMessageCount()
            } else {
              firebase.firestore()
                  .collection('Chats')
                  .doc(id)
                  .set({
                    participantId: [userid, _id]
                  })
                  .then(() => {
                    console.log('Chat created!');
                    getUnreadMessageCount()
                  });
            }
        })
     }

    function getUnreadMessageCount () {
        firebase.firestore()
        .collection('Chats')
        .doc(id)
        .collection('Details')
        .doc(myId)
        .onSnapshot(documentSnapshot => {
            if (documentSnapshot.exists) {
                setMessageCount(documentSnapshot.data().unreadMessageCount);
            }
        });
    }




  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
          <View style={{ width: 60 }}>
              {image ? <Image source={{uri: image}} style={styles.profile}/>:
               <Image source={defaultavatar} style={styles.profile}/>
              }
          </View>
          <View style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: 0.7*(SCREEN_WIDTH-90), }}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.lastMessage}>{lastMessage}</Text>
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 0.3*(SCREEN_WIDTH-90) }}>
              <Text style={styles.lastMessageTime}>{lastMessageTime}</Text>
              {messageCount !== 0 ?<View style={styles.unreadMessagesCount}>
              <Text style={styles.buttontext}>{messageCount}</Text>
              </View>: 
              <View style={{ height: 20, width: 20}}>
                  {}
              </View>}
          </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 1,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    unreadMessagesCount: {
        backgroundColor: '#4351D8',
        height: 20,
        width: 20,
        borderRadius: 20,
        padding: 2,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        width: 60,
        height: 60,
        borderRadius: 30,
      },
    image: {
        flex: 1,
        alignSelf: "stretch",
        height: 200,
        borderRadius: 20,
      },
    title:{
        fontSize: 16,
        color: '#000',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Bold',
        marginHorizontal: 10,
    },
    lastMessage:{
        fontSize: 12,
        color: '#5e5e5e',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Regular',
        marginHorizontal: 10,
    },
    isTyping:{
        fontSize: 12,
        color: '#4351D8',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Regular',
        marginHorizontal: 10,
    },
    lastMessageTime:{
        fontSize: 12,
        color: '#5e5e5e',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Regular',
        marginHorizontal: 10,
    },
    name:{
        fontSize: 14,
        color: '#000',
        marginTop: 5,
        fontFamily:'Monstserrat_SemiBold',
        marginHorizontal: 10,
        height: 19
    },
    time:{
        fontSize: 10,
        color: '#5e5e5e',
        marginTop: 5,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 10,
    },
    button:{
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginHorizontal: 5, 
        height: 40,
        margin: 5 
       },
    buttontext:{
        fontSize: 12,
        color: '#fff',
        fontFamily:'Monstserrat_SemiBold',
    },
    commentscount:{
        fontSize: 13,
        color: '#5e5e5e',
        fontFamily:'Monstserrat_SemiBold',
        marginHorizontal: 5
    },
    text2:{
        fontSize: 12,
        color: '#000',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:'Monstserrat_Light',
        marginHorizontal: 10,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row',
        width: "100%"
    }
})

export default ChatList