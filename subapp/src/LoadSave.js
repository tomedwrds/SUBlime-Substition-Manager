import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { View,Text,FlatList,Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SaveView from "./SaveView";
import { create_game_data, delete_save_data,update_current_interval,update_team_name,update_total_intervals,upload_player_data,update_layout, load_game_data, update_current_team_index } from "./actions";
import { findNonSerializableValue } from "@reduxjs/toolkit";
const LoadSave = ({navigation}) => 
{
    const dispatch = useDispatch()
    
    const deleteSaveData = id => dispatch(delete_save_data(id))
    
    const uploadPlayerData = data => dispatch(upload_player_data(data))
    const savedState = useSelector(state => state.savedReducer);
    
    const teamData = useSelector(state => state.teamReducer).team_data
    
    const updateCurrentTeamIndex = index => dispatch(update_current_team_index(index))
    const uploadLayout = layout_data => dispatch(update_layout(layout_data))
    const loadGameData = data => dispatch(load_game_data(data))
    
    function loadData(i)
    {
       
        //Load the page that the sliders is on
        
        updateCurrentTeamIndex(i)
        navigation.replace('TeamOverview',{screen:'Subsheets'})
    }
   

    

    return(
    
        <SafeAreaView style = {{marginHorizontal:20,flex:1}}>
            <View style = {{flexDirection:'row'}}>
                <Text style = {{fontSize:40,marginBottom:10}}>Select a team</Text>
                <Pressable 
                        onPress={()=>{navigation.goBack()}}
                        style = {{flex:1,alignItems:'flex-end',flex:1}}>
                        <Text style = {{fontSize:40}}>⬅️</Text>
                    </Pressable>
            </View>
                <FlatList
            
                data = {teamData}
                keyExtractor = {item => item.team_id}
                renderItem = {(item)=>SaveView(item,loadData,deleteSaveData)}
                style = {{flex:1}}
                contentContainerStyle={{paddingBottom:30,flexGrow:1}}
                ListEmptyComponent={()=><View style = {{justifyContent:'center',alignItems:'center',flex:1}}><Text style = {{fontSize:20,textAlign:'center'}}>{'No teams found\n Go back to main menu to create a team'}</Text></View>}
                />
        </SafeAreaView>
    )
}

export default (LoadSave)