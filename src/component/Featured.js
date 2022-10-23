import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'

const Featured = ({onPress, image }) => {
    return (
        <Pressable onPress={onPress}>
            <Image source={{ uri: image }} style={styles.image}/>
        </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 300,
        width: 400,
        margin: 10,
        borderRadius: 20,
    },
    image: {
        backgroundColor: '#fff',
        height: 150,
        width: 150,
        margin: 10,
        borderRadius: 20,
    }
})

export default Featured