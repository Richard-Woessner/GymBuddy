import { Image, Pressable, StyleSheet, TextInput } from 'react-native';

import Button from '@components/Button';
import { Text, View } from '@components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { logWithFileName as LOG } from '@helpers/consoleLogTools';
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/authProvider';

export default function Profile() {
  const authProvider = useAuth();
  const _FILE = 'profile.tsx';

  const { user } = authProvider;
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const isFocused = useIsFocused();

  const openSignup = () => {
    LOG(_FILE, 'openSignup');

    setOpen(true);
    router.push({ pathname: `/signup`, params: { id: 2 } });
  };

  const openLogin = () => {
    LOG(_FILE, 'openLogin');

    setOpen(true);
    router.push({ pathname: `/login`, params: { id: 2 } });
  };

  useEffect(() => {
    if (!isFocused) return;

    if (user) {
      LOG(_FILE, user);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{user?.displayName ?? user?.email ?? ''}</Text>
        <Pressable
          onPress={() => {
            setEdit(!edit);
          }}
        >
          <Ionicons name="settings" size={32} color="green" />
        </Pressable>
      </View>

      <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: dummypicUrl }} />

      <View style={styles.buttons}>
        {!user ? (
          <>
            <Button
              buttonText="Login"
              onPress={() => {
                openLogin();
              }}
            />
            <Button
              buttonText="Signup"
              onPress={() => {
                openSignup();
              }}
            />
            <Ionicons name="logo-google" size={38} color="white" />
          </>
        ) : (
          <Button buttonText="Logout" onPress={() => authProvider.logOff()} />
        )}
      </View>
    </View>
  );
}

const Key = (props: { text: string }) => {
  const { text } = props;
  return <Text style={styles.key}>{text}</Text>;
};

const Stat = (props: { text: string; edit: boolean }) => {
  const { text, edit } = props;
  if (edit) {
    return <TextInput style={{ color: 'white' }} defaultValue={text} />;
  }

  return <Text style={styles.stat}>{text}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 50,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingHorizontal: 50,
    width: '100%',
  },
  button: {},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  userInfo: {
    width: '80%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
  },
  userInfoRow: {
    flexDirection: 'row',
    fontSize: 16,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingVertical: 10,
  },
  key: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stat: {
    fontSize: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

const dummypicUrl =
  'https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png';

const dummydata = {
  name: 'John Doe',
  info: { age: 34, gender: 'male', height: 175, weight: 80 },
  workout_history: [
    {
      date: '2023-10-09',
      exercise: 'Bench press',
      sets: [
        {
          reps: 10,
          weight: 135,
        },
        {
          reps: 8,
          weight: 155,
        },
        {
          reps: 6,
          weight: 175,
        },
      ],
    },
    {
      date: '2023-10-07',
      exercise: 'Squats',
      sets: [
        {
          reps: 12,
          weight: 135,
        },
        {
          reps: 10,
          weight: 155,
        },
        {
          reps: 8,
          weight: 175,
        },
      ],
    },
  ],
};
