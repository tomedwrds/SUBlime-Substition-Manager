import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import PlayerView from "./PlayerView";
import TimeOverview from "./TimeOverview";
import SelectSchedule from "./SelectSchedule";


const Tab = createBottomTabNavigator()

const TeamOverview = () => {
    return(
        <Tab.Navigator
            
        >
            <Tab.Screen name="Players" component = {PlayerView}  />
            <Tab.Screen name="Schedules" component = {SelectSchedule}  />
            <Tab.Screen name="Playtime" component = {TimeOverview}  />
            
        </Tab.Navigator>
        
    )
}
export default (TeamOverview)