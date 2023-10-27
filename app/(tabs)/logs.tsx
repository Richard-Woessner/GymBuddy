import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { View, Text, isLightMode } from '../../components/Themed';
import { useLogs } from '../../providers/logsProvider';
import { useIsFocused } from '@react-navigation/native';

const Logs = () => {
  const { logs, getLogs, isLoading } = useLogs();
  const isFocused = useIsFocused();

  const initData = async () => {
    await getLogs();
  };

  const backgroundColor = {
    borderColor: !isLightMode() ? 'white' : 'black',
  };

  useEffect(() => {
    initData();
  }, [isFocused]);

  if (logs === null || logs === undefined) {
    return;
  }

  if (!isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      {logs.map((log, i) => (
        <View key={i} style={{ ...styles.card, ...backgroundColor }}>
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
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
