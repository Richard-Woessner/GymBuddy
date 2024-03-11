import { Image, Pressable, StyleSheet, TextInput } from 'react-native';

import Button from '@components/Button';
import { Text, View } from '@components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { useAuth } from '../../providers/authProvider';

export default function Profile() {
  const authProvider = useAuth();
  const { user } = authProvider;
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);

  const openSignup = () => {
    console.log('openSignup');

    setOpen(true);
    router.push({ pathname: `/signup`, params: { id: 2 } });
  };

  useMemo(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{user?.email ?? ''}</Text>
        <Pressable
          onPress={() => {
            setEdit(!edit);
          }}
        >
          <Ionicons name="settings" size={32} color="green" />
        </Pressable>
      </View>

      <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: dummypicUrl }} />

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.userInfo}>
        {Object.entries(dummydata.info).map((info, i) => {
          const [key, value] = info;
          return (
            <View style={styles.userInfoRow} key={i}>
              <Key text={key} />
              <Stat text={value.toString()} edit={edit} />
            </View>
          );
        })}
      </View> */}

      <View style={styles.buttons}>
        {!user ? (
          <>
            <Button buttonText="Login" onPress={() => {}} />
            <Button
              buttonText="Signup"
              onPress={() => {
                openSignup();
              }}
            />
          </>
        ) : (
          <Button buttonText="Logout" onPress={() => authProvider.setUser(null)} />
        )}
      </View>
      <Ionicons name="logo-google" size={38} color="white" />
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
