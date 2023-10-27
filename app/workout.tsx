import ExersizeCard from '../components/ExerciseCard';
import { View, Text } from '../components/Themed';
import { Button, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useWorkouts } from '../providers/workoutProvider';
import { useEffect, useState } from 'react';
import { useLogs } from '../providers/logsProvider';
import { Workout } from '../services/workoutService';
import { CompletedWorkout, Exersize as SessionExersize } from '@models/CompletedWorkout';

const WorkoutPage = () => {
  const workoutsProvider = useWorkouts();
  const logsProvider = useLogs();
  const { workouts } = workoutsProvider;
  const { id } = useLocalSearchParams();

  const [cb, setCb] = useState<ExersizeCheckBox[]>([]);

  const workout = workouts?.find((workout) => workout.Id === id);

  const initData = async () => {
    const checkboxes = workoutsToFormState(workout!);

    setCb(checkboxes);
  };

  const postLog = async () => {
    let tempSession: CompletedWorkout = {
      date: new Date(),
      exersizes: [],
    };

    workout?.Exersizes.forEach((exersize) => {
      const sessionExersize: SessionExersize = {
        exersizeName: exersize.Exersize,
        sets: [],
        totalReps: 0,
        totalWeight: 0,
      };

      let totalReps = 0;
      let totalWeight = 0;

      exersize.Sets.forEach((set, i) => {
        if (cb.find((c) => c.exersize === exersize.Exersize && c.setNumber === i + 1)?.checked) {
          totalReps += set.Reps;
          totalWeight += set.Weight;

          sessionExersize.sets.push({
            reps: set.Reps,
            weight: set.Weight,
            setNumber: i + 1,
          });
        }
      });

      sessionExersize.totalReps = totalReps;
      sessionExersize.totalWeight = totalWeight;

      tempSession.exersizes.push(sessionExersize);
    });

    logsProvider.postLog(tempSession).then(() => {
      alert('Log posted!');
      router?.back();
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
          checkBoxes={cb}
          setCheckBoxes={setCb}
        />
      ))}

      <Button title="Post Exersize" onPress={() => postLog()} />
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
