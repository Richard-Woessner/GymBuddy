import { Animated, Pressable, StyleSheet } from 'react-native';
import { Text, isLightMode } from '../Themed';

interface HomeWorkoutCard {
  buttonText: string;
  onPress: () => void;
  translateYStart: Animated.Value;
}

export const HomeWorkoutCard = (props: HomeWorkoutCard) => {
  const { buttonText, onPress, translateYStart } = props;
  const lightMode = isLightMode();

  const openStartPopup = () => {
    onPress();
    Animated.spring(translateYStart, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable
      style={lightMode ? styles.lightworkoutbuttonStyle : styles.darkworkoutbuttonStyle}
      onPress={openStartPopup}
    >
      {({ pressed }) => <Text style={{ height: 18 }}>{buttonText}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  lightworkoutbuttonStyle: {
    borderRadius: 10,
    padding: 30,
    marginTop: 5,
    borderWidth: 2,
    borderColor: 'black',
    width: '100%',
  },
  darkworkoutbuttonStyle: {
    borderRadius: 10,
    padding: 30,
    marginTop: 5,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default HomeWorkoutCard;
