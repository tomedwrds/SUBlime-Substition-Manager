import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { View,Text,FlatList,SafeAreaView } from "react-native";

import SaveView from "./SaveView";
import { create_game_data, delete_save_data,update_current_interval,update_team_name,update_total_intervals,upload_player_data,update_layout, load_game_data } from "./actions";
const LoadSave = ({navigation}) => 
{
    const dispatch = useDispatch()
    
    const deleteSaveData = id => dispatch(delete_save_data(id))
    
    const uploadPlayerData = data => dispatch(upload_player_data(data))
    const savedState = useSelector(state => state.savedReducer);
    const playerState = useSelector(state => state.playerReducer);
    
    const uploadLayout = layout_data => dispatch(update_layout(layout_data))
    const loadGameData = data => dispatch(load_game_data(data))

    
    function loadData(i)
    {
        //Update the player data
        uploadPlayerData(savedState.save_data[i].save_playerData)
       
        uploadLayout(savedState.save_data[i].save_positionsData.position_data)
        loadGameData(savedState.save_data[i].save_generalData)
        //Load the page that the sliders is on
        navigation.replace('Sliders')
    }

    

    return(
        <View style = {{margin:20}}>
            <View>
                <Text style = {{fontSize:40}}>Saved Schedules 💾</Text>
            </View>
                <FlatList
                data = {savedState.save_data}
                keyExtractor = {item => item.save_id}
                renderItem = {(item)=>SaveView(item,loadData,deleteSaveData)}
                ></FlatList>
        </View>
    )
}

export default (LoadSave)