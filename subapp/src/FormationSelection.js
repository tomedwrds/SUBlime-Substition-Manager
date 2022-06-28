import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { View,Text, Pressable,Alert } from "react-native";

import GameField from "./in_game/GameField";
import { SafeAreaView } from "react-native-safe-area-context";
import { update_layout } from "./actions";
import { useSelector, useDispatch } from 'react-redux'



const FormationSelection = ({navigation}) =>
{   
    const dispatch = useDispatch()
    const generalState = useSelector(state => state.generalReducer);
    const updateLayout = layout_data => dispatch(update_layout(layout_data))
    //This is the data sets used for the display of the views 
    const positionSelectionData =   [
    
    {   layoutId: 0,
        layoutName: 'The Classic', 
        layoutData: [
                [0,0,0,['Centre Foward','CF'],0,0,0],
                [['Left Foward','LF'],0,0,0,0,0,['Right Foward','RF']],
                [0,['Left Inner','LI'],0,0,0,['Right Inner','RI'],0],
                [0,0,0,['Center Half','CH'],0,0,0],
                [['Left Half','LH'],0,0,0,0,0,['Right Half','RH']],
                [0,0,['Centre Back','CB'],0,['Centre Back','CB'],0,0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
    },
    {
        layoutId:1,
        layoutName: '3-4-3', 
        layoutData: [
                [0,0,0,['Centre Foward','CF'],0,0,0],
                [0,['Left Foward','LF'],0,0,0,['Right Foward','RF'],0],
                [0,0,0,0,0,0,0],
                [['Left Half','LH'],0,['Center Half','CH'],0,['Center Half','CH'],0,['Right Half','RH']],
                [0,0,0,0,0,0,0],
                [0,['Centre Back','CB'],0,['Centre Back','CB'],0,['Centre Back','CB'],0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
    },
    {
        layoutId:2,
        layoutName: 'Park the Bus', 
        layoutData: [
                [0,0,0,['Centre Foward','CF'],0,0,0],
                [0,0,0,0,0,0,0],
                [0,['Right Inner','RI'],0,0,0,['Left Inner','LI'],0],
                [0,0,['Center Half','CH'],0,['Center Half','CH'],0,0],
                [['Left Half','LH'],0,0,0,0,0,['Right Half','RH']],
                [0,['Centre Back','CB'],0,['Centre Back','CB'],0,['Centre Back','CB'],0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
    },
    {
        layoutId:3,
        layoutName: '4-4-2', 
        layoutData: [
                [0,0,0,0,0,0,0],
                [0,['Left Foward','LF'],0,0,0,['Right Foward','RF'],0],
                [0,0,0,0,0,0,0],
                [['Left Half','LH'],0,['Center Half','CH'],0,['Center Half','CH'],0,['Right Half','RH']],
                [0,0,0,0,0,0,0],
                [['Left Back','LB'],0,['Centre Back','CB'],0,['Centre Back','CB'],0,['Right Back','RB']],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
    },
    {
        layoutId:4,
        layoutName: '2-2-2', 
        layoutData: [
                [0,0,0,0,0,0,0],
                [0,0,['Left Foward','LF'],0,['Right Foward','RF'],0,0],
                [0,0,0,0,0,0,0],
                [0,0,['Left Half','LH'],0,['Right Half','RH'],0,0],
                [0,0,0,0,0,0,0],
                [0,0,['Left Back','LB'],0,['Right Back','RB'],0,0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
    },
    {
        layoutId:5,
        layoutName: '3-3', 
        layoutData: [
                [0,0,0,0,0,0,0],
                [0,['Left Foward','LF'],0,['Centre Foward','CF'],0,['Right Foward','RF'],0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,['Left Back','LB'],0,['Centre Back','CB'],0,['Right Back','RB'],0],
                [0,0,0,0,0,0,0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
    },
    {
        layoutId:6,
        layoutName: 'The test', 
        layoutData: [
                [0,0,0,0,0,0,0],
                [0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,['Left Back','LB'],0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]]
    },

]
    //Hook used to store what the current selected layout is
    const[selectedLayout,setSelectedLayout] = useState(null)
   
    
    const formatPositionData = () =>
    {

        //Create a modal that doesnt allow the user to progress if no structure selected
        if(selectedLayout == null)
        {
            Alert.alert(
                "Selection Incomplete",
                'Select a formation to continue',
                [
                  //Array of selectable buttons
                 
                  { 
                    text: "Close", 
                   
                  }
                ]
              )
        }
        else
        {
            ///Format the selected layout data
            let layoutData = []
            let layoutDataRaw = positionSelectionData[selectedLayout].layoutData
            let index = 0;
            //Iterate through the ds
            for(let rows = 0; rows < layoutDataRaw.length; rows++)
            {
                for(let columns = 0; columns < layoutDataRaw[rows].length; columns++ )
                {
                    //Make sure that that their is a player in that slot
                    if(layoutDataRaw[rows][columns] != 0)
                    {
                        //Add the item
                        layoutData.push({
                            position_id: index,
                            position_interval_width:0,
                            position_name: layoutDataRaw[rows][columns][0],
                            position_inititals: layoutDataRaw[rows][columns][1],
                            position_cords: [rows,columns],
                            position_timeline: new Array(generalState.total_intervals*generalState.interval_length).fill({name:null, color:null})
                        })
                        
                            //Increment the index
                            index += 1
                    }
                }
            }
            updateLayout(layoutData)
            navigation.navigate('Selection')
        }
    }


    //Flat list is used that renders a field of the data
    return(
        <SafeAreaView>
            
            <Pressable onPress={() => formatPositionData()}>
                <Text style = {{fontSize:30}}>✔️</Text>
            </Pressable>


            <FlatList
            renderItem={(item) => GameField(item,setSelectedLayout,selectedLayout)}
            data = {positionSelectionData}
            numColumns = {2}
            keyExtractor = {item => item.layoutId}
            />

            
            
        </SafeAreaView>
        
    )
}

export default (FormationSelection)