import Colors from '../constants/Colors';
import Checkbox from 'expo-checkbox';
import { View, Text, TextInput } from './Themed';
import { StyleSheet } from 'react-native';
import { Set } from '../services/workoutService';
import { ExersizeCheckBox } from '../app/workout';

interface ExersizeCardProps {
  exersizeName: string;
  sets: Set[];
  checkBoxes: ExersizeCheckBox[];
  setCheckBoxes: (value: ExersizeCheckBox[]) => void;
}

const ExersizeCard = (props: ExersizeCardProps) => {
  const { exersizeName, sets, checkBoxes, setCheckBoxes } = props;

  return (
    <View style={styles.container}>
      <Text>{exersizeName}</Text>

      <View style={styles.exersizeInfo}>
        <View style={styles.reps}>
          <Text>Reps</Text>
          <Text>Weight</Text>
        </View>

        {sets.map((set, i) => {
          return (
            <Reps
              key={i}
              set={set}
              exersizeName={exersizeName}
              checkBoxes={checkBoxes}
              setCheckBoxes={setCheckBoxes}
            />
          );
        })}
      </View>
    </View>
  );
};

const Reps = (props: {
  set: Set;
  exersizeName: string;
  checkBoxes: ExersizeCheckBox[];
  setCheckBoxes: (value: ExersizeCheckBox[]) => void;
}) => {
  const { set, exersizeName, checkBoxes, setCheckBoxes } = props;

  const cb = checkBoxes.find(
    (cb) => cb.exersize === exersizeName && cb.setNumber === set.SetNumber
  );

  const toggleBox = (cb: ExersizeCheckBox) => {
    const temp = [...checkBoxes];

    temp.find((c) => c.exersize === cb.exersize && c.setNumber === cb.setNumber)!.checked =
      !cb.checked;

    setCheckBoxes(temp);
  };

  return (
    <View style={styles.reps}>
      <TextInput value={set.Reps.toString()} style={styles.inputStyle} />
      <TextInput value={set.Weight.toString()} style={styles.inputStyle} />
      <Checkbox value={cb?.checked} onChange={() => toggleBox(cb!)} />
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
  inputStyle: { textAlign: 'center', borderWidth: 1, width: 30 },
});

export default ExersizeCard;
