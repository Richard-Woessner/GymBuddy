import { Animated, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Text, View } from '../Themed';

interface HomeButtonProps {
  buttonStyle: StyleProp<ViewStyle>;
  buttonText: string;
  onPress: () => void;
  translateYStart: Animated.Value;
}

export const HomeButton = (props: HomeButtonProps) => {
  const { buttonStyle, buttonText, onPress, translateYStart } = props;

  const openStartPopup = () => {
    onPress();
    Animated.spring(translateYStart, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable style={buttonStyle} onPress={openStartPopup}>
      {({ pressed }) => <Text style={{ height: 18 }}>{buttonText}</Text>}
    </Pressable>
  );
};

export default HomeButton;
