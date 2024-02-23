import Button from '@components/Button';
import { deepCopy } from '@helpers/func';
import { router } from 'expo-router';
import { Animated, StyleSheet } from 'react-native';
import { useWorkouts } from '../../providers/workoutProvider';
import DrawerCard from '../DrawerCards';
import { Text, View, isLightMode } from '../Themed';

interface StartWorkoutCardProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  translateYStart: Animated.Value;
  workoutIndex: number | null;
}

const StartWorkoutCard = (props: StartWorkoutCardProps) => {
  const workoutsProvider = useWorkouts();
  const { workouts } = workoutsProvider;
  const { open, setOpen, translateYStart, workoutIndex } = props;

  const lightMode = isLightMode();

  const workout = deepCopy(workouts![workoutIndex! ?? 0]);

  const redirectToWorkout = (workoutId: string) => {
    setOpen(false);
    router.push({ pathname: `/workout`, params: { id: workoutId } });
  };

  if (!workout || !open) {
    return null;
  }

  return (
    <DrawerCard
      translateYStart={translateYStart}
      openPopup={open}
      setOpenPopup={setOpen}
      animationType="fade"
      style={lightMode ? styles.lightWorkoutpopupContainer : styles.darkWorkoutpopupContainer}
    >
      <>
        <Text>{workout.Name}</Text>
        <Button buttonText="Start" onPress={() => redirectToWorkout(workout.Id)} />

        {workout.Exercises.map((exercise, i) => (
          <View style={styles.workoutRow} key={i}>
            <Text key={i + '1'}>{exercise.Exercise}</Text>
            <Text key={i + '2'}>{exercise.Sets.length} Sets</Text>
          </View>
        ))}
      </>
    </DrawerCard>
  );
};

const styles = StyleSheet.create({
  darkWorkoutpopupContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    width: '80%',
    maxHeight: '60%',
    minHeight: '60%',
    backgroundColor: 'black',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    padding: 20,
    alignItems: 'center',
  },
  lightWorkoutpopupContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    width: '80%',
    maxHeight: '60%',
    minHeight: '60%',
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: '#0077FF',
    padding: 15,
    margin: 5,
    alignItems: 'center',
  },
  workoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export default StartWorkoutCard;
