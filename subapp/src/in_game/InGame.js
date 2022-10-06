import React, { useState,useEffect } from 'react'
import {Text,StyleSheet,View,FlatList,Pressable,Modal} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector,useDispatch } from 'react-redux';
import UpcomingSub from './UpcomingSub.js'
import GamePitch from './GamePitch.js';
import { update_current_interval,update_team_tutorial } from '../actions.js';
import { useKeepAwake } from 'expo-keep-awake';
//Note not globalized
const totalColumns = 7;
const totalRows = 7;




function InGame(props)
{
    
    const dispatch = useDispatch()
    const positionData = useSelector(state => state.positionsReducer).position_data
    const subData =useSelector(state => state.generalReducer).game_data;
    
    const generalData = useSelector(state => state.generalReducer)
    const teamData =useSelector(state => state.teamReducer);



    //Used to account for deletion of certain items when going on index
    const team_id = generalData.current_team_index
    const adjusted_team_index = teamData.team_data.findIndex(item => item.team_id == team_id)

    const team_data = teamData.team_data[adjusted_team_index].team_player_data
    
    
    const intervalLength = useSelector(state => state.positionsReducer).interval_length;
    const teamName = teamData.team_data[adjusted_team_index].team_name
   
    const totalInterval = useSelector(state => state.positionsReducer).total_intervals
    const updateTeamTutorial = data => dispatch(update_team_tutorial(data))
    useKeepAwake()
    //Set up vars that handle the timer
    const second = props.second
    const setSecond = props.setSecond
    const minute = props.minute
    const setMinute = props.setMinute
    const [timerActive,setTimerActive] = useState(false)
    const [pitchData,setPitchData] = useState(updatePitchData(0))
    

    const countdown = true
    
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
                    if(notReachedEnd) props.updateActiveGameInterval(props.activeGameInterval+1)
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
          
          if (join != undefined)
        {
            //0 for name, 1 for color
            return [join.name,join.color]
        }
        else
        {
            return ['Deleted Player', 'red']
        }
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
            <Modal
          animationType="slide"
          transparent={true}
          supportedOrientations={['landscape']}
          visible={teamData.team_data[adjusted_team_index].team_tutorial[4]} 
          onRequestClose={() => {updateTeamTutorial([team_id,4])}}
      >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={{fontSize:32,marginBottom:20}}>Welcome to SUBlime – Gametime</Text>
                  <Text style = {{textAlign:'center'}}>{'Let the games begin. This screen displays a countdown to upcoming substitutions on the left and the field of play on the right. If you need to make changes to the Subsheet during the match head over to the Subsheet page.\n\nPress the ‘⏯’ to start the match\n'}</Text>
                 
                  <View style = {{flexDirection:'row'}}>
                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {updateTeamTutorial([team_id,4])}}
                  >
                  <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  </View>
              </View>
          </View>
      </Modal>
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
                    <View style = {{flexDirection:'row'}}>

                    <Text style = {{...styles.generalText,flex:1}}>{formattedTime}</Text>
                    <Text style = {styles.generalText}>Interval {props.activeGameInterval}/{totalInterval}</Text>
                    </View>
                   
                

                </View>
                <View style = {styles.subInfo}>
                    <View style = {styles.subInfoHeader}>
                        <Text style = {{fontSize:24,marginVertical:5}}>Upcoming Subs</Text>
                        
                    </View>
                    <FlatList
                        renderItem={(item) => UpcomingSub(item,minute,second,props.activeGameInterval,intervalLength)}
                        keyExtractor ={item => item.subId}
                        data={subData.sort(function(a,b) {return a.subMin-b.subMin})}
                    />
                    
                </View>
            </View>
            <View style = {styles.pitchSide}>
                
               
                    <GamePitch layoutData = {pitchData} sport ={teamData.team_data[adjusted_team_index].team_sport}/>
                
                
                
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
        marginHorizontal:20,
        flex:1
    },
    pitchSide: {
        
        flex: 1,
        
        margin:20,
        marginVertical:40
    },
    gameInfo: {
      marginBottom:5
        
    },
    
    titleText: {
        fontSize: 40
    },
    subInfo: {
        
        flex: 3
    },
    generalText:{
        fontSize:24,
        
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
   
   
    
    
})
export default (InGame);