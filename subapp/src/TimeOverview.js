import React from "react";
import { Text,StyleSheet,View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";









const TimeOverview = () => {
   
    const teamData = useSelector(state => state.teamReducer);
    
    const generalData = useSelector(state => state.generalReducer);
    const current_team_index = teamData.team_data.findIndex(item => item.team_id == generalData.current_team_index)
    const gameData = teamData.team_data[current_team_index].team_game_data.team_games
    
    //Get the id of all players in the team and put in the list index 0 id index 1 frequency of player
    const team_data = teamData.team_data[current_team_index].team_player_data.team_players
    let timeData = []
    for(let k = 0; k < team_data.length; k++ )
    {
        timeData.push([team_data[k].id,0])
    }
    

    //generate the time data
    
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
                    <Text style = {styles.titleText}>Season Playtime Allocation</Text>
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
export default (TimeOverview)