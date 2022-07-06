import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeTabs from './navigation/HomeTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer >
        <Stack.Navigator 
          screenOptions={{
            gestureEnabled: true,
            headerStyle: { backgroundColor: '#003c5d'},
            headerTitleStyle: { fontWeight: 'bold' },
            headerTintColor: '#fff'
          }}>
          <Stack.Screen name='Dashboard' component={HomeTabs}/>
          {/* <Stack.Screen name='TodayExercise' component={Exercises}/>
          <Stack.Screen name='Routine' component={Routine}/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
