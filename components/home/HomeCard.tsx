import { Link } from 'expo-router';
import { View, Text } from '../Themed';
import { Pressable, StyleSheet } from 'react-native';

interface CardProps {}

const HomeCard = (props: CardProps) => {
  return (
    <View style={styles.card}>
      <Link href="/workout">
        <Pressable onPress={() => console.log('pressed')}>
          <Text>Workout</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'red',
    height: 100,
    padding: 10,
    marginBottom: 2,
  },
});

export default HomeCard;
