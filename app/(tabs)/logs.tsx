import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { View, Text, isLightMode } from '../../components/Themed';
import { useLogs } from '../../providers/logsProvider';
import { useIsFocused } from '@react-navigation/native';
import Loading from '@components/Loading';
import { CompletedWorkout } from '@models/CompletedWorkout';
import { hashObject } from '../../helpers/func';

const Logs = () => {
  const { logs, getLogs, isLoading } = useLogs();
  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);

  const initData = async () => {
    await getLogs();
  };

  const backgroundColor = {
    borderColor: !isLightMode() ? 'white' : 'black',
  };

  const onRefresh = React.useCallback(async () => {
    console.log('refreshing');
    setRefreshing(true);
    await initData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    initData();
  }, []);

  const LogView = (props: { log: CompletedWorkout }) => {
    const { log } = props;
    const key = hashObject(log);

    return (
      <View key={key} style={{ ...styles.card, ...backgroundColor }}>
        {log.exersizes.map((exercise, i) => (
          <View key={i}>
            <Text style={styles.cardTitle}>{exercise.exersizeName}</Text>
            <Text>{`Sets: ${exercise.sets.length || '-'}`}</Text>
            <Text>{`Reps: ${exercise.totalReps || '-'}`}</Text>
            <Text>{`Total Weight: ${exercise.totalWeight || '-'}`}</Text>
          </View>
        ))}
        <Text style={styles.date}>{new Date(log.date).toLocaleDateString()}</Text>
      </View>
    );
  };

  if (logs === null || logs === undefined) {
    return;
  }

  if (isLoading || refreshing) {
    return <Loading />;
  }

  return (
    <FlatList
      style={styles.container}
      data={logs}
      renderItem={({ item }) => <LogView log={item} />}
      keyExtractor={(item) => hashObject(item).toString()}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 20 },
  card: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    alignSelf: 'flex-end',
    fontStyle: 'italic',
  },
});

export default Logs;
