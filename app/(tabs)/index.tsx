import { Animated, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { Text, View, isLightMode } from '../../components/Themed';
import { useRef, useState, useEffect } from 'react';
import Button, { HomeWorkoutCard } from '../../components/home/HomeWorkoutCard';
import WorkoutCard from '../../components/home/WorkoutCard';
import StartWorkoutButton from '../../components/home/StartWorkoutButton';
import { useWorkouts } from '../../providers/workoutProvider';
import Loading from '@components/Loading';
import { useIsFocused } from '@react-navigation/native';
import { hashObject } from '../../helpers/func';

export default function TabOneScreen() {
  const workoutsProvider = useWorkouts();
  const { workouts, isLoading } = workoutsProvider;

  const isFocused = useIsFocused();

  const [startWorkoutDrawerOpen, setstartWorkoutDrawerOpen] = useState(false);
  const [workoutCardOpen, setWorkoutCardOpen] = useState(false);

  const translateYStart = useRef(new Animated.Value(300)).current;
  const translateYWorkout = useRef(new Animated.Value(300)).current;

  const [workout, setWorkout] = useState<number | null>(null);

  const initData = async () => {
    workoutsProvider.getWorkouts();
  };

  useEffect(() => {
    if (workoutsProvider.workouts === null) {
      initData();
    }
  }, [isFocused]);

  if (isLoading || !workouts) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>

        {/* <Button
          buttonStyle={styles.buttonStyle}
          buttonText="Start a workout"
          onPress={() => setstartWorkoutDrawerOpen(!startWorkoutDrawerOpen)}
          translateYStart={translateYStart}
        /> */}

        {/* <View style={styles.cards}>
          {workouts.map((workout, i) => (
            <HomeWorkoutCard
              key={i}
              buttonText={workout.Name}
              onPress={() => {
                setWorkoutCardOpen(!workoutCardOpen);
                setWorkout(i);
              }}
              translateYStart={translateYWorkout}
            />
          ))}
        </View> */}

        {/* Create a scrollable flatlist with HomeWorkoutCard */}

        <FlatList
          style={{ width: '100%', height: '100%' }}
          data={workouts}
          renderItem={({ item }) => {
            const wo = item;
            const i = workouts.indexOf(wo);

            console.log('workout', wo.Name, i);

            return (
              <HomeWorkoutCard
                key={i}
                buttonText={wo.Name}
                onPress={() => {
                  setWorkoutCardOpen(!workoutCardOpen);
                  setWorkout(i);
                }}
                translateYStart={translateYWorkout}
              />
            );
          }}
          keyExtractor={(item) => hashObject(item).toString()}
        />

        <StartWorkoutButton
          open={startWorkoutDrawerOpen}
          setOpen={setstartWorkoutDrawerOpen}
          translateYStart={translateYStart}
        />

        <WorkoutCard
          open={workoutCardOpen}
          setOpen={setWorkoutCardOpen}
          translateYStart={translateYWorkout}
          workout={workouts[workout || 0]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
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
    justifyContent: 'center',
    height: 'auto',
  },
  workoutpopupContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    width: '80%',
    maxHeight: '60%',
    minHeight: '60%',
    borderRadius: 15,
    border: '2px solid white',
    padding: 20,
    alignItems: 'center',
  },
  cards: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 10,
  },
});
