import Loading from '@components/Loading';
import { Log } from '@models/Logs';
import { useIsFocused } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { Text, View, isLightMode } from '../../components/Themed';
import { hashObject } from '../../helpers/func';
import { useAuth } from '../../providers/authProvider';
import { useFireStore } from '../../providers/fireStoreProvider';

const Logs = () => {
  const { logs, getLogs, isLoading } = useFireStore();
  const authProvider = useAuth();
  const { user, getAuth } = authProvider;
  const isFocused = useIsFocused();

  const [refreshing, setRefreshing] = useState(false);

  const initData = async () => {
    console.log(user);

    if (!user) {
      return;
    }

    await getLogs(user!);

    console.log('logs', logs);
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
  }, [isFocused]);

  useEffect(() => {
    console.log('logs', logs);
  }, [logs]);

  const LogView = (props: { log: Log }) => {
    const { log } = props;
    const key = hashObject(log);

    return (
      <SafeAreaView>
        <View key={key} style={{ ...styles.card, ...backgroundColor }}>
          {log.exercises &&
            log.exercises.map((exercise, i) => (
              <View key={i}>
                <Text style={styles.cardTitle}>{exercise.exerciseName}</Text>
                <Text>{`Sets: ${exercise.sets.length || '-'}`}</Text>
                <Text>{`Reps: ${exercise.totalReps || '-'}`}</Text>
                <Text>{`Total Weight: ${exercise.totalWeight || '-'}`}</Text>
              </View>
            ))}
          <Text style={styles.date}>{dayjs(log.date.nanoseconds).format('MMM-DD hh:mm a')}</Text>
        </View>
      </SafeAreaView>
    );
  };

  if (logs === null || logs === undefined) {
    return;
  }

  if (isLoading || !user) {
    return <Loading />;
  }

  if (logs.length === 0) {
    return <Text>No logs found</Text>;
  }

  return (
    <FlatList
      style={styles.container}
      data={logs.sort((a, b) => (a.date.nanoseconds > b.date.nanoseconds ? -1 : 1))}
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
