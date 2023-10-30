import { Animated, StyleSheet } from 'react-native';

import { Text, View, isLightMode } from '../../components/Themed';
import { useRef, useState, useEffect } from 'react';
import Button from '../../components/home/HomeButton';
import WorkoutCard from '../../components/home/WorkoutCard';
import StartWorkoutButton from '../../components/home/StartWorkoutButton';
import { useWorkouts } from '../../providers/workoutProvider';
import Loading from '@components/Loading';

export default function TabOneScreen() {
  const workoutsProvider = useWorkouts();
  const { workouts, isLoading } = workoutsProvider;
  const lightMode = isLightMode();

  const [startWorkoutDrawerOpen, setstartWorkoutDrawerOpen] = useState(false);
  const [workoutCardOpen, setWorkoutCardOpen] = useState(false);

  const translateYStart = useRef(new Animated.Value(300)).current;
  const translateYWorkout = useRef(new Animated.Value(300)).current;

  const [workout, setWorkout] = useState<number | null>(null);

  const initData = async () => {
    workoutsProvider.getWorkouts();
  };

  const colorStyles = {
    backgroundColor: isLightMode() ? 'white' : 'black',
    borderColor: !isLightMode() ? 'white' : 'black',
  };

  useEffect(() => {
    initData();
  }, []);

  if (isLoading || !workouts) {
    return <Loading />;
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

      <View style={styles.cards}>
        {workouts.map((workout, i) => (
          <Button
            key={i}
            buttonStyle={lightMode ? styles.lightworkoutbuttonStyle : styles.darkworkoutbuttonStyle}
            buttonText={workout.Name}
            onPress={() => {
              setWorkoutCardOpen(!workoutCardOpen);
              setWorkout(i);
            }}
            translateYStart={translateYWorkout}
          />
        ))}
      </View>

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

  lightworkoutbuttonStyle: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    padding: 30,
    marginTop: 50,
    borderWidth: 2,
    borderColor: 'black',
    width: 'auto',
  },
  darkworkoutbuttonStyle: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    padding: 30,
    marginTop: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  workoutpopupContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    width: '80%',
    maxHeight: '60%',
    minHeight: '60%',
    borderRadius: 15,
    border: '2px solid white',
    padding: 20,
    alignItems: 'center',
  },
  cards: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 10,
  },
});
