import Button from '@components/Button';
import { Text, TextInput } from '@components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { generateRandomString } from '@helpers/func';
import { Exercise, Set, Workout } from '@models/Workout';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useAuth } from '../providers/authProvider';
import { useFireStore } from '../providers/fireStoreProvider';

const CreateWorkoutPage = () => {
  const authProvider = useAuth();
  const fireStoreProvider = useFireStore();
  const [workout, setWorkout] = useState<Workout>({
    Name: '',
    Id: generateRandomString(16),
    Exercises: [],
  });

  const addExercise = () => {
    const newExercise: Exercise = {
      Id: generateRandomString(16),
      Exercise: '',
      Sets: [],
      Type: '',
    };
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      Exercises: [...prevWorkout.Exercises, newExercise],
    }));
  };

  const addSet = (exerciseIndex: number) => {
    const newSet: Set = {
      SetNumber: workout.Exercises[exerciseIndex].Sets.length + 1,
      Reps: 0,
      Weight: 0,
    };
    setWorkout((prevWorkout) => {
      const updatedExercises = [...prevWorkout.Exercises];
      updatedExercises[exerciseIndex].Sets.push(newSet);
      return {
        ...prevWorkout,
        Exercises: updatedExercises,
      };
    });
  };

  const removeLastSet = (exerciseIndex: number) => {
    setWorkout((prevWorkout) => {
      const updatedExercises = [...prevWorkout.Exercises];
      updatedExercises[exerciseIndex].Sets.pop();
      return {
        ...prevWorkout,
        Exercises: updatedExercises,
      };
    });
  };

  const handleExerciseChange = (exerciseIndex: number, exercise: Exercise) => {
    setWorkout((prevWorkout) => {
      const updatedExercises = [...prevWorkout.Exercises];
      updatedExercises[exerciseIndex] = exercise;
      return {
        ...prevWorkout,
        Exercises: updatedExercises,
      };
    });
  };

  const handleSetChange = (exerciseIndex: number, setIndex: number, set: Set) => {
    setWorkout((prevWorkout) => {
      const updatedExercises = [...prevWorkout.Exercises];
      updatedExercises[exerciseIndex].Sets[setIndex] = set;
      return {
        ...prevWorkout,
        Exercises: updatedExercises,
      };
    });
  };

  const handleSubmit = () => {
    // Handle submitting the workout data
    console.log(workout);
  };

  const initData = async () => {};

  useEffect(() => {
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Create Workout</Text>
      <View style={styles.exersizeContainerHeader}>
        <Text style={styles.headerText}>Workout Name:</Text>
        <TextInput
          value={workout.Name}
          placeholder="Workout Name"
          onChangeText={(text) => setWorkout({ ...workout, Name: text })}
          style={styles.textInput}
        />
      </View>
      <Text></Text>
      <Button buttonText="Add Exercise" onPress={addExercise} />
      {workout.Exercises.map((exercise, exerciseIndex) => (
        <View key={exerciseIndex} style={styles.exersizeContainer}>
          <View style={styles.exersizeContainerHeader}>
            <Text style={styles.headerText}>Exersize Name:</Text>
            <TextInput
              value={exercise.Exercise}
              placeholder="Exersize Name"
              onChangeText={(text) =>
                handleExerciseChange(exerciseIndex, { ...exercise, Exercise: text })
              }
              style={styles.textInput}
            />
          </View>
          <View style={styles.exersizeContainerBody}>
            <View style={styles.addSetBtn}>
              <Pressable onPress={() => addSet(exerciseIndex)}>
                <Ionicons name="add-circle" size={35} color="white" />
              </Pressable>

              <Pressable onPress={() => removeLastSet(exerciseIndex)}>
                <Ionicons name="remove-circle" size={35} color="white" />
              </Pressable>
            </View>
            {exercise.Sets.length > 0 && (
              <View style={styles.setsContainer}>
                <View>
                  <Text style={styles.setsHeader}>Reps</Text>
                  {exercise.Sets.map((set, setIndex) => (
                    <TextInput
                      value={set.Reps.toString()}
                      onChangeText={(text) =>
                        handleSetChange(exerciseIndex, setIndex, { ...set, Reps: parseInt(text) })
                      }
                      style={styles.textInput}
                    />
                  ))}
                </View>
                <View>
                  <Text style={styles.setsHeader}>Weight</Text>
                  {exercise.Sets.map((set, setIndex) => (
                    <TextInput
                      value={set.Weight.toString()}
                      onChangeText={(text) =>
                        handleSetChange(exerciseIndex, setIndex, { ...set, Weight: parseInt(text) })
                      }
                      style={styles.textInput}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      ))}

      <View style={styles.footer}>
        <Button buttonText="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  exersizeContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
  },
  exersizeContainerHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 50,
    gap: 20,
  },
  exersizeContainerBody: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    minWidth: 50,
    textAlign: 'center',
  },
  setsContainer: {
    width: '50%',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sets: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addSetBtn: {
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  setsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',

    paddingBottom: 50,
  },
});

export default CreateWorkoutPage;
