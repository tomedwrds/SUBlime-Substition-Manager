import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { View,Text,FlatList } from "react-native";

import SaveView from "./SaveView";
const LoadSave = ({navigation}) => 
{
    const dispatch = useDispatch()
    //const createPlayer = player_data => dispatch(create_player(player_data))
    const savedState = useSelector(state => state.savedReducer);
    
    function loadData()
    {
        console.log('[k')
        navigation.navigate('Sliders')
    }

    return(
        <View>
            
                <FlatList
                data = {savedState.save_data}
                keyExtractor = {item => item.saveId}
                renderItem = {(item)=>SaveView(item,loadData)}
                ></FlatList>
        </View>
    )
}

export default (LoadSave)