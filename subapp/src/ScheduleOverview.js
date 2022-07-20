import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayerView from "./PlayerView";
import PlayerSlider from "./Sliders";
import ScheduleTimeOverview from "./ScheduleTimeOverview";


const Tab = createBottomTabNavigator()

const ScheduleOverview = () => {
    return(
        <Tab.Navigator
        screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="Sliders" component = {PlayerSlider}  />
            <Tab.Screen name="Team" component = {PlayerView}  />
            <Tab.Screen name = "Playtime" component = {ScheduleTimeOverview}/>
            
        </Tab.Navigator>
        
    )
}
export default (ScheduleOverview)