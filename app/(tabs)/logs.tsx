import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text,  } from '../../components/Themed';

//Hard coded workouts. Will be deleted 
const workouts = [
  { id: 1, exercise: 'Push-ups', sets: 3, reps: 15 },
  { id: 2, exercise: 'Squats', sets: 3, reps: 12 },
  { id: 3, exercise: 'Jog', sets: 1, duration: '15 minutes' },
];

const Logs = () => {
  return (
    <ScrollView>
      {workouts.map((workout) => (
        <View key={workout.id} style={styles.card}>
          <Text style={styles.cardTitle}>{workout.exercise}</Text>
          <Text>{`Sets: ${workout.sets || '-'}`}</Text>
          <Text>{`Reps: ${workout.reps || '-'}`}</Text>
          <Text>{`Duration: ${workout.duration || '-'}`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Logs;
