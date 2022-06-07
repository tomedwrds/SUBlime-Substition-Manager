

import React from 'react'
import {Text,StyleSheet,View} from 'react-native'

function PlayerIcon(props)
{
    if(props.name != '')
    {
        return(
            <View style={{width: props.width,height: props.height}} >
                <View style = {styles.playerIcon}>
                    <Text style = {styles.playerIconText}>{props.name}</Text>    
                </View>  
            </View>
        )
    }
}

export default (PlayerIcon);

const styles = StyleSheet.create({
    playerIcon: {
        alignSelf: 'flex-start',
        padding: 6,
        backgroundColor:'red',
        borderRadius: 100,
        
    },
    playerIconText: {
        fontSize: 16
    }
    
})