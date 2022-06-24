import React, { useState,useEffect } from 'react'
import {Text,StyleSheet,View, Image,ImageBackground, Pressable} from 'react-native'
import { FlatList,SectionList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';


import UpcomingSub from './UpcomingSub.js'
import GameField from './GameField.js';

const totalColumns = 7;
const totalRows = 11;

function InGame()
{
    
    
    

    const DATA = new Array(totalRows*totalColumns).fill('TE');

    //Set up vars that handle the timer
    const [minute,setMinute] = useState(0)
    const [second, setSecond] = useState(0)
    const [timerActive,setTimerActive] = useState(true)


    //code ripped from a website and it works
    //https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
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

            if(updateMin) setMinute(mins => mins+1)
                
           
            
        }, 1000);
        
        //Something about clearing the interval
        return () => clearInterval(interval);
      }, []);




    let formattedTime = minute+':'+second.toString().padStart(2,'0')
    
    const subData = [{subId: 0, subMin: 5,subPlayerOn:'Tom',subPlayerOff: 'Toby',subPos:'LB'}]



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
                        data={subData}
                    />
                    
                </View>
            </View>
            <View style = {styles.pitchSide}>
            
                
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
        
        flex: 1
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