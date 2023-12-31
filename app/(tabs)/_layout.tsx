import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import ProfileScreen from './profile';
import { Ionicons } from '@expo/vector-icons';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={32} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          title: 'profile title',
          tabBarIcon: ({ color }) => <TabBarIcon name="person-outline" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="logs"
        options={{
          title: 'logs title',
          tabBarIcon: ({ color }) => <TabBarIcon name="book-outline" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen //THIS IS JUST FOR FLAVOR, ANY TSX FILE IN TABS WILL CREATE A TAB
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
          headerShown: false,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color={Colors[colorScheme ?? 'light'].text}
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="trainer"
        options={{
          title: 'trainer',
          tabBarIcon: ({ color }) => <TabBarIcon name="person-add-outline" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'messages',
          tabBarIcon: ({ color }) => <TabBarIcon name="chatbubbles-outline" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
