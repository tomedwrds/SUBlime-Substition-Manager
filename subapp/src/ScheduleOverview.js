import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayerView from "./PlayerView";
import PlayerSlider from "./Sliders";


const Tab = createBottomTabNavigator()

const ScheduleOverview = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Sliders" component = {PlayerSlider}  />
            <Tab.Screen name="Team" component = {PlayerView}  />
           
            
        </Tab.Navigator>
        
    )
}
export default (ScheduleOverview)