import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PlayerView from "./PlayerView";
import { TouchableOpacity } from "react-native";
import ScheduleTimeOverview from "./ScheduleTimeOverview";

import Icon from 'react-native-vector-icons/FontAwesome';

import SliderMain from "./Sliders";
const Tab = createBottomTabNavigator()


const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Subsheet':
        iconName = 'clipboard';
        break;
      case 'Team':
        iconName = 'users';
        break;
      case 'Playtime':
        iconName = 'clock-o';
        break;
      case 'Back':
        iconName = 'arrow-left';
        break;
      default:
        break;
    }
  
    return <Icon name={iconName} color={color} size={24} />;
  };

const ScheduleOverview = ({navigation}) => {
    return(
        <Tab.Navigator
        screenOptions={({route})=>({
            headerShown: false,
            tabBarIcon: ({color}) => screenOptions(route, color),
           
        })}>
          <Tab.Screen name="Back"  component={SliderMain}
                options={({navigation})=> ({
                  tabBarButton:props => <TouchableOpacity {...props} onPress={()=>navigation.navigate('TeamOverview', {screen:'Subsheets'})}/>
            })}/>
            <Tab.Screen name="Subsheet" children={()=>
            <SliderMain
            navigation = {navigation}
            gameActive = {false}
            seconds = {0}
            minute = {0}
            />} />
            <Tab.Screen name="Team" component = {PlayerView}  />
            <Tab.Screen name = "Playtime" component = {ScheduleTimeOverview}/>
            
        </Tab.Navigator>
        
    )
}
export default (ScheduleOverview)