import React, { useState } from "react";
import { Text,StyleSheet,View, SectionList,Modal,Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector,useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import SelectDropdown from "react-native-select-dropdown";

import { update_team_tutorial } from "./actions";




const TimeOverview = () => {
   
    const teamData = useSelector(state => state.teamReducer);
    const dispatch = useDispatch()
    const generalData = useSelector(state => state.generalReducer);
    const team_id = generalData.current_team_index
    const adjusted_team_index = teamData.team_data.findIndex(item => item.team_id == team_id)
    const gameData = teamData.team_data[adjusted_team_index].team_game_data.team_games
    const updateTeamTutorial = data => dispatch(update_team_tutorial(data))
    const [displayType,setDislayType] = useState('Total')


    

    const team_data = teamData.team_data[adjusted_team_index].team_player_data.team_players
    let timeData = []

    //generate the time data depdent on type

    switch(displayType)
    {
        case 'Total':
            //Get the id of all players in the team and put in the list index 0 id index 1 frequency of player
           timeData = []
            for(let k = 0; k < team_data.length; k++ )
            {
                timeData.push([team_data[k].id,0])
            }

            for(let game = 0; game < gameData.length; game ++)
            {
                for(let player = 0; player < gameData[game].game_data.length;player++)
                {
                    let data = gameData[game].game_data[player]
                    let indexToAddTime = timeData.findIndex(item => item[0] == data[0]) 
                    if(indexToAddTime != -1)
                    {
                        timeData[indexToAddTime][1] += data[1]
                    }
                }
            }
            break;

        case 'Average':
            timeData = []
            for(let k = 0; k < team_data.length; k++ )
                {
                    timeData.push([team_data[k].id,[]])
                }
            for(let game = 0; game < gameData.length; game ++)
            {
                //Loop through all players in every game and add ther time data for that game if they didnt play 0 minutes
                for(let player = 0; player < gameData[game].game_data.length;player++)
                {
                    let data = gameData[game].game_data[player]
                    let indexToAddTime = timeData.findIndex(item => item[0] == data[0]) 
                    if(indexToAddTime != -1)
                    {          
                        timeData[indexToAddTime][1].push(data[1])
                        
                    }
                } 
            }  
            //Loop through time data and average all lists
            for(let player = 0; player < timeData.length; player++)
            {
        
                timeData[player][1] = timeData[player][1].filter(time => time != 0)
            
                if(timeData[player][1].length == 0)
                {
                    timeData[player][1] = 0
                }
                else
                {
                    timeData[player][1] = (timeData[player][1].reduce((a, b) => a + b, 0) / timeData[player][1].length).toFixed(1)
                }
            }   
            break;

        case 'Breakdown':
            //Data treated as object due to nature of sectioned list 
            timeData = []
            for(let k = 0; k < team_data.length; k++ )
            {
                timeData.push({id: team_data[k].id, data: [],total: 0})
            }
            
            for(let game = 0; game < gameData.length; game ++)
            {
                for(let player = 0; player < gameData[game].game_data.length;player++)
                {
                    let data = gameData[game].game_data[player]
                    let indexToAddTime = timeData.findIndex(item => item.id == data[0]) 
                    if(indexToAddTime != -1)
                    {
                        //Add to total time
                        timeData[indexToAddTime].total += data[1]

                        //add the time data for game to display
                        timeData[indexToAddTime].data.push([game,data[1]])
                    }
                }
            }
           
            
            break;

        default:
            break;
    }   



    
    function nameFromIndex (i)
    {
        return team_data[team_data.findIndex(item=> item.id == i)].name
        
    }

    function gameFromIndex(i)
    {
        return 'vs. ' + gameData[gameData.findIndex(game => game.game_id == i)].game_opponent
    }

    function TimeList ()
    {
        if(displayType == 'Breakdown')
        {
            return(
                <SectionList
                    sections={timeData}
                    keyExtractor = {(item,index) => item+index}
                    renderSectionHeader={({ section: { id,total } }) => (
                        <TimeTab
                        name = {nameFromIndex(id)}
                        total = {total}
                        />
                      )}
                    renderItem = {({item})=> 
                    <TimeTab
                        name = {gameFromIndex(item[0])}
                        total = {item[1]}
                        gameTime = {true}
                    />}
                                    

                />
            )
        }
        else
        {
            return(
                <FlatList
                data = {timeData}
                contentContainerStyle={{paddingBottom:30,flexGrow:1}}
                ListEmptyComponent={()=><View style = {{justifyContent:'center',alignItems:'center',flex:1}}><Text style = {{fontSize:20,textAlign:'center'}}>{'No time data exist\n All time data will be displayed here'}</Text></View>}
                renderItem={({item})=>
                <TimeTab
                name = {nameFromIndex(item[0])}
                total = {item[1]}/>}
                keyExtractor = {item => item[0]}
                
    
                />
            )
        }
        
    }

    function TimeTab(props)
    {
        let name = props.name
        let amount = props.total
        
        
        return(
        
                <View style = {styles.timeBar}>
                    
                        <View style = {{flexDirection:'row'}}>
                        <View style = {styles.nameArea}>
                            <Text style = {(props.gameTime? {fontSize:20} : {fontSize:30})}>{name}</Text>
                        </View>
                        <View style = {styles.timeArea}>
                            <Text style = {(props.gameTime? {fontSize:20} : {fontSize:30})}>{amount}</Text>
                        </View>
                        </View>
                    
                    
                </View>
            
        )
        
    }
  
    return(
        <SafeAreaView style = {{flex:1}}>
            <Modal
          animationType="slide"
          transparent={true}
          visible={teamData.team_data[adjusted_team_index].team_tutorial[2]} 
          supportedOrientations={['landscape']}
          onRequestClose={() => {updateTeamTutorial([team_id,2])}}
      >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={{fontSize:32,marginBottom:20}}>Welcome to SUBlime – Seasonal Playtime</Text>
                  <Text style = {{textAlign:'center'}}>{'Equal and fair playtime is key for enjoyment for all in sports. This page displays the playtime of all players across the season. If you wish you can get a more analytical overview of playtime by selecting the ‘Average’ or ‘Breakdown options. When creating your Subsheet you can view a time breakdown specific to that Subsheet.\n '}</Text>
                 
                  <View style = {{flexDirection:'row'}}>
                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {updateTeamTutorial([team_id,2])}}
                  >
                  <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  </View>
              </View>
          </View>
      </Modal>
            <View style = {styles.timeContainer}>
                <View style = {{flexDirection:'row'}}>
                    <Text style = {styles.titleText}>Season Playtime Allocation</Text>
                    <View style = {{justifyContent:'center',alignItems:'flex-end',flex:1}}>
                        <Text style = {{fontSize:40}}>⏰</Text>
                    </View>
                    
                </View>
                <View style = {styles.belowArea}>
                    <Text style = {{fontSize:20,marginRight:20}}>Display Type</Text>
                    <View style = {{alignItems:'center'}}>
                        <SelectDropdown
                            data={[
                                { label: 'Total', value: 'Total' },
                                { label: 'Average', value: 'Average' },
                                { label: 'Breakdown', value: 'Breakdown' },
                                
                            ]}
                            onSelect={(selectedItem) => {
                                setDislayType(selectedItem.value)
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem.label
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.label
                            }}
                            buttonStyle={styles.dropDown}
                            buttonTextStyle={styles.dropDownText}
                            rowTextStyle={styles.dropDownText}
                            defaultValue={'Total'}
                            defaultButtonText={'Total'}
                            dropdownStyle={{borderRadius:9}}
                        />
                        
                    </View>
                </View>
                
              
                <TimeList/>
                            
            
                
                
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    timeContainer:{
        marginHorizontal:20,
        marginRight:20,
        flex:1
    }
    ,
    titleText: {
        fontSize: 40
    },
    subText: {
        fontSize:30,
        
    },
    timeBar: {

      
        alignItems:'center',
        justifyContent:'center',
        flex:1,
       
        
       
    },
    nameArea: {
     flex:1   
    },
    timeArea:{
       alignItems:'center',
      
    
    },
    generalText: {
        fontSize:28
    },
    belowArea:{
      
      flexDirection:"row",
    
      alignItems:'center',
      
      
     
    
    },
    centeredView: {
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
      dropDown: {
        
        fontSize: 16,
      color: 'black',
      fontSize: 20,
      //backgroundColor: '#ebebeb',
      textAlign: 'center',
      borderWidth:2,
     
      borderRadius:9,
      width:180,
      justifyContent:'center'
    },
    dropDownText: {
        fontSize: 24,
        color: 'black',
        
    }
})


export default (TimeOverview)