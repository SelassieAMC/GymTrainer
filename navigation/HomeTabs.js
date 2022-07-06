import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../components/dashboard/Dashboard';
import Settings from '../components/common/Settings';
import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function HomeTabs()
{
    return (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Dashboard} options={{ headerShown: false, tabBarIcon: ({color}) => (<MaterialCommunityIcons name="home" color={color} size={26} />) }}/>
          <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
          <Tab.Screen name="Settings1" component={Settings} options={{ headerShown: false }}/>
          <Tab.Screen name="Settings2" component={Settings} options={{ headerShown: false }}/>
          <Tab.Screen name="Settings3" component={Settings} options={{ headerShown: false }}/>
          <Tab.Screen name="Settings4" component={Settings} options={{ headerShown: false }}/>
          <Tab.Screen name="Settings5" component={Settings} options={{ headerShown: false }}/>
        </Tab.Navigator>
      );
}