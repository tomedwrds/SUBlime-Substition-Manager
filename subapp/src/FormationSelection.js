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
    
    const team_sport = teamData.team_data[current_team_index].team_sport
    //This is the data sets used for the display of the formation
    
    //Filters to only have formations relavent to sport code
    const positionSelectionData = teamData.team_data[current_team_index].team_formation_data.team_formations
    
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
            let adjustedIndex = positionSelectionData.findIndex(item => selectedLayout==item.layoutId)
            let layoutDataRaw = positionSelectionData[adjustedIndex].layoutData
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
           
            updateLayout([layoutData, positionSelectionData[adjustedIndex].layoutName])
            props.toggleModalFormations()
            props.navigation.navigate('ScheduleOverview',{screen:'Subsheet'})
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
        supportedOrientations={['landscape']}
        
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
                renderItem={(item) => GameField(item,setSelectedLayout,selectedLayout,team_sport)}
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