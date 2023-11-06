import ExersizeCard from '../components/ExerciseCard';
import { View, Text } from '../components/Themed';
import { Button, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const Workout = () => {

  return (
    <View style={styles.container}>
      <Text>Workout</Text>
      <ExersizeCard exersizeName="Test" sets={2} />

      <ExersizeCard exersizeName="Bench" sets={2} />

      <ExersizeCard exersizeName="Deadlift" sets={2} />

      <Button title="Add Exersize" onPress={() => { }} />
    </View>
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    // borderColor: Colors.dark.tint,
    // borderWidth: 1,
  },
});

export default Workout;
