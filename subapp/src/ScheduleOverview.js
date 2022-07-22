import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayerView from "./PlayerView";

import ScheduleTimeOverview from "./ScheduleTimeOverview";

import Icon from 'react-native-vector-icons/FontAwesome';

import SliderMain from "./Sliders";
const Tab = createBottomTabNavigator()


const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Schedule':
        iconName = 'clipboard';
        break;
      case 'Team':
        iconName = 'users';
        break;
      case 'Playtime':
        iconName = 'clock-o';
        break;
      default:
        break;
    }
  
    return <Icon name={iconName} color={color} size={24} />;
  };

const ScheduleOverview = () => {
    return(
        <Tab.Navigator
        screenOptions={({route})=>({
            headerShown: false,
            tabBarIcon: ({color}) => screenOptions(route, color),
           
        })}>
            <Tab.Screen name="Schedule" component = {SliderMain}  />
            <Tab.Screen name="Team" component = {PlayerView}  />
            <Tab.Screen name = "Playtime" component = {ScheduleTimeOverview}/>
            
        </Tab.Navigator>
        
    )
}
export default (ScheduleOverview)