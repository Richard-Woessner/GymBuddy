import Button from '@components/Button';
import { CompletedWorkout, Exercise, Exercise as SessionExercise } from '@models/CompletedWorkout';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import ExerciseCard from '../components/ExerciseCard';
import { Text, View } from '../components/Themed';
import { hashObject } from '../helpers/func';
import { useLogs } from '../providers/logsProvider';
import { useWorkouts } from '../providers/workoutProvider';
import { Workout } from '../services/workoutService';

/**
 * Represents the WorkoutPage component.
 * This component displays a workout and allows users to add exercises and post logs.
 * This is the card that allows the user to check off exercises and post the log.
 */
const WorkoutPage = () => {
  const workoutsProvider = useWorkouts();
  const logsProvider = useLogs();
  const { workouts } = workoutsProvider;
  const { id } = useLocalSearchParams();

  const [workout, setTempWorkout] = useState<Workout | null>(null);

  const initData = async () => {
    const tempWorkout = workouts?.find((w) => w.Id === id);

    if (!tempWorkout) {
      return;
    }

    setTempWorkout(tempWorkout);
  };

  const postLog = async () => {
    if (!workout || !workout?.Exercises) {
      alert('No workout selected');
      return;
    }

    let tempSession: CompletedWorkout = {
      date: new Date(),
      exercises: [],
    };

    workout.Exercises.forEach((exercise) => {
      const tempExercise: SessionExercise = {
        exerciseName: exercise.Exercise,
        sets: [],
        totalReps: 0,
        totalWeight: 0,
      };

      exercise.Sets.forEach((set) => {
        tempExercise.sets.push({
          setNumber: set.SetNumber,
          reps: set.Reps,
          weight: set.Weight,
          completed: set.Completed || false,
        });

        tempExercise.totalReps += set.Reps;
        tempExercise.totalWeight += set.Weight;
      });

      tempSession.exercises.push(tempExercise);
    });

    logsProvider.postLog(tempSession).then(() => {
      alert('Log posted!');
      router?.push({ pathname: '/' });
    });
  };

  const addNewExercise = () => {
    if (!workout) {
      return;
    }

    const newWorkout = { ...workout };

    newWorkout.Exercises.push({
      Exercise: 'New Exercise',
      Sets: [{ SetNumber: 1, Reps: 1, Weight: 100 }],
      Type: 'Strength',
      NewExercise: true,
      Id: 'asdfasdf',
    });

    setTempWorkout(newWorkout);

    Alert.alert(
      'New Exercise Added',
      "You can now edit the exercise's name and sets. Long press to add a set, double press to remove the set."
    );
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout?.Name}</Text>

      {workout?.Exercises.map((e: Exercise) => (
        <ExerciseCard
          key={hashObject(e)}
          exercise={e}
          workout={workout}
          setWorkout={setTempWorkout}
        />
      ))}

      <Button buttonText="Add Exercise" onPress={() => addNewExercise()} />
      <Button buttonText="Post Exercise" onPress={() => postLog()} />
    </View>
  );
};

export interface ExerciseCheckBox {
  exercise: string;
  setNumber: number;
  checked: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default WorkoutPage;
