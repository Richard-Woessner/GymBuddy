import { User } from 'firebase/auth';
import { Alert, Animated, Pressable, StyleSheet } from 'react-native';
import { useFireStore } from '../../providers/fireStoreProvider';
import { Workout } from '../../services/workoutService';
import { Text, isLightMode } from '../Themed';

interface HomeWorkoutCard {
  user: User;
  buttonText: string;
  onPress: () => void;
  translateYStart: Animated.Value;
  workout: Workout;
}

export const HomeWorkoutCard = (props: HomeWorkoutCard) => {
  const { buttonText, onPress, translateYStart, workout, user } = props;
  const { deleteWorkout } = useFireStore();

  const lightMode = isLightMode();

  const openStartPopup = () => {
    onPress();
    Animated.spring(translateYStart, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const deleteWorkoutAlert = (workout: Workout) => {
    console.log('Delete workout');

    Alert.alert('Delete Workout', 'Are you sure you want to delete this workout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => removeDeletedWorkout(workout) },
    ]);
  };

  const removeDeletedWorkout = async (workout: Workout) => {
    if (await deleteWorkout(workout, user)) {
      console.log('Workout deleted');
    }
  };

  return (
    <Pressable
      style={lightMode ? styles.lightworkoutbuttonStyle : styles.darkworkoutbuttonStyle}
      onPress={openStartPopup}
      onLongPress={() => deleteWorkoutAlert(workout)}
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
