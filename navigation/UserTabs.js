import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import DarkStyles from '../components/common/DarkStyles';
import TodaySessionStack from "./TodaySessionStack";
import HomeStack from "./HomeStack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Exercises from "../views/Exercises";

const Tab = createBottomTabNavigator();

export default function UserTabs()
{
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Home'
                component={HomeStack}
                options={{
                    tabBarStyle: DarkStyles.darkTabStyle,
                    headerShown: false,
                    tabBarIcon: () => (<FontAwesome name="home" color={'#E68D33'} size={30} solid/>)
                }}/>
            <Tab.Screen
                name='Today'
                component={TodaySessionStack}
                options={{
                    tabBarStyle: DarkStyles.darkTabStyle,
                    headerShown: false,
                    tabBarIcon: () => (<FontAwesome name="calendar-day" color={'#E68D33'} size={30} solid/>)
                }}/>
            <Tab.Screen
                name="Exercises"
                component={Exercises}
                options={{
                    tabBarStyle: DarkStyles.darkTabStyle,
                    headerShown: false,
                    tabBarIcon: () => (<FontAwesome name="dumbbell" color={'#E68D33'} size={30} solid/>)
                }}/>
        </Tab.Navigator>
    );
}
