import ExersizeCard from '../components/ExerciseCard';
import { View, Text } from '../components/Themed';
import { StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useWorkouts } from '../providers/workoutProvider';
import { useEffect, useState } from 'react';
import { useLogs } from '../providers/logsProvider';
import { Workout } from '../services/workoutService';
import { CompletedWorkout, Exersize as SessionExersize } from '@models/CompletedWorkout';
import Button from '@components/Button';

const WorkoutPage = () => {
  const workoutsProvider = useWorkouts();
  const logsProvider = useLogs();
  const { workouts } = workoutsProvider;
  const { id } = useLocalSearchParams();

  const [workout, setWorkout] = useState<Workout | null>(null);

  const initData = async () => {
    const tempWorkout = workouts?.find((w) => w.Id === id);

    if (!tempWorkout) {
      return;
    }

    setWorkout(tempWorkout);

    const checkboxes = workoutsToFormState(workout!);
  };

  const postLog = async () => {
    if (!workout || !workout?.Exersizes) {
      alert('No workout selected');
      return;
    }

    let tempSession: CompletedWorkout = {
      date: new Date(),
      exersizes: [],
    };

    workout.Exersizes.forEach((exersize) => {
      const tempExersize: SessionExersize = {
        exersizeName: exersize.Exersize,
        sets: [],
        totalReps: 0,
        totalWeight: 0,
      };

      exersize.Sets.forEach((set) => {
        tempExersize.sets.push({
          setNumber: set.SetNumber,
          reps: set.Reps,
          weight: set.Weight,
          completed: set.Completed || false,
        });

        tempExersize.totalReps += set.Reps;
        tempExersize.totalWeight += set.Weight;
      });

      tempSession.exersizes.push(tempExersize);
    });

    logsProvider.postLog(tempSession).then(() => {
      alert('Log posted!');
      router?.push({ pathname: '/' });
    });
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout?.Name}</Text>

      {workout?.Exersizes.map((e, i) => (
        <ExersizeCard
          exersizeName={e.Exersize}
          sets={e.Sets}
          workout={workout}
          setWorkout={setWorkout}
        />
      ))}

      <Button buttonText="Post Exersize" onPress={() => postLog()} />
    </View>
  );
};

const workoutsToFormState = (workout: Workout) => {
  const checkboxes: ExersizeCheckBox[] = [];

  workout?.Exersizes.forEach((exersize) => {
    const woName = exersize.Exersize;
    exersize.Sets.forEach((set, i) => {
      checkboxes.push({
        exersize: woName,
        setNumber: i + 1,
        checked: false,
      });
    });
  });

  return checkboxes;
};

export interface ExersizeCheckBox {
  exersize: string;
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
