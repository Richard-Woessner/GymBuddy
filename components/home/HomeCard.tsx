import { Link } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, PanResponder, Animated, PanResponderGestureState} from 'react-native';

const HomeCard: React.FC = () => {
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

  const closeStartPopup = () => {
    Animated.spring(translateYStart, {
      toValue: 300,
      useNativeDriver: false,
    }).start(() => setStartPopupVisible(false));
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

  const onPanResponderReleaseStart = (e: any, gestureState: PanResponderGestureState) => {
    if (gestureState.dy > 50) {
      Animated.timing(translateYStart, {
        toValue: 300,
        duration: 100,
        useNativeDriver: false,
      }).start(() => closeStartPopup());
    } else {
      Animated.spring(translateYStart, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
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

  const panResponderStart = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([null, { dy: translateYStart }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: onPanResponderReleaseStart, 
  });

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
      <Pressable style={styles.buttonStyle} onPress={openStartPopup}>
        {({ pressed }) => (
          <Text style={styles.buttonText}> Start A Workout </Text>
        )}
      </Pressable>

      <Pressable style={styles.workoutbuttonStyle} onPress={openWorkoutPopup}>
        {({ pressed }) => (
          <Text style={styles.buttonText}> Workout </Text>
        )}
      </Pressable>

      <Modal
        visible={isStartPopupVisible}
        animationType='slide'
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.popupContainer, { transform: [{ translateY: translateYStart }] }]}
            {...panResponderStart.panHandlers}
          >
            <Text>Start Popup Content</Text>
            <Pressable style={styles.buttonStyle} onPress={closeStartPopup}>
              <Text style={styles.buttonText}>Close Popup</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>

      <Modal
        visible={isWorkoutPopupVisible}
        animationType='fade'
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.workoutpopupContainer, { transform: [{ translateY: translateYWorkout }] }]}
            {...panResponderWorkout.panHandlers}
          >
            <Text>Workout Popup Content</Text>
            <Link href="/workout">
              <Pressable onPress={() => console.log('pressed')}>
                <Text style={styles.buttonStyle}>Edit</Text>
              </Pressable>
            </Link>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: '#0077FF',
    padding: 15,
    margin: 5,
    alignItems: 'center',
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
    margin: 200,
    backgroundColor: 'black',
    borderRadius: 15,
    border: '2px solid white',
    padding: 20,
    alignItems: 'center',
    
  },
  buttonText: {
    color: 'white',
  },
});

export default HomeCard;