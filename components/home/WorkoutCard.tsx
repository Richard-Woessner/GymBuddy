import { Animated, Pressable, StyleSheet } from 'react-native';
import { View, Text, isLightMode } from '../Themed';
import DrawerCard from '../DrawerCards';
import { router } from 'expo-router';
import { Workout } from '../../services/workoutService';
import Button from '@components/Button';

interface WorkoutCardProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  translateYStart: Animated.Value;
  workout: Workout;
}

const WorkoutCard = (props: WorkoutCardProps) => {
  const { open, setOpen, translateYStart, workout } = props;
  const lightMode = isLightMode();

  const redirectToWorkout = (workoutId: string) => {
    setOpen(false);
    router.push({ pathname: `/workout`, params: { id: workoutId } });
  };

  if (!workout) {
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

        {workout.Exersizes.map((exersize, i) => (
          <View style={styles.workoutRow} key={i}>
            <Text key={i + '1'}>{exersize.Exersize}</Text>
            <Text key={i + '2'}>{exersize.Sets.length} Sets</Text>
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
    border: '2px solid white',
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
    border: '2px solid black',
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

export default WorkoutCard;
