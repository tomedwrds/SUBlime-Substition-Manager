

import React from 'react'
import {Text,StyleSheet,View} from 'react-native'

function UpcomingSub(props)
{
    return(
        <View style = {styles.subBar}>
            <Text style = {styles.sideText}>{props.time}</Text>
            <Text style = {styles.nameText}>{props.playerOn} ➜ {props.playerOn}</Text>
            <Text style = {styles.sideText}>{props.subPos}</Text>
        </View>
    )

}

export default (UpcomingSub);

const styles = StyleSheet.create({
  
    subBar: {
        flexDirection: 'row',
        backgroundColor:'#00bfff',
        margin:20,
        borderRadius: 4,
        height: 60,
        alignItems: 'center'
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
        textAlign:'center',
        color: 'white',
        borderWidth: 2,
        borderBottomColor: 'rgba(0,0,0,0)',
        borderTopColor: 'rgba(0,0,0,0)',
        borderLeftColor: 'white',
        borderRightColor: 'white'
    }
    
})