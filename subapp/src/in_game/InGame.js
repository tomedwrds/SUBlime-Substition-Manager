import React, { useState,useEffect } from 'react'
import {Text,StyleSheet,View,FlatList,Pressable} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector,useDispatch } from 'react-redux';
import UpcomingSub from './UpcomingSub.js'
import GamePitch from './GamePitch.js';
import { update_current_interval } from '../actions.js';


//Note not globalized
const totalColumns = 7;
const totalRows = 7;




function InGame()
{
    
    const dispatch = useDispatch()
    const positionData = useSelector(state => state.positionsReducer).position_data
    const subData =useSelector(state => state.generalReducer).game_data;
    const currentInterval =useSelector(state => state.generalReducer).current_interval;
    const intervalLength = useSelector(state => state.generalReducer).interval_length
    const updateCurrentInterval = interval => dispatch(update_current_interval(interval))
    const totalInterval = useSelector(state => state.generalReducer).total_intervals
    //Set up vars that handle the timer
    const [minute,setMinute] = useState(1)
    const [second, setSecond] = useState(50)
    const [timerActive,setTimerActive] = useState(false)
    const [pitchData,setPitchData] = useState(updatePitchData(0))
    
    
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
                
        
            
        }, 100);
        
        //Something about clearing the interval
        return () => clearInterval(interval);
        }
    }, [timerActive,minute]);


      


    let formattedTime = minute%intervalLength+':'+second.toString().padStart(2,'0')
    
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
            let inititals = positionData[i].position_timeline[minute].name
            
            data[cords[0]][cords[1]] = [inititals,inititals]
        }
        
        return data
    }

    

    return(
        <SafeAreaView style = {styles.body}>
            <View style = {styles.infoSide}>
                <View style = {styles.gameInfo}>
                    <Text style = {styles.titleText}>St Andrews College v St Bedes</Text>
                    <Text style = {styles.generalText}>Placeholder</Text>
                    <Text style = {styles.generalText}>Placeholder</Text>
                    <Text style = {styles.generalText}>Placeholder</Text>
                    

                </View>
                <View style = {styles.subInfo}>
                    <View style = {styles.subInfoHeader}>
                        <Text style = {{fontSize:24,marginVertical:10}}>Upcoming Subs (🗣️)</Text>
                    </View>
                    <FlatList
                        renderItem={(item) => UpcomingSub(item,minute,second,currentInterval,intervalLength)}
                        keyExtractor ={item => item.subId}
                        data={subData/*.sort(function(a,b) {return a.subMin-b.subMin})*/}
                    />
                    
                </View>
            </View>
            <View style = {styles.pitchSide}>
                <View style = {{flex:1,flexDirection:'row'}}>
                    <Text style = {{...styles.titleText,flex:1}}>{formattedTime}(🕒)</Text>
                    <View style ={styles.iconBar}>
                        <Pressable 
                            onPress = {()=>{setTimerActive(true)}}
                            style = {styles.icon}
                            >
                            <Icon 
                                name='play'
                                size = {30} 
                                color = 'green'
                            />
                        </Pressable>
                        <Pressable 
                            onPress = {()=>setTimerActive(false)}
                            style = {styles.icon}
                            >
                            <Icon 
                                name='pause' 
                                size = {30} 
                                color = 'green'
                            />
                        </Pressable>
                        <Pressable 
                            onPress = {()=>{}}
                            style = {styles.icon}
                            >
                            <Icon 
                                name='forward' 
                                size = {30} 
                                color = 'green'
                            />
                        </Pressable>
                    </View>
                </View>
                <View style = {{flex:6}}>
                    <GamePitch layoutData = {pitchData}/>
                </View>
                
                
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
        padding:20
    },
    infoSide: {
        margin:20,
        flex:1
    },
    pitchSide: {
        
        flex: 1,
        
        margin:20
    },
    gameInfo: {
        
        flex: 1,
        
    },
    
    titleText: {
        fontSize: 30
    },
    subInfo: {
        
        flex: 3
    },
    generalText:{
        fontSize:16,
        color:'darkgrey'
    }
   
   
    
    
})
export default (InGame);