import React, { useState,useEffect } from 'react'
import {Text,StyleSheet,View,FlatList} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector } from 'react-redux';
import UpcomingSub from './UpcomingSub.js'
import GamePitch from './GamePitch.js';


//Note not globalized
const totalColumns = 7;
const totalRows = 7;




function InGame()
{
    
    
    const positionData = useSelector(state => state.numberReducer).position_data
    const subData =useSelector(state => state.numberReducer).game_data;
    

    //Set up vars that handle the timer
    const [minute,setMinute] = useState(0)
    const [second, setSecond] = useState(55)
    const [timerActive,setTimerActive] = useState(true)
    const [pitchData,setPitchData] = useState(updatePitchData(0))


    //code ripped from a website and it works
    useEffect(() => {
        const interval = setInterval(() => 
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
               
                setPitchData(() => updatePitchData(minute+1))
                setMinute(mins => mins+1)
            }
                
           
            
        }, 1000);
        
        //Something about clearing the interval
        return () => clearInterval(interval);
      }, []);

      


    let formattedTime = minute+':'+second.toString().padStart(2,'0')
    
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
                    <Text style = {styles.titleText}>Game Information</Text>
                    <Text style = {styles.generalText}>Game Information</Text>
                    <Text style = {styles.generalText}>Game Information</Text>
                    <Text style = {styles.generalText}>Game Information</Text>
                    <Text style = {styles.titleText}>{formattedTime}</Text>
                    

                </View>
                <View style = {styles.subInfo}>
                    <FlatList
                        renderItem={(item) => UpcomingSub(item,minute,second)}
                        keyExtractor ={item => item.subId}
                        data={subData.sort(function(a,b) {return a.subMin-b.subMin})}
                    />
                    
                </View>
            </View>
            <View style = {styles.pitchSide}>
                <View style = {{flex:1}}>
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
    infoSide: {
        backgroundColor: 'blue',
        flex:1
    },
    pitchSide: {
        
        flex: 1,
        backgroundColor:'yellow',
        margin:20
    },
    gameInfo: {
        backgroundColor: 'pink',
        flex: 2,
        color:'red'
    },
    
    titleText: {
        fontSize: 20
    },
    subInfo: {
        backgroundColor: 'yellow',
        flex: 3
    },
    subBar: {
        flexDirection: 'row',
        backgroundColor:'#00bfff',
        margin:20,
        borderRadius: 4,
        height: 60,
        alignItems: 'center'
    },
    nameText:{
        flex: 1,
        fontSize:20,
        textAlign:'center',
        color: 'white',
        borderWidth: 2,
        borderBottomColor: 'rgba(0,0,0,0)',
        borderTopColor: 'rgba(0,0,0,0)',
        borderLeftColor: 'white',
        borderRightColor: 'white'
    },
    sideText:
    {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize:20,
        color: 'white'
    },
    
})
export default (InGame);