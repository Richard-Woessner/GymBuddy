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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'red',
    height: 100,
    padding: 10,
  },
});

export default HomeCard;
