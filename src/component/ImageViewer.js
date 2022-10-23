import { View, Text, Image, Dimensions, ScrollView } from 'react-native';
import React from 'react';

import { Feather } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const ImageViewer = ({images}) => {

  return (
    <View style={{flex:1, width: SCREEN_WIDTH}}>
        <View style={styles.header}>
      <Feather name="arrow-left" size={25} color="#111" onPress={() => setVisible(false)}/>
      <View style={styles.inputstyle}>
          <Text style={styles.bold}>Comments</Text>
      </View>
                    </View>
      <Image source={{uri: images}} resizeMode="contain" style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}/>
    </View>
  )
}

export default ImageViewer