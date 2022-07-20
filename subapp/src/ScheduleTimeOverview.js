import React from "react";
import { SafeAreaView, Text,StyleSheet,View } from "react-native";
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
    
    function nameFromIndex (i)
    {
        return team_data[team_data.findIndex(item=> item.id == i)].name
        
    }
    function TimeTab({item})
    {
        return(
            <View>
                <View style = {styles.timeBar}>
                    <Text>{nameFromIndex(item[0])}</Text>
                    <Text>{item[1]}</Text>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView>
            <View style = {styles.timeContainer}>
                <Text style = {styles.titleText}>Playtime Allocation</Text>
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
    timeContainer: {
        marginLeft:20
    },
    titleText: {
        fontSize: 40
    },
    timeBar: {
        backgroundColor:'red',
        flexDirection:'row'
    }
})
export default (ScheduleTimeOverview)