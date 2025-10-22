//不要
// import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Login from './src/screens/Login';
import MemoEdit from './src/screens/MemoEdit';
import MemoList from './src/screens/MemoList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name='MemoEdit' component={MemoEdit} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} /> */}

        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />

        <Stack.Screen
          name='MemoList'
          component={MemoList}
          options={{
            title: 'メモ一覧',
            headerBackVisible: false,
            gestureEnabled: false,
            headerRight: () => <MaterialCommunityIcons name='logout' size={24} color='#5dacbd' />,
          }}
        />

        <Stack.Screen name='MemoEdit' component={MemoEdit} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//不要
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
