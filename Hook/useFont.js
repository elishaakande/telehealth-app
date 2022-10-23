import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    Monstserrat_Bold: require('../assets/fonts/Montserrat-Bold.ttf'),
    Monstserrat_SemiBold: require('../assets/fonts/Montserrat-SemiBold.ttf'),
    Monstserrat_Medium: require('../assets/fonts/Montserrat-Medium.ttf'),
    Monstserrat_Regular: require('../assets/fonts/Montserrat-Regular.ttf'),
    Monstserrat_Light: require('../assets/fonts/Montserrat-Medium.ttf'),
    Monstserrat_Thin: require('../assets/fonts/Montserrat-Thin.ttf'),
    Lobster_Regular: require('../assets/fonts/Lobster-Regular.ttf'),
  });