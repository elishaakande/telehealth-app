import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const PlayRecording = (props) => {
    const url = props.url;
    const AudioRecorder = useRef(new Audio.Recording());
    const AudioPlayer = useRef(new Audio.Sound());

    // States for UI
    const [RecordedURI, SetRecordedURI] = useState('');
    const [AudioPermission, SetAudioPermission] = useState(false);
    const [IsRecording, SetIsRecording] = useState(false);
    const [IsPLaying, SetIsPLaying] = useState(false);
    const [IsAudio, SetIsAudio] = useState(false);
    const [status, setStatus] = useState('');
    const [duration, setDuration] = useState('');


    const LoadAudio = async () => {
        try {
            // Load the Recorded URI
            await AudioPlayer.current.loadAsync({ uri: url }, {}, true);

            // Get Player Status
            const playerStatus = await AudioPlayer.current.getStatusAsync();
            setStatus(playerStatus);
            setDuration(getDurationFormatted(playerStatus.durationMillis));

            // Play if song is loaded successfully
        } catch (error) {}
    };


    // Function to play the recorded audio
    const PlayRecordedAudio = async () => {
        try {
          // Get Player Status
          const playerStatus = await AudioPlayer.current.getStatusAsync();
          setStatus(playerStatus);
          setDuration(getDurationFormatted(playerStatus.durationMillis));
          // Play if song is loaded successfully
          if (playerStatus.isLoaded) {
            if (playerStatus.isPlaying === false) {
              AudioPlayer.current.playAsync();
              SetIsPLaying(true);
              if(playerStatus.didJustFinish) {
                await Audio.current.unloadAsync();
                SetIsPLaying(false);
              }
            }
          } else {
              // Load the Recorded URI
            await AudioPlayer.current.loadAsync({ uri: url }, {}, true);
          }
        } catch (error) {}
      };

  // Function to stop the playing audio
  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync();

      // If song is playing then stop it
      if (playerStatus.isLoaded === true) {
          await AudioPlayer.current.unloadAsync();
          SetIsPLaying(false);
      }
    } catch (error) {}
  };
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  useEffect(() => {
    LoadAudio()
  }, [])

  return (
    <View style={{padding: 5, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
        {IsPLaying?<Ionicons name='md-stop' size={25} color={'#fff'} onPress={StopPlaying } />:
        <Ionicons name='md-play' size={25} color={'#fff'} onPress={() => PlayRecordedAudio(props.url) } />
        }
        <View>
            <Text style={styles.recording}>{duration}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    recording: {
      color: '#fff',
      fontFamily: "Monstserrat_SemiBold",
      fontSize: 16,
      paddingHorizontal: 20,
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

export default PlayRecording