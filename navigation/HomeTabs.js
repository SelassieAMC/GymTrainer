import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../components/dashboard/Dashboard';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import TodayTraining from '../components/today/TodayTraining';
import Exercises from '../components/exercises/Exercises';

const Tab = createBottomTabNavigator();

export default function HomeTabs()
{
    return (
        <Tab.Navigator>
          <Tab.Screen 
          name="Home" 
          component={Dashboard} 
          options={{ 
            headerShown: true, 
            headerStyle: { backgroundColor: '#003c5d'}, 
            headerTitleStyle: { fontWeight: 'bold' }, 
            headerTintColor: '#fff', 
            tabBarIcon: () => 
            (<FontAwesome name="home" color={'orange'} size={30} solid/>) 
            }}/>
          <Tab.Screen 
          name="Today" 
          component={TodayTraining} 
          options={{ 
            headerShown: true, 
            headerStyle: { backgroundColor: '#003c5d'}, 
            headerTitleStyle: { fontWeight: 'bold' }, 
            headerTintColor: '#fff', 
            tabBarIcon: () => 
            (<FontAwesome name="calendar-day" color={'orange'} size={30} solid/>)  
            }}/>
          <Tab.Screen 
          name="Exercises"
          component={Exercises}
          options={{
            headerShown: true, 
            headerStyle: { backgroundColor: '#003c5d'}, 
            headerTitleStyle: { fontWeight: 'bold' }, 
            headerTintColor: '#fff',
            tabBarIcon: () => (<FontAwesome name="dumbbell" color={'orange'} size={30} solid/>) 
          }}/>
        </Tab.Navigator>
      );
}