import React, { useState } from "react";
import { View,Text,Pressable } from "react-native";
import GameSetup from "./GameSetup";

const HomeScreen = ({navigation}) => 
{
    const [displaySetup,setDisplaySetup] = useState(false)
    
    function closeModal (){setDisplaySetup(false)}
    return(
        
        
        <View style = {{flex:1}}>
            
            <GameSetup
                displayModal = {displaySetup}
                closeModal = {()=>closeModal()}
                navigation = {navigation}
            />
            <View style = {{flex:5,justifyContent:'center',alignItems:'center'}}>   
                <Text style = {{fontSize:70}}>SUBlime</Text>
            </View>
            <View style = {{flex:7, alignItems:'center',justifyContent:'center'}}>
                <View style = {{flex:1}}></View>
                <Pressable onPress ={()=> setDisplaySetup(true)} style = {{borderWidth:2,borderRadius:9,width:240,alignItems:'center',marginBottom:10}}>
                    <Text style = {{padding:30, fontSize:30}}>New Team</Text>
                </Pressable>
                
                <Pressable onPress ={()=> navigation.navigate('LoadSave')} style = {{borderWidth:2,borderRadius:9,width:240,alignItems:'center'}}>
                    <Text style = {{padding:30, fontSize:30}}>Load Team</Text>
                </Pressable>
                <View style = {{flex:1}}></View>
            </View>
            
        </View>
    )
}

export default (HomeScreen)