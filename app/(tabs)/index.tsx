import {
  Animated,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Text, View } from '../../components/Themed';
import { useRef, useState, useEffect } from 'react';
import Button from '../../components/Button';
import DrawerCard from '../../components/DrawerCards';
import { Link } from 'expo-router';
import WorkoutCard from '../../components/home/WorkoutCard';
import StartWorkoutButton from '../../components/home/StartWorkoutButton';
import { userService } from '../../services/usersService';
import { Workout, workoutService } from '../../services/workoutService';
import { useWorkouts } from '../../providers/workoutProvider';

export default function TabOneScreen() {
  const workoutsProvider = useWorkouts();
  const { workouts } = workoutsProvider;

  const [startWorkoutDrawerOpen, setstartWorkoutDrawerOpen] = useState(false);
  const [workoutCardOpen, setWorkoutCardOpen] = useState(false);

  const translateYStart = useRef(new Animated.Value(300)).current;
  const translateYWorkout = useRef(new Animated.Value(300)).current;

  const [workout, setWorkout] = useState<number | null>(null);

  const initData = async () => {
    workoutsProvider.getWorkouts();
    console.log(workouts);
  };

  useEffect(() => {
    initData();
  }, []);

  if (!workouts) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Button
        buttonStyle={styles.buttonStyle}
        buttonText="Start a workout"
        onPress={() => setstartWorkoutDrawerOpen(!startWorkoutDrawerOpen)}
        translateYStart={translateYStart}
      />

      {workouts.map((workout, i) => (
        <Button
          key={i}
          buttonStyle={styles.workoutbuttonStyle}
          buttonText={workout.Name}
          onPress={() => {
            setWorkoutCardOpen(!workoutCardOpen);
            setWorkout(i);
          }}
          translateYStart={translateYWorkout}
        />
      ))}

      <StartWorkoutButton
        open={startWorkoutDrawerOpen}
        setOpen={setstartWorkoutDrawerOpen}
        translateYStart={translateYStart}
      />

      <WorkoutCard
        open={workoutCardOpen}
        setOpen={setWorkoutCardOpen}
        translateYStart={translateYWorkout}
        workout={workouts[workout || 0]}
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
