import ExersizeCard from '../components/ExerciseCard';
import { View, Text } from '../components/Themed';
import { Button, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useWorkouts } from '../providers/workoutProvider';
import { useEffect, useState } from 'react';
import { useLogs } from '../providers/logsProvider';

const Workout = () => {
  const workoutsProvider = useWorkouts();
  const logsProvider = useLogs();
  const { workouts } = workoutsProvider;
  const { id } = useLocalSearchParams();

  const [cb, setCb] = useState<ExersizeCheckBox[]>([]);

  const workout = workouts?.find((workout) => workout.Id === id);

  const initData = async () => {
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

    console.log(checkboxes);

    setCb(checkboxes);
  };

  const postLog = async () => {
    const tempLog = workout?.Exersizes.map((exersize) => {
      return {
        exersize: exersize.Exersize,
        sets: exersize.Sets.map((set, i) => {
          if (
            cb.find((cb) => cb.exersize === exersize.Exersize && cb.setNumber === set.SetNumber)
              ?.checked === true
          ) {
            return {
              setNumber: i + 1,
              reps: set.Reps,
              weight: set.Weight,
            };
          }
        }).filter((set) => set),
      };
    }).filter((exersize) => exersize.sets.length > 0);

    logsProvider.postLog(tempLog).then(() => {
      alert('Log posted!');
      router.back();
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

export default Workout;
