import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { View,Text,FlatList,SafeAreaView } from "react-native";

import SaveView from "./SaveView";
import { delete_save_data } from "./actions";
const LoadSave = ({navigation}) => 
{
    const dispatch = useDispatch()
    //const createPlayer = player_data => dispatch(create_player(player_data))
    const deleteSaveData = id => dispatch(delete_save_data(id))
    const savedState = useSelector(state => state.savedReducer);
    
    function loadData()
    {

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