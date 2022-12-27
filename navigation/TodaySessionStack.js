import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodaySession from "../views/TodaySession";
import DarkStyles from "../components/common/DarkStyles";

const Stack = createStackNavigator();

export default function TodaySessionStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'flip',
                gestureEnabled: true,
                headerShown: false
            }}>
            <Stack.Screen
                name="TodaySession"
                component={TodaySession}
            />
        </Stack.Navigator>
    );
}