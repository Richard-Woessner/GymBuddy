import { Animated, Pressable, StyleSheet } from 'react-native';
import { View, Text } from '../Themed';
import DrawerCard from '../DrawerCards';

interface StartWorkoutButtonProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  translateYStart: Animated.Value;
}

const StartWorkoutButton = (props: StartWorkoutButtonProps) => {
  const { open, setOpen, translateYStart } = props;
  return (
    <DrawerCard
      translateYStart={translateYStart}
      openPopup={open}
      setOpenPopup={setOpen}
      animationType="slide"
      style={styles.popupContainer}
    >
      <>
        <Text>Start Popup Content</Text>
        <Pressable style={styles.buttonStyle} onPress={() => setOpen(false)}>
          <Text>Close Popup</Text>
        </Pressable>
      </>
    </DrawerCard>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    border: '2px solid white',
    borderBottomColor: 'black',
    padding: 20,
    alignItems: 'center',
    marginTop: 70,
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: '#0077FF',
    padding: 15,
    margin: 5,
    alignItems: 'center',
  },
});

export default StartWorkoutButton;
