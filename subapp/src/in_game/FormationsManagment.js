import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { View,Text, Pressable,Alert,StyleSheet,Modal  } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import GameField from "./GameField";
import { SafeAreaView } from "react-native-safe-area-context";
import { create_formation, update_layout,update_team_tutorial } from "../actions";
import { useSelector, useDispatch } from 'react-redux'
import CreateFormation from "./CreateFormation";
import { useEffect } from "react";
import { delete_formation } from "../actions";



const FormationManagment = () =>
{   
    const dispatch = useDispatch()
    const deleteFormation = data => dispatch(delete_formation(data))
    const positionState = useSelector(state => state.positionsReducer);
    const updateLayout = layout_data => dispatch(update_layout(layout_data))
    const createFormation = data => dispatch(create_formation(data))
    
    const teamData = useSelector(state => state.teamReducer);
    const generalData = useSelector(state => state.generalReducer);
    const team_id = useSelector(state => state.generalReducer).current_team_index
    const updateTeamTutorial = data => dispatch(update_team_tutorial(data))
    const adjusted_team_index = teamData.team_data.findIndex(item => item.team_id == team_id)
    
    const team_sport = teamData.team_data[adjusted_team_index].team_sport
    const [displayModal,setDisplayModal] =useState(false)
    //This is the data sets used for the display of the formation
    
    //Filters to only have formations relavent to sport code
    const positionSelectionData = teamData.team_data[adjusted_team_index].team_formation_data.team_formations
    
    let formatted_data = positionSelectionData.filter(item => item.layoutId != -1)

    //Place an empty formation in to fill space if odd number
    if(formatted_data.length% 2 == 1)
    {
        formatted_data.push({
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

   
  

   
    //Flat list is used that renders a field of the data
    return(
      
            <SafeAreaView style ={{flex:1}}>
                <Modal
          animationType="slide"
          transparent={true}
          visible={teamData.team_data[adjusted_team_index].team_tutorial[5]} 
          supportedOrientations={['landscape']}
          onRequestClose={() => {updateTeamTutorial([team_id,5])}}
      >
        
           <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={{fontSize:32,marginBottom:20,textAlign:'center'}}>Welcome to SUBlime – Formation Managment</Text>
                  <Text style = {{textAlign:'center'}}>{'A good statergy is key to any teams success. On this page you can create and manage your teams on field formations. SUBlime provides premade commonly used formations but you are able to make your own too fit your teams statergy. Press the "➕" too begin the process of creating your first formation\n'}</Text>
                  {/* <Image style ={{flex:1}}source={require('./images/giphy.gif')}/> */}
                  <View style = {{flexDirection:'row'}}>
                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {updateTeamTutorial([team_id,5])}}
                  >
                  <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  </View>
              </View>
          </View> 
          
      </Modal>
                <CreateFormation sport = {team_sport} displayModal={displayModal} setDisplayModal = {setDisplayModal} teamIndex = {generalData.current_team_index} createFormation={createFormation} formationId = {teamData.team_data[adjusted_team_index].team_formation_data.team_formation_index}/>
                <View style = {styles.header}>
                    <View>
                        <Text style = {{fontSize:40}}>Formation Managment</Text>
                    </View>
                    <Pressable style = {{alignItems:'flex-end',flex:1}} onPress={() => {setDisplayModal(!displayModal)}}>
                        
                    <Icon 
              name='plus' 
              size = {50} 
              color = '#0BD61F'
            />
                        
                    </Pressable>
                
                </View>
                <View style = {{flex:1}}>
                <FlatList
                renderItem={(item) => GameField(item,null,null,team_sport,true,team_id,deleteFormation)}
                data = {formatted_data}
                numColumns = {2}
                keyExtractor = {item => item.layoutId}
                style = {{flex:1}}
        contentContainerStyle={{paddingBottom:30,flexGrow:1}}
        ListEmptyComponent={()=><View style = {{justifyContent:'center',alignItems:'center',flex:1}}><Text style = {{fontSize:20,textAlign:'center'}}>{'No formations exist\n Press the "➕" to create a formation'}</Text></View>}
                />
                </View>

                
                
            </SafeAreaView>
      
            
    )
}
const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        marginHorizontal: 20
    },centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      
      button: {
        borderRadius: 9,
        padding: 10,
        elevation: 2,
        borderWidth:2,
        marginHorizontal:10,
        backgroundColor:'white'
      },
})

export default (FormationManagment)