import React from "react";
import { FlatList } from "react-native-gesture-handler";
import GameField from "./in_game/GameField";



const FormationSelection = () =>
{   const positionSelectionData =   [
    
    {layoutName: 'The Classic', 
    layoutData: [[0,0,0,'CF',0,0,0],
                [0,0,'LF',0,'RF',0,0],
                [0,'RI',0,0,0,'LI',0],
                [0,0,0,'CH',0,0,0],
                ['LH',0,0,0,0,0,'RH'],
                [0,0,'CB',0,'CB',0,0],
                [0,0,0,'GK',0,0,0]]},
    {layoutName: 'Park the Bus', 
    layoutData: [[0,0,0,'CF',0,0,0],
                [0,0,0,0,0,0,0],
                [0,'RI',0,0,0,'LI',0],
                [0,0,'CH',0,'CH',0,0],
                ['LH',0,0,0,0,0,'RH'],
                [0,'CB',0,'CB',0,'CB',0],
                [0,0,0,'GK',0,0,0]]}
     ]
    return(
        <FlatList
        renderItem={GameField}
        data = {positionSelectionData}
        numColumns = {2}
        ></FlatList>
        
    )
}

export default (FormationSelection)