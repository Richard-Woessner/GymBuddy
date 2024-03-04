import { Alert, Animated, Pressable, StyleSheet } from 'react-native';
import { useWorkouts } from '../../providers/workoutProvider';
import { Workout } from '../../services/workoutService';
import { Text, isLightMode } from '../Themed';

interface HomeWorkoutCard {
  buttonText: string;
  onPress: () => void;
  translateYStart: Animated.Value;
  workout: Workout;
}

export const HomeWorkoutCard = (props: HomeWorkoutCard) => {
  const { buttonText, onPress, translateYStart, workout } = props;
  const { deleteWorkout } = useWorkouts();

  const lightMode = isLightMode();

  const openStartPopup = () => {
    onPress();
    Animated.spring(translateYStart, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const deleteWorkoutAlert = () => {
    console.log('Delete workout');

    Alert.alert('Delete Workout', 'Are you sure you want to delete this workout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => removeDeletedWorkout() },
    ]);
  };

  const removeDeletedWorkout = async () => {
    if (await deleteWorkout(workout)) {
      console.log('Workout deleted');
    }
  };

  return (
    <Pressable
      style={lightMode ? styles.lightworkoutbuttonStyle : styles.darkworkoutbuttonStyle}
      onPress={openStartPopup}
      onLongPress={deleteWorkoutAlert}
    >
      {({ pressed }) => <Text style={{ height: 18 }}>{buttonText}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  lightworkoutbuttonStyle: {
    borderRadius: 10,
    padding: 30,
    marginTop: 5,
    borderWidth: 2,
    borderColor: 'black',
    width: '100%',
  },
  darkworkoutbuttonStyle: {
    borderRadius: 10,
    padding: 30,
    marginTop: 5,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default HomeWorkoutCard;
