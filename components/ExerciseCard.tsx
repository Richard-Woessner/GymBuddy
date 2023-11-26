import Colors from '../constants/Colors';
import Checkbox from 'expo-checkbox';
import { View, Text, TextInput } from './Themed';
import { StyleSheet } from 'react-native';
import { Set, Workout } from '../services/workoutService';
import { ExersizeCheckBox } from '../app/workout';

interface ExersizeCardProps {
  exersizeName: string;
  sets: Set[];
  workout: Workout;
  setWorkout: (value: Workout) => void;
}

const ExersizeCard = (props: ExersizeCardProps) => {
  const { exersizeName, sets, workout, setWorkout } = props;

  return (
    <View style={styles.container}>
      <Text>{exersizeName}</Text>

      <View style={styles.exersizeInfo}>
        <View style={styles.reps}>
          <Text>Reps</Text>
          <Text>Weight</Text>
          <Text>Completed</Text>
        </View>

        {sets.map((set, i) => {
          return (
            <Reps
              key={i}
              set={set}
              exersizeName={exersizeName}
              sets={sets}
              workout={workout}
              setWorkout={setWorkout}
            />
          );
        })}
      </View>
    </View>
  );
};

const Reps = (props: {
  set: Set;
  exersizeName: string;
  sets: Set[];
  workout: Workout;
  setWorkout: (value: Workout) => void;
}) => {
  const { set, exersizeName, sets, workout, setWorkout } = props;

  const toggleBox = (set: Set) => {
    const tempWorkout = { ...workout };
    const tempExersize = tempWorkout.Exersizes.find((e) => e.Exersize === exersizeName);

    if (!tempExersize) {
      return;
    }

    const tempSet = tempExersize.Sets.find((s) => s === set);

    if (!tempSet) {
      return;
    }

    tempSet.Completed = !tempSet.Completed;

    setWorkout(tempWorkout);
  };

  return (
    <View style={styles.reps}>
      <TextInput value={set.Reps.toString()} style={styles.inputStyle} />
      <TextInput value={set.Weight.toString()} style={styles.inputStyle} />
      <Checkbox value={set.Completed} onValueChange={() => toggleBox(set)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  exersizeInfo: {
    padding: 10,
  },
  reps: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
    paddingBottom: 2,
  },
  inputStyle: { textAlign: 'center', borderWidth: 1, width: 30 },
});

export default ExersizeCard;
