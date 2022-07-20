import React from "react";
import { Text,View,SafeAreaView,StyleSheet,Pressable,FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector,useDispatch } from "react-redux";
import { delete_schedule, update_layout,update_interval_length,update_total_intervals,should_mirror_intervals, delete_game } from "./actions";

const GameHistory = ({navigation}) => {
    const dispatch = useDispatch()
    const teamData = useSelector(state => state.teamReducer);
    const generalData = useSelector(state =>state.generalReducer)
    const current_team_index = teamData.team_data.findIndex(item => item.team_id == generalData.current_team_index)
    const deleteGame = index => dispatch(delete_game(index))
    const gameData = teamData.team_data[current_team_index].team_game_data.team_games
 
    
    

    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.header}>
                
                <Text style = {{fontSize:40}}>Game History</Text>
                
            </View>
        <FlatList
            data = {gameData}
            keyExtractor = {item => item.game_id}
            renderItem = {(item)=>SaveView(item,deleteGame, current_team_index)}
            ></FlatList>
            </SafeAreaView>
    
    )
}

function SaveView ({item},deleteGame,current_team_index) 
{
    function format_time()
    {
        let time = item.game_date
        const options = { hour:'numeric',minute:'numeric', year: 'numeric', month: 'long', day: 'numeric' };
        return time.toLocaleDateString('en-NZ',options)
    }
  
   
    return(
        <View style = {styles.body}>
            <View style = {styles.textContainer}>
                <Text style ={styles.titleText}>v {item.game_opponent}</Text>
               
                <Text style = {styles.subText} >{format_time()}</Text>
            
            </View>
            <View style = {styles.iconContainer}>
                
                <Pressable 
                    style = {styles.icon}
                    onPress = {()=>{console.log(current_team_index);deleteGame([current_team_index,item.game_id])}}
                    >
                    <Icon 
                        name='trash' 
                        size = {40} 
                        color = 'red'
                    />
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        borderWidth:2,
        borderRadius:9,
        flexDirection:'row',
        padding:20,
        marginBottom:20
        
    },
    header: {
        flexDirection:'row'
    },
    container: {
        marginHorizontal:20
    },
    iconContainer: {
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    icon: {
        padding: 10
    },
    titleText: {
        fontSize:22,
        paddingBottom:4
    },
    subText: {
        color: 'darkgray'
    }
})
export default (GameHistory)

