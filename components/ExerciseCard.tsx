import Colors from '../constants/Colors';
import { View, Text, TextInput } from './Themed';
import { StyleSheet } from 'react-native';

interface ExersizeCardProps {
  exersizeName: string;
  sets: number;
}

const ExersizeCard = (props: ExersizeCardProps) => {
  const { exersizeName, sets } = props;

  return (
    <View style={styles.container}>
      <Text>{exersizeName}</Text>

      <View style={styles.exersizeInfo}>
        <View style={styles.reps}>
          <Text>Reps</Text>
          <Text>Weight</Text>
        </View>

        {Array.from(Array(sets)).map((_, i) => {
          return <Reps key={i} />;
        })}
      </View>
    </View>
  );
};

const Reps = () => {
  return (
    <View style={styles.reps}>
      <TextInput style={{ borderWidth: 1, width: 30 }} />
      <TextInput style={{ borderWidth: 1, width: 30 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.dark.tint,
  },
  exersizeInfo: {
    padding: 10,
  },
  reps: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
    paddingBottom: 2,
  },
});

export default ExersizeCard;
