import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import HomeCard from '../../components/home/HomeCard';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
        {[...Array(50)].map((_, i) => {
          return <HomeCard key={i} />;
        })}
      </ScrollView>
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
  scrollView: {
    flexGrow: 1,
    width: '100%',
    // flexDirection: 'column',
    gap: 20,
  },
});
