import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";

import GameField from "./in_game/GameField";



const FormationSelection = () =>
{   

    //This is the data sets used for the display of the views 
    const positionSelectionData =   [
    
    {   layoutId: 0,
        layoutName: 'The Classic', 
        layoutData: [
                [0,0,0,'CF',0,0,0],
                ['LF',0,0,0,0,0,'RF'],
                [0,'LI',0,0,0,'RI',0],
                [0,0,0,'CH',0,0,0],
                ['LH',0,0,0,0,0,'RH'],
                [0,0,'CB',0,'CB',0,0],
                [0,0,0,'GK',0,0,0]]
    },
    {
        layoutId:1,
        layoutName: '3-4-3', 
        layoutData: [
                [0,0,0,'CF',0,0,0],
                [0,'LF',0,0,0,'RF',0],
                [0,0,0,0,0,0,0],
                ['LH',0,'CH',0,'CH',0,'RH'],
                [0,0,0,0,0,0,0],
                [0,'CB',0,'CB',0,'CB',0],
                [0,0,0,'GK',0,0,0]]
    },
    {
        layoutId:2,
        layoutName: 'Park the Bus', 
        layoutData: [
                [0,0,0,'CF',0,0,0],
                [0,0,0,0,0,0,0],
                [0,'RI',0,0,0,'LI',0],
                [0,0,'CH',0,'CH',0,0],
                ['LH',0,0,0,0,0,'RH'],
                [0,'CB',0,'CB',0,'CB',0],
                [0,0,0,'GK',0,0,0]]
    },
    {
        layoutId:3,
        layoutName: '4-4-2', 
        layoutData: [
                [0,0,0,0,0,0,0],
                [0,'LF',0,0,0,'RF',0],
                [0,0,0,0,0,0,0],
                ['LH',0,'CH',0,'CH',0,'RH'],
                [0,0,0,0,0,0,0],
                ['LB',0,'CB',0,'CB',0,'RB'],
                [0,0,0,'GK',0,0,0]]
    },
    {
        layoutId:4,
        layoutName: '2-2-2', 
        layoutData: [
                [0,0,0,0,0,0,0],
                [0,0,'LF',0,'RF',0,0],
                [0,0,0,0,0,0,0],
                [0,0,'LH',0,'RH',0,0],
                [0,0,0,0,0,0,0],
                [0,0,'LB',0,'RB',0,0],
                [0,0,0,'GK',0,0,0]]
    },
    {
        layoutId:5,
        layoutName: '3-3', 
        layoutData: [
                [0,0,0,,0,0,0],
                [0,'LF',0,'CF',0,'RF',0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,'LB',0,'CB',0,'RB',0],
                [0,0,0,0,0,0,0],
                [0,0,0,'GK',0,0,0]]
    },

]
    //Hook used to store what the current selected layout is
    const[selectedLayout,setSelectedLayout] = useState(null)
   
    //Flat list is used that renders a field of the data
    return(
        <FlatList
        renderItem={(item) => GameField(item,setSelectedLayout,selectedLayout)}
        data = {positionSelectionData}
        numColumns = {2}
        keyExtractor = {item => item.layoutId}
        />
        
    )
}

export default (FormationSelection)