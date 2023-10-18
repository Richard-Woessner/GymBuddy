import {
  Animated,
  Modal,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Text, View } from '../../components/Themed';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import HomeCard from '../../components/home/HomeCard';
import { useRef, useState } from 'react';
import Button from '../../components/Button';
import DrawerCard from '../../components/DrawerCards';
import { Link } from 'expo-router';

export default function TabOneScreen() {
  const [isStartPopupVisible, setStartPopupVisible] = useState(false);
  const [isWorkoutPopupVisible, setWorkoutPopupVisible] = useState(false);

  const translateYStart = useRef(new Animated.Value(300)).current;
  const translateYWorkout = useRef(new Animated.Value(300)).current;

  const openStartPopup = () => {
    setStartPopupVisible(true);
    Animated.spring(translateYStart, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const openWorkoutPopup = () => {
    setWorkoutPopupVisible(true);
    Animated.spring(translateYWorkout, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  const closeWorkoutPopup = () => {
    Animated.spring(translateYWorkout, {
      toValue: 300,
      useNativeDriver: false,
    }).start(() => setWorkoutPopupVisible(false));
  };

  const onPanResponderReleaseWorkout = (e: any, gestureState: PanResponderGestureState) => {
    if (gestureState.dy > 50) {
      Animated.timing(translateYWorkout, {
        toValue: 300,
        duration: 100,
        useNativeDriver: false,
      }).start(() => closeWorkoutPopup());
    } else {
      Animated.spring(translateYWorkout, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  const panResponderWorkout = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: translateYWorkout }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: onPanResponderReleaseWorkout,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Button
        buttonStyle={styles.buttonStyle}
        buttonText="Start a workout"
        onPress={() => setStartPopupVisible(!isStartPopupVisible)}
        translateYStart={translateYStart}
      />
      <Button
        buttonStyle={styles.workoutbuttonStyle}
        buttonText="Create a workout"
        onPress={() => {
          setWorkoutPopupVisible(!isWorkoutPopupVisible);
        }}
        translateYStart={translateYWorkout}
      />

      {/* <HomeCard /> */}

      <DrawerCard
        translateYStart={translateYStart}
        openPopup={isStartPopupVisible}
        setOpenPopup={setStartPopupVisible}
        animationType="slide"
        style={styles.popupContainer}
      >
        <>
          <Text>Start Popup Content</Text>
          {/* TODO REPLACE WITH CLOSESTARTPOPUP */}
          <Pressable style={styles.buttonStyle} onPress={() => setStartPopupVisible(false)}>
            <Text>Close Popup</Text>
          </Pressable>
        </>
      </DrawerCard>

      <DrawerCard
        translateYStart={translateYWorkout}
        openPopup={isWorkoutPopupVisible}
        setOpenPopup={setWorkoutPopupVisible}
        animationType="fade"
        style={styles.workoutpopupContainer}
      >
        <>
          <Text>Workout Popup Content</Text>
          <Link href="/workout">
            <Pressable onPress={() => console.log('pressed')}>
              <Text style={styles.buttonStyle}>Edit</Text>
            </Pressable>
          </Link>
        </>
      </DrawerCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
    // flexDirection: 'column',
    gap: 20,
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: '#0077FF',
    padding: 15,
    margin: 5,
    alignItems: 'center',
  },
  popupContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    border: '2px solid white',
    borderBottomColor: 'black',
    padding: 20,
    alignItems: 'center',
    marginTop: 70,
  },
  workoutbuttonStyle: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    padding: 30,
    marginLeft: 20,
    marginRight: 250,
    marginTop: 50,
    borderWidth: 2,
    borderColor: '#0077FF',
    color: 'white',
  },
  workoutpopupContainer: {
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
});
