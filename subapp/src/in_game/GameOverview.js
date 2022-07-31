import React from "react";
import { Text,TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, TabRouter } from "@react-navigation/native";
import { useState } from "react";



import SelectSchedule from "../SelectSchedule";
import Icon from 'react-native-vector-icons/FontAwesome';
import SliderMain from "../Sliders";
import InGame from "./InGame";

const screenOptions = (route, color) => {
    let iconName;
  
    switch (route.name) {
      case 'Subsheet':
        iconName = 'clipboard';
        break;
 
      case 'Active Game':
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

const Tab = createBottomTabNavigator()



const GameOverview = ({navigation}) => {

    const [minute,setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [activeGameInterval, updateActiveGameInterval] = useState(1)

    return(
        <Tab.Navigator
        screenOptions={({route})=>({
            headerShown: false,
            tabBarIcon: ({color}) => screenOptions(route, color),
           
        })}
        >
            <Tab.Screen name="Back"  component={SelectSchedule}
         options={({navigation})=> ({
           tabBarButton:props => <TouchableOpacity {...props} onPress={()=>navigation.navigate('ScheduleOverview',{screen:'Subsheet'})}/>
    })}/>
            <Tab.Screen name="Active Game" 
            children={()=>
            <InGame
            minute={minute}
            second= {second}
            setMinute={setMinute}
            setSecond={setSecond}
            activeGameInterval= {activeGameInterval}
            updateActiveGameInterval = {updateActiveGameInterval}
            />} />
            <Tab.Screen name="Subsheet" children={()=>
            <SliderMain
            minute={minute}
            navigation={navigation}
            gameActive = {true}
            seconds = {second}
            activeGameInterval= {activeGameInterval}
            
            />} />  

            
            
        </Tab.Navigator>
        
    )
}
export default (GameOverview)