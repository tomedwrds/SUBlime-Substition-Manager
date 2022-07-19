import React from "react";
import { Pressable,Text } from "react-native";


const SelectSchedule = ({navigation}) => {
    return(
        <Pressable style = {{padding:20,backgroundColor:'red'}} onPress = {()=>navigation.navigate('ScheduleSetup')}><Text>New Schedule</Text></Pressable>
    )
}
export default (SelectSchedule)

