import { StyleSheet } from 'react-native';

import Button from '@components/Button';
import Loading from '@components/Loading';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, TextInput, View } from '../../components/Themed';
import { useAuth } from '../../providers/authProvider';
import { useFireStore } from '../../providers/fireStoreProvider';

export default function Profile() {
  const authProvider = useAuth();
  const { user } = authProvider;
  const fire = useFireStore();
  const _FILE = 'profile.tsx';

  const isFocused = useIsFocused();

  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [trainerCode, setTrainerCode] = useState('');

  useEffect(() => {
    console.log();
    fire.getTrainer(user!);
  }, [isFocused]);

  if (!user || !fire.trainer) {
    <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trainer</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {fire.trainer == null ? (
        <>
          <Text>Enter a Trainer Code</Text>

          <TextInput
            style={styles.textInputContainer}
            placeholder="#3h39fg"
            onChangeText={(e) => setTrainerCode(e)}
          />

          <Button
            buttonText={'Find a trainer now'}
            onPress={() => {
              fire.setUsersTrainer(user!, trainerCode);
            }}
          />
        </>
      ) : (
        <Text>{fire.trainer.name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  textInputContainer: {
    width: '45%',
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 10,
  },
});
