import React, { useState } from "react";
import { Text,StyleSheet,View, SectionList } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';








const TimeOverview = () => {
   
    const teamData = useSelector(state => state.teamReducer);
    
    const generalData = useSelector(state => state.generalReducer);
    const current_team_index = teamData.team_data.findIndex(item => item.team_id == generalData.current_team_index)
    const gameData = teamData.team_data[current_team_index].team_game_data.team_games
    
    const [displayType,setDislayType] = useState('Total')


    

    const team_data = teamData.team_data[current_team_index].team_player_data.team_players
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
                //Get the id of all players in the team and put in the list index 0 id index 1 array of all minutes for each game 
                
                
               
                
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
                timeData[player][1].filter(time => time != 0)

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

                        //add the time data for game to ds
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
            <View style = {styles.timeContainer}>
                <View style = {{flexDirection:'row'}}>
                    <Text style = {styles.titleText}>Season Playtime Allocation</Text>
                    <View style = {{justifyContent:'center',alignItems:'flex-end',flex:1}}>
                        <Text style = {{fontSize:40}}>⏰</Text>
                    </View>
                    
                </View>
                <View style = {styles.belowArea}>
                    <Text style = {{fontSize:20}}>Display Type</Text>
                    <View style = {{alignItems:'center'}}>
                        
                        <RNPickerSelect
                            onValueChange={(value) => {setDislayType(value)}}
                            items={[
                                { label: 'Average', value: 'Average' },
                                { label: 'Breakdown', value: 'Breakdown' },
                                
                            ]}
                            placeholder={{label:'Total',value:'Total'}}
                            style = {pickerSelectStyles}
                            useNativeAndroidPickerStyle={false}
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
        marginRight:20
    }
    ,
    titleText: {
        fontSize: 40
    },
    subText: {
        fontSize:30
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
      
      
     
    
    }
})

const pickerSelectStyles = StyleSheet.create({
  
    inputAndroid: {
      
      fontSize: 16,
      color: 'black',
      fontSize: 20,
      //backgroundColor: '#ebebeb',
      textAlign: 'center',
      borderWidth:2,
      marginLeft:10,
      padding:10,
      borderRadius:9,
      width:180
   
  },
    
     
  
  
    inputIOS: {
     
      fontSize: 16,
      color: 'black',
      fontSize: 20,
      //backgroundColor: '#ebebeb',
      textAlign: 'center',
      borderWidth:2,
      marginLeft:10,
      padding:10,
      borderRadius:9,
      width:180
      
  
  
   
    
  
    
  },
    placeholder: {
      color: 'black'
    }
  });
export default (TimeOverview)