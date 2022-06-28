import React from "react";
import { View,Text,Pressable } from "react-native";

const HomeScreen = ({navigation}) => 
{
    return(
        <View style = {{flex:3}}>
            <View style = {{flex:5,justifyContent:'center',alignItems:'center'}}>
                <Text style = {{fontSize:70}}>SUBlime</Text>
            </View>
            <View style = {{flex:7, alignItems:'center',justifyContent:'center'}}>
                <Pressable onPress ={()=> navigation.navigate('Formation')} style = {{borderWidth:2,borderRadius:9}}>
                    <Text style = {{padding:30, fontSize:30}}>New Schedule</Text>
                </Pressable>
                <Pressable onPress ={()=> navigation.navigate('LoadSave')} style = {{borderWidth:2,borderRadius:9, marginTop: 30}}>
                    <Text style = {{padding:30, fontSize:30}}>Load Schedule</Text>
                </Pressable>
            </View>
            
        </View>
    )
}

export default (HomeScreen)