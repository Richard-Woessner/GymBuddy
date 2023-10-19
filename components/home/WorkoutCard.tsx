import { Animated, Pressable, StyleSheet } from 'react-native';
import { View, Text } from '../Themed';
import DrawerCard from '../DrawerCards';
import { useRef, useState } from 'react';
import { Link } from 'expo-router';
import { Workout } from '../../services/workoutService';

interface WorkoutCardProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  translateYStart: Animated.Value;
  workout: Workout;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { open, setOpen, translateYStart, workout } = props;

  if (!workout) {
    return null;
  }

  return (
    <DrawerCard
      translateYStart={translateYStart}
      openPopup={open}
      setOpenPopup={setOpen}
      animationType="fade"
      style={styles.workoutpopupContainer}
    >
      <>
        <Text>{workout.Name}</Text>
        <Link href="/workout">
          <Pressable onPress={() => console.log('pressed')}>
            <Text style={styles.buttonStyle}>Start</Text>
          </Pressable>
        </Link>

        {workout.Exersizes.map((exersize, i) => (
          <View style={styles.workoutRow}>
            <Text key={i}>{exersize.Exersize}</Text>
            <Text key={i}>{exersize.Sets.length} Sets</Text>
          </View>
        ))}
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
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default WorkoutCard;
