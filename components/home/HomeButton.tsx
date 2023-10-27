import { Animated, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { View, Text } from '../Themed';

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
      {({ pressed }) => <Text>{buttonText}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20 },
});

export default HomeButton;
