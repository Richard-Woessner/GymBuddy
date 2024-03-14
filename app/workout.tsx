import Button from '@components/Button';
import { deepCopy, generateRandomString, hashObject } from '@helpers/func';

import { Log, LogExercise, getLogDate } from '@models/Logs';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import ExerciseCard from '../components/ExerciseCard';
import { Text, View } from '../components/Themed';
import { useAuth } from '../providers/authProvider';
import { useFireStore } from '../providers/fireStoreProvider';
import { Exercise, Workout } from '../services/workoutService';

/**
 * Represents the WorkoutPage component.
 * This component displays a workout and allows users to add exercises and post logs.
 * This is the card that allows the user to check off exercises and post the log.
 */
const WorkoutPage = () => {
  const firestoreProvider = useFireStore();
  const { user } = useAuth();

  const { workouts } = firestoreProvider;
  const { id } = useLocalSearchParams();

  const [tempWorkout, setTempWorkout] = useState<Workout | null>(null);

  const initData = async () => {
    const tempWorkout = deepCopy(workouts?.find((w) => w.Id === id));

    if (!tempWorkout) {
      return;
    }

    setTempWorkout({ ...tempWorkout });
  };

  const postLog = async () => {
    if (!tempWorkout || !tempWorkout?.Exercises) {
      return;
    }

    let tempSession: Log = {
      date: getLogDate(),
      exercises: [],
    };

    tempWorkout.Exercises.forEach((exercise) => {
      const tempExercise: LogExercise = {
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

    firestoreProvider.postLog(tempSession, user!).then(() => {
      alert('Log posted!');
      router?.push({ pathname: '/' });
    });
  };

  const addNewExercise = () => {
    if (!tempWorkout) {
      return;
    }

    const newWorkout = { ...tempWorkout };

    newWorkout.Exercises.push({
      Exercise: 'New Exercise',
      Sets: [{ SetNumber: 1, Reps: 1, Weight: 100 }],
      Type: 'Strength',
      NewExercise: true,
      Id: generateRandomString(),
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
      <Text style={styles.title}>{tempWorkout?.Name}</Text>

      {tempWorkout?.Exercises.map((e: Exercise) => (
        <ExerciseCard
          key={hashObject(e)}
          exercise={e}
          workout={tempWorkout}
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
