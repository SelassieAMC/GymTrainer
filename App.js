import React from 'react';
import { StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from "./views/Login";
import UserTabs from "./navigation/UserTabs";

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle('light-content', true);

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Login}
          screenOptions={{
            animation: 'flip',
            gestureEnabled: true,
            headerShown: false
          }}>
          <Stack.Screen name='Login' component={Login}/>
          <Stack.Screen name='UserTabs' component={UserTabs}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
