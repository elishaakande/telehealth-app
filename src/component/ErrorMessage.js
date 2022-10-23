import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ErrorMessage = ({ error, visible, success }) => {
  if (!error || !visible) {
    return null;
  }

  return <View>{ success ? <Text style={styles.successText}>{error}</Text>:<Text style={styles.errorText}>{error}</Text>}</View>;
};

const styles = StyleSheet.create({
  errorText: {
    color: '#cc0000',
    fontSize: 12,
    marginBottom: 10,
    fontFamily:'Monstserrat_Light',
  },
  successText: {
    color: '#009900',
    fontSize: 12,
    marginBottom: 10,
    fontFamily:'Monstserrat_Light',
  }
});

export default ErrorMessage;