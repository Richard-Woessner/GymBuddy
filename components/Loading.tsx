import { ActivityIndicator, StyleSheet } from 'react-native';
import { View, Text } from './Themed';

interface LoadingProps {}

const Loading = (props: LoadingProps) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 20 },
  loading: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
