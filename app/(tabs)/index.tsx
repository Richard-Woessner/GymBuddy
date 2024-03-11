import { Animated, FlatList, SafeAreaView, StyleSheet } from 'react-native';

import Loading from '@components/Loading';
import StartWorkoutCard from '@components/home/StartWorkoutCard';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';
import { User } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { Text, View } from '../../components/Themed';
import { HomeWorkoutCard } from '../../components/home/HomeWorkoutCard';
import StartWorkoutButton from '../../components/home/StartWorkoutButton';
import { hashObject } from '../../helpers/func';
import { useAuth } from '../../providers/authProvider';
import { useFireStore } from '../../providers/fireStoreProvider';

export default function TabOneScreen() {
  const fireStoreProverder = useFireStore();
  const { isLoading, workouts } = fireStoreProverder;

  const authProvider = useAuth();
  const { data } = useLocalSearchParams();
  const { user, setUser, getAuth } = authProvider;

  const isFocused = useIsFocused();

  const [startWorkoutDrawerOpen, setstartWorkoutDrawerOpen] = useState(false);
  const [workoutCardOpen, setWorkoutCardOpen] = useState(false);

  const translateYStart = useRef(new Animated.Value(300)).current;
  const translateYWorkout = useRef(new Animated.Value(300)).current;

  const [workoutIndex, setWorkoutIndex] = useState<number | null>(null);
  const [tempUser, setTempUser] = useState<User | null>(null);

  const initData = async () => {
    let u = null;

    if (!user) {
      console.log('no user');
      u = await getAuth();
    } else {
      u = user;
    }
    setTempUser(u);

    if (!u) {
      return;
    }

    if (!workouts) {
      await fireStoreProverder.getWorkouts(u);
    }
  };

  useEffect(() => {
    console.log('home useEffect');

    if (data) {
      const u = JSON.parse(data as string);
      setTempUser(u);
    }

    initData();
  }, [isFocused, user, data]);

  if (isLoading || !workouts || !tempUser) {
    return <Loading />;
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>

        {workouts.length === 0 && <Text>No workouts found</Text>}

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
                user={tempUser}
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

        {workouts.length > 0 && (
          <StartWorkoutCard
            open={workoutCardOpen}
            setOpen={setWorkoutCardOpen}
            translateYStart={translateYWorkout}
            workoutIndex={workoutIndex}
          />
        )}
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
