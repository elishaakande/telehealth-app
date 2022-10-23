import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions} from 'react-native';


export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-outline');
  
    const handlePasswordVisibility = () => {
      if (rightIcon === 'eye-outline') {
        setRightIcon('eye-off-outline');
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-off') {
        setRightIcon('eye-outline');
        setPasswordVisibility(!passwordVisibility);
      }
    };
  
    return {
      passwordVisibility,
      rightIcon,
      handlePasswordVisibility
    };
  };