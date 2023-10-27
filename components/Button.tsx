import { Pressable, StyleSheet } from 'react-native';
import { View, Text, isLightMode } from './Themed';

export interface ButtonProps {
  buttonText: string;
  onPress: () => void;
}

const Button = (props: ButtonProps) => {
  const { buttonText, onPress } = props;

  return (
    <Pressable onPress={onPress} style={styles.lightButton}>
      {({ pressed }) => <Text style={styles.text}>{buttonText}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20 },
  lightButton: {
    backgroundColor: '#0277FF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  text: {
    fontSize: 16,
  },
});

export default Button;
