import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AddExercise from "../components/admin/exercises/AddExercise";

const Tab = createBottomTabNavigator();

export default function AdminTabs()
{
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Create Exercise"
                component={AddExercise}
                options={{
                    headerShown: true,
                    headerStyle: { backgroundColor: '#003c5d'},
                    headerTitleStyle: { fontWeight: 'bold' },
                    headerTintColor: '#fff',
                    tabBarIcon: () =>
                        (<FontAwesome name="plus" color={'orange'} size={30} solid/>)
                }}/>
        </Tab.Navigator>
    );
}