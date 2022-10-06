import React from "react";
import { Text,TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, TabRouter } from "@react-navigation/native";

import PlayerView from "./PlayerView";
import TimeOverview from "./TimeOverview";
import SelectSchedule from "./SelectSchedule";
import Icon from 'react-native-vector-icons/FontAwesome';
import GameHistory from "./GameHistory";
import FormationManagment from "./in_game/FormationsManagment";

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Subsheets':
        iconName = 'clipboard';
        break;
      case 'Team':
        iconName = 'users';
        break;
      case 'Season Playtime':
        iconName = 'clock-o';
        break;
    case 'Game History':
        iconName = 'history';
        break;
    case 'Back':
      iconName = 'arrow-left';
      break;
    case 'Formations':
      iconName = 'columns'
      break;
      default:
        break;
    }
  
    return <Icon name={iconName} color={color} size={24} />;
  };

const Tab = createBottomTabNavigator()



const TeamOverview = () => {


    return(
        <Tab.Navigator
        screenOptions={({route})=>({
            headerShown: false,
            tabBarIcon: ({color}) => screenOptions(route, color),
           
        })}
        >
            <Tab.Screen name="Back"  component={SelectSchedule}
         options={({navigation})=> ({
           tabBarButton:props => <TouchableOpacity {...props} onPress={()=>navigation.navigate('HomeScreen')}/>
    })}/>
            <Tab.Screen name="Subsheets" component = {SelectSchedule}  />
            <Tab.Screen name="Team" component = {PlayerView}  />
            <Tab.Screen name="Season Playtime" component = {TimeOverview}  />
            <Tab.Screen name="Game History" component = {GameHistory}  />
            <Tab.Screen name="Formations" component = {FormationManagment}  />
            
        </Tab.Navigator>
        
    )
}
export default (TeamOverview)