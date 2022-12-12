import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TodaySession from "../views/TodaySession";
import ExerciseInProgress from "../components/exercises/ExerciseInProgress";
import DarkStyles from "../components/common/DarkStyles";

const Stack = createStackNavigator();

export default function TodaySessionStack() {
    return (
        <Stack.Navigator
            initialRouteName="TodaySession"
            screenOptions={{
                headerStyle: { backgroundColor: '#42f44b' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}>
            <Stack.Screen
                name="TodaySession"
                component={TodaySession}
                options={{
                    tabBarStyle: DarkStyles.darkTabStyle,
                    headerShown: false}}
            />
            <Stack.Screen
                name="ExerciseInProgress"
                component={ExerciseInProgress}
                options={{
                    tabBarStyle: DarkStyles.darkTabStyle,
                    headerShown: false}}
            />
        </Stack.Navigator>
    );
}