import { Animated, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { View, Text } from './Themed';

interface ButtonProps {
  buttonStyle: StyleProp<ViewStyle>;
  buttonText: string;
  onPress: () => void;
  translateYStart: Animated.Value;
}

export const Button = (props: ButtonProps) => {
  const { buttonStyle, buttonText, onPress, translateYStart } = props;

  const openStartPopup = () => {
    console.log('openStartPopup');

    onPress();
    Animated.spring(translateYStart, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Pressable style={buttonStyle} onPress={openStartPopup}>
      {({ pressed }) => (
        <Text
          style={{
            color: 'white',
          }}
        >
          {buttonText}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20 },
});

export default Button;
