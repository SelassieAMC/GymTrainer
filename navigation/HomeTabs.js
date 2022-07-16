import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import Dashboard from '../components/dashboard/Dashboard';
import Settings from '../components/common/Settings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TodayTraining from '../components/today/TodayTraining';

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
            (<FontAwesome name="calendar-check-o" color={'orange'} size={30} solid/>)  
            }}/>
          <Tab.Screen 
          name="Routine" 
          component={Settings} 
          options={{ 
            headerShown: true, 
            headerStyle: { backgroundColor: '#003c5d'}, 
            headerTitleStyle: { fontWeight: 'bold' }, 
            headerTintColor: '#fff',
            tabBarIcon: () => (<FontAwesome name="list" color={'orange'} size={30} solid/>) 
          }}/>
        </Tab.Navigator>
      );
}