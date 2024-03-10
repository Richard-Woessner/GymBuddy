import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput, View } from '../components/Themed';
import { useAuth } from '../providers/authProvider';
import { useFireStore } from '../providers/fireStoreProvider';

const SignUpPage = () => {
  const authProvider = useAuth();
  const fireStoreProvider = useFireStore();

  const { id } = useLocalSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const initData = async () => {};

  const signUp = async () => {
    console.log('signUp');

    const user = await authProvider.createUser(email, password);

    await authProvider.setUser(user);

    if (user === null) {
      return;
    }

    await fireStoreProvider.createWorkout(user);

    router.push({ pathname: `/`, params: { data: JSON.stringify(user) } });
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.optionsContainer}>
        <Text style={styles.optionText}>Sign up with:</Text>
        <View style={styles.textInputs}>
          <TextInput onChangeText={(e) => setEmail(e)} style={styles.textInput} />
          <TextInput onChangeText={(e) => setPassword(e)} style={styles.textInput} />
          <TouchableOpacity style={styles.optionButton} onPress={signUp}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.optionText}>Or</Text>

        <TouchableOpacity style={styles.optionButton}>
          <Ionicons name="logo-google" size={38} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#0277FF',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
    margin: 5,
  },
  optionButtonText: {
    fontSize: 16,
  },
  textInput: {
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 7,
    height: 30,
  },
  textInputs: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginBottom: 20,
    gap: 12,
  },
});

export default SignUpPage;
