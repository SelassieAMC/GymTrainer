import React from 'react';
import DarkStyles from '../components/common/DarkStyles';
import Home from "../views/Home";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function HomeStack()
{
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'flip',
                gestureEnabled: true,
                headerShown: false
            }}
        >
            <Stack.Screen 
              name="HomePage" 
              component={Home}
              options={{
                tabBarStyle: DarkStyles.darkTabStyle,
                headerShown: false}}/>
        </Stack.Navigator>
      );
}
