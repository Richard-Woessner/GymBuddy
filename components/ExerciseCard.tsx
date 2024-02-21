import Colors from '../constants/Colors';
import Checkbox from 'expo-checkbox';
import { View, Text, TextInput } from './Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Exercise, Set, Workout } from '../services/workoutService';

interface ExerciseCardProps {
  exercise: Exercise;
  workout: Workout;
  setWorkout: (value: Workout) => void;
}

const ExerciseCard = (props: ExerciseCardProps) => {
  const { exercise, workout, setWorkout } = props;
  const { Exercise, Sets, NewExercise } = exercise;

  const setExercise = (exercise: Exercise) => {
    const tempWorkout = { ...workout };
    const tempExercise = tempWorkout.Exercises.find((e) => e.Id === exercise.Id);

    if (tempExercise) {
      tempWorkout.Exercises.splice(tempWorkout.Exercises.indexOf(tempExercise), 1);
    }

    tempWorkout.Exercises.push(exercise);

    setWorkout(tempWorkout);
  };

  const handleNameChange = (e: string) => {
    setExercise({ ...exercise, Exercise: e });
  };

  let timer: NodeJS.Timeout | null = null;

  const handleClick = () => {
    if (timer !== null) {
      //add a triple click

      clearTimeout(timer);
      timer = null;
      handleDoubleClick();
    } else {
      timer = setTimeout(() => {
        timer = null;
      }, 300);
    }
  };

  const handleDoubleClick = () => {
    // Add a new set to the exercise
    const tempWorkout = { ...workout };
    const tempExercise = tempWorkout.Exercises.find((e) => e.Exercise === Exercise);
    //remove the last set
    tempExercise?.Sets.pop();

    setWorkout(tempWorkout);
  };

  const handleLongPress = () => {
    // Add a new set to the exercise
    const tempWorkout = { ...workout };
    const tempExercise = tempWorkout.Exercises.find((e) => e.Exercise === Exercise);
    tempExercise?.Sets.push({
      Reps: 0,
      Weight: 0,
      Completed: false,
      SetNumber: tempExercise.Sets.length + 1,
    });

    setWorkout(tempWorkout);
  };

  if (NewExercise) {
    return (
      <TouchableOpacity
        onLongPress={handleLongPress}
        onPress={handleClick}
        style={styles.container}
      >
        <TextInput
          onEndEditing={(e: any) => {
            handleNameChange(e.nativeEvent.text);
          }}
        >
          {Exercise}
        </TextInput>

        <View style={styles.exerciseInfo}>
          <View style={styles.reps}>
            <Text>Reps</Text>
            <Text>Weight</Text>
            <Text>Completed</Text>
          </View>

          {exercise.Sets.map((set, i) => {
            return (
              <Reps
                key={i}
                set={set}
                exerciseName={Exercise}
                sets={Sets}
                workout={workout}
                setWorkout={setWorkout}
              />
            );
          })}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{Exercise}</Text>

      <View style={styles.exerciseInfo}>
        <View style={styles.reps}>
          <Text>Reps</Text>
          <Text>Weight</Text>
          <Text>Completed</Text>
        </View>

        {exercise.Sets.map((set, i) => {
          return (
            <Reps
              key={i}
              set={set}
              exerciseName={Exercise}
              sets={Sets}
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
  exerciseName: string;
  sets: Set[];
  workout: Workout;
  setWorkout: (value: Workout) => void;
}) => {
  const { set, exerciseName, sets, workout, setWorkout } = props;

  const toggleBox = (set: Set) => {
    const tempWorkout = { ...workout };
    const tempExercise = tempWorkout.Exercises.find((e) => e.Exercise === exerciseName);

    if (!tempExercise) {
      return;
    }

    const tempSet = tempExercise.Sets.find((s) => s === set);

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
    paddingHorizontal: 4,
  },
  exerciseInfo: {
    padding: 10,
  },
  reps: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
    paddingBottom: 4,
  },
  inputStyle: { textAlign: 'center', borderWidth: 1, width: 30 },
});

export default ExerciseCard;
