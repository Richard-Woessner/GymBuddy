import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Text, View } from '../../components/Themed';
import { useRef, useState } from 'react';
import Button from '../../components/Button';
import DrawerCard from '../../components/DrawerCards';
import { Link } from 'expo-router';
import WorkoutCard from '../../components/home/WorkoutCard';
import StartWorkoutButton from '../../components/home/StartWorkoutButton';

export default function TabOneScreen() {
  const [startWorkoutDrawerOpen, setstartWorkoutDrawerOpen] = useState(false);
  const [workoutCardOpen, setWorkoutCardOpen] = useState(false);

  const translateYStart = useRef(new Animated.Value(300)).current;
  const translateYWorkout = useRef(new Animated.Value(300)).current;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Button
        buttonStyle={styles.buttonStyle}
        buttonText="Start a workout"
        onPress={() => setstartWorkoutDrawerOpen(!startWorkoutDrawerOpen)}
        translateYStart={translateYStart}
      />
      <Button
        buttonStyle={styles.workoutbuttonStyle}
        buttonText="Create a workout"
        onPress={() => {
          setWorkoutCardOpen(!workoutCardOpen);
        }}
        translateYStart={translateYWorkout}
      />

      <StartWorkoutButton
        open={startWorkoutDrawerOpen}
        setOpen={setstartWorkoutDrawerOpen}
        translateYStart={translateYStart}
      />

      <WorkoutCard
        open={workoutCardOpen}
        setOpen={setWorkoutCardOpen}
        translateYStart={translateYWorkout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
    // flexDirection: 'column',
    gap: 20,
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: '#0077FF',
    padding: 15,
    margin: 5,
    alignItems: 'center',
  },

  workoutbuttonStyle: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    padding: 30,
    marginLeft: 20,
    marginRight: 250,
    marginTop: 50,
    borderWidth: 2,
    borderColor: '#0077FF',
    color: 'white',
  },
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
});
