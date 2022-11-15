import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../components/dashboard/Dashboard';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import TodayTraining from '../components/today/TodayTraining';
import Exercises from '../components/exercises/Exercises';
import AddExercise from "../components/admin/exercises/AddExercise";
import DarkStyles from '../components/common/DarkStyles';

const Tab = createBottomTabNavigator();

export default function HomeTabs()
{
    return (
        <Tab.Navigator>
          <Tab.Screen 
          name="Home" 
          component={Dashboard}
          options={{
            tabBarStyle: DarkStyles.darkTabStyle,
            headerShown: false,
            tabBarIcon: () => 
            (<FontAwesome name="home" color={'orange'} size={30} solid/>) 
            }}/>
          <Tab.Screen 
          name="Today"
          component={TodayTraining}
          options={{
            tabBarStyle: DarkStyles.darkTabStyle,
            headerShown: false,
            tabBarIcon: () => 
            (<FontAwesome name="calendar-day" color={'orange'} size={30} solid/>)  
            }}/>
          <Tab.Screen 
          name="Exercises"
          component={Exercises}
          options={{
            tabBarStyle: DarkStyles.darkTabStyle,
            headerShown: false,
            tabBarIcon: () => (<FontAwesome name="dumbbell" color={'orange'} size={30} solid/>) 
          }}/>
          <Tab.Screen
            name="Create Exercise"
            component={AddExercise}
            options={{
              tabBarStyle: DarkStyles.darkTabStyle,
              headerShown: false,
              tabBarIcon: () => (<FontAwesome name="plus" color={'orange'} size={30} solid/>)
          }}/>
        </Tab.Navigator>
      );
}
