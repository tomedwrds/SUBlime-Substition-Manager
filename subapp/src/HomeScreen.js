import React, { useState } from "react";
import { View,Text,Pressable,Image } from "react-native";


import GameSetup from "./GameSetup";

const HomeScreen = ({navigation}) => 
{
   
    const [displaySetup,setDisplaySetup] = useState(false)
    
    function closeModal (){setDisplaySetup(false)}
    return(
        
        
        <View style = {{flex:1,backgroundColor:'white'}}>
            
            <GameSetup
                displayModal = {displaySetup}
                closeModal = {()=>closeModal()}
                navigation = {navigation}
            />
            <View style ={{flex:1}}/>
            <View style = {{flex:5,flexDirection:'row'}}>   
                <View style ={{flex:1}}/>
                <View style={{flex:1}}>
                { <Image
                    source = {require('./images/icon.png')}

                    style={{

                        flex: 1,
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain'

                    }}
                    />}
                    </View>
                 <View style ={{flex:1}}/>
            </View>
          
            <View style = {{flex:7, alignItems:'center',justifyContent:'center'}}>
           
                <Pressable onPress ={()=> setDisplaySetup(true)} style = {{borderWidth:2,borderRadius:9,width:240,alignItems:'center',marginBottom:10,flex:3,justifyContent:'center',maxHeight:120}}>
                    <Text style = {{fontSize:30}}>New Team</Text>
                </Pressable>
                
                <Pressable onPress ={()=> navigation.navigate('LoadSave')} style = {{borderWidth:2,borderRadius:9,width:240,alignItems:'center',flex:3,justifyContent:'center',maxHeight:120}}>
                    <Text style = {{fontSize:30}}>Load Team</Text>
                </Pressable>
                <View style= {{flex:1}}/>
                
            </View>
            
        </View>
    )
}

export default (HomeScreen)