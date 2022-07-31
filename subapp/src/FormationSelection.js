import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { View,Text, Pressable,Alert,StyleSheet, Modal } from "react-native";

import GameField from "./in_game/GameField";
import { SafeAreaView } from "react-native-safe-area-context";
import { update_layout } from "./actions";
import { useSelector, useDispatch } from 'react-redux'



const FormationSelection = (props) =>
{   
    const dispatch = useDispatch()
    const positionState = useSelector(state => state.positionsReducer);
    const updateLayout = layout_data => dispatch(update_layout(layout_data))
    
    const teamData = useSelector(state => state.teamReducer);
    const generalData = useSelector(state => state.generalReducer);
    const current_team_index = teamData.team_data.findIndex(item => item.team_id == generalData.current_team_index)
   
    //This is the data sets used for the display of the formation
    const positionSelectionDataAll =   [
    
    {   layoutId: 0,
        layoutName: 'The Classic', 
        layoutSport: '11H',
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
        layoutSport: '11H',
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
        layoutSport: '11H', 
        layoutData: [
                [0,0,0,['Centre Foward','CF'],0,0,0],
                [0,0,0,0,0,0,0],
                [0,['Left Inner','LI'],0,0,0,['Right Inner','RI'],0],
                [0,0,['Center Half','CH'],0,['Center Half','CH'],0,0],
                [['Left Half','LH'],0,0,0,0,0,['Right Half','RH']],
                [0,['Centre Back','CB'],0,['Centre Back','CB'],0,['Centre Back','CB'],0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
    },
    {
        layoutId:3,
        layoutName: '4-4-2', 
        layoutSport: '11H',
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
        layoutSport: '7H',
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
        layoutSport: '7H',
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
        layoutName: '7 aside', 
        layoutSport: '7H',
        layoutData: [
                [0,0,0,['Striker','ST'],0,0,0],
                [0,['Striker','ST'],0,0,0,['Striker','ST'],0],
                [0,0,0,0,0,0,0],
                [0,['Midfield','MF'],0,0,0,['Midfield','MF'],0],
                [0,0,0,['Defender','DF'],0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
    },
    {
        layoutId:7,
        layoutName: 'The test',
        layoutSport: 'T', 
        layoutData: [
                [0,0,0,0,0,0,0],
                [0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,['Left Back','LB'],['Left Back','LB'],0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]]
    },

]   
    //Filters to only have formations relavent to sport code
    let positionSelectionData = positionSelectionDataAll.filter(item => item.layoutSport == teamData.team_data[current_team_index].team_sport)
    
    //Place an empty formation in to fill space if odd number
    if(positionSelectionData.length% 2 == 1)
    {
        positionSelectionData.push({
            layoutId: -1,
            layoutName: '', 
            layoutSport: '',
            layoutData: [
                [0,0,0,0,0,0,0],
                [0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0]]})
    }

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
            let layoutDataRaw = positionSelectionDataAll[selectedLayout].layoutData
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
                            position_timeline: new Array(positionState.total_intervals*positionState.interval_length).fill(null),
                            position_color: '#' + Math.floor(Math.random()*16777215).toString(16)
                        })
                        
                            //Increment the index
                            index += 1
                    }
                }
            }
           
            updateLayout([layoutData, positionSelectionDataAll[selectedLayout].layoutName])
            props.toggleModalFormations()
            props.navigation.navigate('ScheduleOverview',{screen:'Schedule'})
        }
    }


    //Flat list is used that renders a field of the data
    return(
        <Modal
        transparent={false}
        visible={props.displayFormations}
        onRequestClose={props.toggleModalFormation}
        animationType={'slide'}
        onShow={()=>{setSelectedLayout(null);}}
        
        >
            <SafeAreaView>
                <View style = {styles.header}>
                    <View>
                        <Text style = {{fontSize:40}}>Select a Formation</Text>
                    </View>
                    <Pressable 
                        onPress={()=>{props.toggleModalSetup(); props.toggleModalFormations()}}
                        style = {{flex:1,alignItems:'flex-end',flex:1}}>
                        <Text style = {{fontSize:40}}>⬅️</Text>
                    </Pressable>
                    <Pressable style = {{alignItems:'flex-end'}} onPress={() => formatPositionData()}>
                        
                        <Text style = {{fontSize:40}}>{selectedLayout == null? '☑️':'✅'}</Text>
                        
                    </Pressable>
                
                </View>

                <FlatList
                renderItem={(item) => GameField(item,setSelectedLayout,selectedLayout)}
                data = {positionSelectionData}
                numColumns = {2}
                keyExtractor = {item => item.layoutId}
                contentContainerStyle={{paddingBottom:50}}
                />

                
                
            </SafeAreaView>
        </Modal>
            
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        marginHorizontal: 20
    }
})
export default (FormationSelection)