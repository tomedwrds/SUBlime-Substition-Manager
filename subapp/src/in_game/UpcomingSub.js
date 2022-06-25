

import React from 'react'
import {Text,StyleSheet,View} from 'react-native'

function UpcomingSub({item},minute,second,currentInterval,intervalLength)
{
    
    //Get vars and make them easy to access
    let subMin = item.subMin
    let subPlayerOn = item.subPlayerOn
    let subPlayerOff = item.subPlayerOff
    let subPosition = item.subPos
    
    //Set up some consts
    const lingerTimeMin = 2
    const lingerTimeSec = 0
    
    //Determine the diffrence in time between the game time and the given time for the sub
    let minToSub = subMin - minute
    let secToSub = 60-second
    
    let formattedSubTime = 'a'
    
    //Used for counting down
    if (minToSub > 0)
    {    
        
        //If the secs are 60 make it equal to 0 if not minus 1 from min to sub as you are cutting down
        if (secToSub == 60)
        {
            secToSub = 0
        }
        else
        {
            minToSub -=1
        }
        formattedSubTime = '-'+(minToSub+':'+secToSub.toString().padStart(2,'0'))
    }
    //Used for when time has past and their is a lignering period
    else
    {
        //Set it to the actual second as its now counting the time over
        secToSub = second 
        formattedSubTime = '+'+( Math.abs(minToSub) +':'+secToSub.toString().padStart(2,'0'))
    }

    
    //Conditinal rendering to make old subs disappear and subs not within current quarter
    let hasOverLingered =!(Math.abs(minToSub) >= lingerTimeMin && second >= lingerTimeSec && minToSub < 0)
    let inInterval = (subMin > (currentInterval-1)* intervalLength && subMin <= currentInterval*intervalLength)

    if (hasOverLingered && inInterval)
    {
        return(
            <View style = {styles.subBar}>
                <Text style = {styles.sideText}>{formattedSubTime}</Text>
                <View style = {styles.nameBorder}>
                    <Text style = {styles.nameText}>{subPlayerOn} ➜ {subPlayerOff}</Text>
                </View> 
                <Text style = {styles.sideText}>{subPosition}</Text>
            </View>
        )
    }

}

export default (UpcomingSub);

const styles = StyleSheet.create({
  
    subBar: {
        flexDirection: 'row',
        backgroundColor:'#00bfff',
        margin:20,
        borderRadius: 4,
        height: 60,
        alignItems: 'center',
       
    },
    sideText:
    {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize:20,
        color: 'white'
    },
    nameText:{
        flex: 1,
        fontSize:20,
        textAlign: 'center',
        color: 'white',
        
       
        
    },
    nameBorder:
    {
        
        flex:1,
        height:'50%',
        borderLeftWidth:2,
        borderRightWidth:2,
        borderColor:'white',
        justifyContent:'center',
        alignItems:'center'
    }
    
})