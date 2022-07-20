import React, { useState,useEffect } from 'react'
import {Text,StyleSheet,View,FlatList,Pressable} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector,useDispatch } from 'react-redux';
import UpcomingSub from './UpcomingSub.js'
import GamePitch from './GamePitch.js';
import { update_current_interval } from '../actions.js';
import { useKeepAwake } from 'expo-keep-awake';
//Note not globalized
const totalColumns = 7;
const totalRows = 7;




function InGame()
{
    
    const dispatch = useDispatch()
    const positionData = useSelector(state => state.positionsReducer).position_data
    const subData =useSelector(state => state.generalReducer).game_data;
    
    
    const teamData =useSelector(state => state.teamReducer);
    const current_team_index = useSelector(state => state.generalReducer).current_team_index


    //Used to account for deletion of certain items when going on index
    const team_index = teamData.team_data.findIndex(item => item.team_id == current_team_index)
    const team_data = teamData.team_data[team_index].team_player_data
    
    const currentInterval =useSelector(state => state.generalReducer).current_interval;
    const intervalLength = useSelector(state => state.positionsReducer).interval_length;
    const teamName = teamData.team_data[team_index].team_name
    const updateCurrentInterval = interval => dispatch(update_current_interval(interval))
    const totalInterval = useSelector(state => state.positionsReducer).total_intervals
    
    useKeepAwake()
    //Set up vars that handle the timer
    const [minute,setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [timerActive,setTimerActive] = useState(false)
    const [pitchData,setPitchData] = useState(updatePitchData(0))
    
    const countdown = true
    console.log(teamData.team_data[team_index].team_game_data)
    //code ripped from a website and it works
    useEffect(() => {
        if(timerActive)
        {const interval = setInterval(() => 
        {
            
            let updateMin = false
            setSecond(seconds => {
            
                if(seconds == 59)
                {
                    updateMin = true
                    
                    return 0
                }
                else
                {
                    
                    return seconds+1
                }
            })

            if(updateMin) 
            {
            
                //Update the pitch data and the displayed time
            
                setMinute(mins => mins+1)

                let notReachedEnd = minute+1 != intervalLength*totalInterval
                //Check to make sure end of game hasnt been reached to prevent indexing errors
                if(notReachedEnd)
                {
                    setPitchData(() => updatePitchData(minute+1))
                }
                //If its the end of the interval pause the timer and update the current interval
                if((minute+1) % intervalLength == 0)
                {
                  
                    setTimerActive(()=> false)
                    if(notReachedEnd) updateCurrentInterval(currentInterval+1)
                }
            }
                
        
            
        }, 1000);
        
        //Something about clearing the interval
        return () => clearInterval(interval);
        }
    }, [timerActive,minute]);

    function assignNameColor (player_id) 
  {

      //Prevent place holder values slipping through and causing erros
      if (player_id != null)
      {
          //Join on the name of the two lists and return the color
          var join = team_data.team_players.find(player => player.id == player_id)
          //0 for name, 1 for color
          return [join.name,join.color]
      }
      else{return[null,null]}

  }
    


    let formattedTime = minute%intervalLength+':'+second.toString().padStart(2,'0')
    

    if(countdown)
    {
        let min = intervalLength-(minute%intervalLength)
        //mod 60 is used to prevent a 60 being in it
        let sec = (60 - second)%60;
        if (sec != 0) min --
        formattedTime = min+':'+sec.toString().padStart(2,'0')
    }

    function updatePitchData(minute)
    {
        
        let data = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ]

        //Loop throgh the position data at that given minute 
        for(let i = 0; i < positionData.length; i++)
        {
            //Get the cords and initiisals data easily assecible
            let cords = positionData[i].position_cords
            let inititals = assignNameColor(positionData[i].position_timeline[minute])[0]
            
            data[cords[0]][cords[1]] = [inititals,inititals]
        }
        
        return data
    }

    

    return(
        
        <SafeAreaView style = {styles.body}>
            
            <View style = {styles.infoSide}>
                <View style = {styles.gameInfo}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style = {styles.titleText}>{teamName}</Text>
                    <Pressable 
                            onPress = {()=>{if(minute != totalInterval*intervalLength) setTimerActive(!timerActive)}}
                            style = {styles.icon}
                            >
                        <Text style={{fontSize:40}}>⏯️</Text>
                    </Pressable>
                    </View>
                    <Text style = {styles.generalText}>Interval {currentInterval}/{totalInterval}</Text>
                    <Text style = {styles.generalText}>{formattedTime}</Text>
                   
                

                </View>
                <View style = {styles.subInfo}>
                    <View style = {styles.subInfoHeader}>
                        <Text style = {{fontSize:24,marginVertical:10}}>Upcoming Subs (🗣️)</Text>
                        
                    </View>
                    <FlatList
                        renderItem={(item) => UpcomingSub(item,minute,second,currentInterval,intervalLength)}
                        keyExtractor ={item => item.subId}
                        data={subData.sort(function(a,b) {return a.subMin-b.subMin})}
                    />
                    
                </View>
            </View>
            <View style = {styles.pitchSide}>
                
               
                    <GamePitch layoutData = {pitchData}/>
                
                
                
            </View>
        </SafeAreaView>
    )
       
}
const styles = StyleSheet.create({
    body: {
     
        flex: 1,
        flexDirection: 'row'
    },
    iconBar: {
        flexDirection:'row',
        borderStartColor:'red'
    },
    icon: {
        padding:20,
        flex:1,
        alignItems:'flex-end'
    },
    infoSide: {
        margin:20,
        flex:1
    },
    pitchSide: {
        
        flex: 1,
        
        margin:20,
        marginVertical:40
    },
    gameInfo: {
      marginBottom:20
        
    },
    
    titleText: {
        fontSize: 40
    },
    subInfo: {
        
        flex: 3
    },
    generalText:{
        fontSize:24,
        
    }
   
   
    
    
})
export default (InGame);