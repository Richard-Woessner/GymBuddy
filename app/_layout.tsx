import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '../providers/authProvider';
import { FireStoreProvider } from '../providers/fireStoreProvider';
import { LogsProvider } from '../providers/logsProvider';
import { WorkoutsProvider } from '../providers/workoutProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  // Use the device color scheme to set the theme context.
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <FireStoreProvider>
        <LogsProvider>
          <WorkoutsProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
                <Stack.Screen
                  name="workout"
                  options={{ presentation: 'modal', headerShown: true, headerTitle: 'Workout' }}
                />
                <Stack.Screen
                  name="signup"
                  options={{ presentation: 'modal', headerShown: false, headerTitle: 'signup' }}
                />
              </Stack>
            </ThemeProvider>
          </WorkoutsProvider>
        </LogsProvider>
      </FireStoreProvider>
    </AuthProvider>
  );
}
