import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import Card from '../../components/home/HomeCard';
import { FlatList } from 'react-native-gesture-handler';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.scrollArea}>
        <Card />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  scrollArea: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
});
