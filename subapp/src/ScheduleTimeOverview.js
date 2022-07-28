import React from "react";
import { Text,StyleSheet,View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";









const ScheduleTimeOverview = () => {
   
    const teamData = useSelector(state => state.teamReducer);
    const positionsData = useSelector(state => state.positionsReducer).position_data;
    
    const generalData = useSelector(state => state.generalReducer);
    const current_team_index = teamData.team_data.findIndex(item => item.team_id == generalData.current_team_index)

    //Get the id of all players in the team and put in the list index 0 id index 1 frequency of player
    const team_data = teamData.team_data[current_team_index].team_player_data.team_players
    let timeData = []
    for(let k = 0; k < team_data.length; k++ )
    {
        timeData.push([team_data[k].id,0])
    }


    //generate the time data
    
    for(let position = 0; position < positionsData.length; position ++)
    {
        for(let minute = 0; minute < positionsData[position].position_timeline.length;minute++)
        {
            let player = positionsData[position].position_timeline[minute]
            
            if (player != null)
            {
                let indexToAddTime = timeData.findIndex(item => item[0] == player)
                
                if (indexToAddTime != -1)
                {
                    timeData[player][1] +=1
                }
            }
        }
    }


    //styistitic fix up for odd number of players 
    
    function nameFromIndex (i)
    {
        return team_data[team_data.findIndex(item=> item.id == i)].name
        
    }
    function TimeTab({item})
    {
        return(
           
                <View style = {styles.timeBar}>
                    
                        <View style = {{flexDirection:'row'}}>
                        <View style = {styles.nameArea}>
                            <Text style = {styles.generalText}>{nameFromIndex(item[0])}</Text>
                        </View>
                        <View style = {styles.timeArea}>
                            <Text style = {styles.generalText}>{item[1]}</Text>
                        </View>
                        </View>
                    
                    
                </View>
            
        )
    }

    return(
        <SafeAreaView style = {{flex:1}}>
            <View style = {styles.timeContainer}>
                <View style = {{flexDirection:'row'}}>
                    <Text style = {styles.titleText}>Playtime Allocation</Text>
                    <View style = {{justifyContent:'center',alignItems:'flex-end',flex:1}}>
                        <Text style = {{fontSize:40}}>⏰</Text>
                    </View>
                </View>
                <FlatList
                data = {timeData}
                renderItem={item=>TimeTab(item,nameFromIndex)}
                keyExtractor = {item => item[0]}
               
                
                
                />
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    timeContainer:{
        marginHorizontal:20
    }
    ,
    titleText: {
        fontSize: 40
    },
    timeBar: {

      
        alignItems:'center',
        justifyContent:'center',
        flex:1,
        height:32,
        
       
    },
    nameArea: {
     flex:1   
    },
    timeArea:{
       alignItems:'center',
       width:50
    
    },
    generalText: {
        fontSize:28
    }
})
export default (ScheduleTimeOverview)