import React from 'react';
import {StatusBar} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeTabs from './navigation/HomeTabs';

const Stack = createNativeStackNavigator();

StatusBar.setBarStyle('light-content', true);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animation: 'flip',
            gestureEnabled: true,
            headerShown: false
          }}
          >
          <Stack.Screen name='Training' component={HomeTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
