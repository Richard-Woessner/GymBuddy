import { Animated, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import Loading from '@components/Loading';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Text, View } from '../../components/Themed';
import { HomeWorkoutCard } from '../../components/home/HomeWorkoutCard';
import StartWorkoutButton from '../../components/home/StartWorkoutButton';
import StartWorkoutCard from '../../components/home/StartWorkoutCard';
import { hashObject } from '../../helpers/func';
import { useWorkouts } from '../../providers/workoutProvider';

export default function TabOneScreen() {
  const workoutsProvider = useWorkouts();
  const { workouts, isLoading } = workoutsProvider;

  const isFocused = useIsFocused();

  const [startWorkoutDrawerOpen, setstartWorkoutDrawerOpen] = useState(false);
  const [workoutCardOpen, setWorkoutCardOpen] = useState(false);

  const translateYStart = useRef(new Animated.Value(300)).current;
  const translateYWorkout = useRef(new Animated.Value(300)).current;

  const [workoutIndex, setWorkoutIndex] = useState<number | null>(null);

  const initData = async () => {
    workoutsProvider.getWorkouts();
  };

  useEffect(() => {
    if (workoutsProvider.workouts === null) {
      console.log('workoutsProvider.workouts is null, calling initData on Index');
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

        <FlatList
          style={{ width: '100%', height: '100%' }}
          data={workouts}
          renderItem={({ item }) => {
            const wo = item;
            const i = workouts.indexOf(wo);

            if (wo.Display === false) {
              return null;
            }

            return (
              <HomeWorkoutCard
                key={i}
                workout={wo}
                buttonText={wo.Name}
                onPress={() => {
                  console.log('Pressed workout', wo.Name);
                  setWorkoutCardOpen(!workoutCardOpen);
                  setWorkoutIndex(i);
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

        <StartWorkoutCard
          open={workoutCardOpen}
          setOpen={setWorkoutCardOpen}
          translateYStart={translateYWorkout}
          workoutIndex={workoutIndex}
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
