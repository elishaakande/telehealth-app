import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import React, {useState, useRef} from 'react';

import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const AudioItem = ({thumbnail, audio, title, artist, duration}) => {
    const AudioPlayer = useRef(new Audio.Sound());
    const [play, setPlay] = useState(false);
    const [IsPLaying, SetIsPLaying] = useState(false);
    const [IsAudio, SetIsAudio] = useState(false);
    const [status, setStatus] = useState('');

    const LoadAudio = async () => {
        try {
            // Load the Recorded URI
            await AudioPlayer.current.loadAsync({ uri: audio }, {}, true);

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

  return (
    <TouchableOpacity>
        <View style={styles.container}>
            <Image source={{uri: thumbnail}} style={styles.thumbnail} />
            <View style={{flex: 1}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtile}>{artist}</Text>
                <View style={{flex: 1, justifyContent: "center"}}>
                    <Text style={styles.subtile}>{duration}</Text>
                </View>
            </View>
            <Ionicons name={'md-add-outline'} onPress={() => setPlay(!play)} size={30} color="#111" />
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: "center",
    },
    thumbnail: {
        height: 70,
        width: 70,
        marginRight: 10
    },
    title: {
        fontFamily: "Monstserrat_Bold",
        fontSize: 14,
        color: "#111"
    },
    subtile: {
        fontFamily: "Monstserrat_Regular",
        fontSize: 14,
        color: "#5e5e5e"
    }
})

export default AudioItem