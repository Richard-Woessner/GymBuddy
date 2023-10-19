import { Animated, Pressable, StyleSheet } from 'react-native';
import { View, Text } from '../Themed';
import DrawerCard from '../DrawerCards';
import { useRef, useState } from 'react';
import { Link } from 'expo-router';

interface WorkoutCardProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  translateYStart: Animated.Value;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { open, setOpen, translateYStart } = props;

  return (
    <DrawerCard
      translateYStart={translateYStart}
      openPopup={open}
      setOpenPopup={setOpen}
      animationType="fade"
      style={styles.workoutpopupContainer}
    >
      <>
        <Text>Workout Popup Content</Text>
        <Link href="/workout">
          <Pressable onPress={() => console.log('pressed')}>
            <Text style={styles.buttonStyle}>Edit</Text>
          </Pressable>
        </Link>
      </>
    </DrawerCard>
  );
};

const styles = StyleSheet.create({
  workoutpopupContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    width: '80%',
    maxHeight: '60%',
    minHeight: '60%',
    backgroundColor: 'black',
    borderRadius: 15,
    border: '2px solid white',
    padding: 20,
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: '#0077FF',
    padding: 15,
    margin: 5,
    alignItems: 'center',
  },
});

export default WorkoutCard;
