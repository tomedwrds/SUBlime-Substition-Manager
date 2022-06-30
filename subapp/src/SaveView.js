import React from "react";
import { Text,View,StyleSheet,Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function SaveView ({item},loadData,deleteSaveData) 
{
    
   
    return(
        <View style = {styles.body}>
            <View style = {styles.textContainer}>
                <Text style = {styles.titleText}>{item.save_name}</Text>
                <Text style = {styles.subText} >Formation Placeholder</Text>
                <Text style = {styles.subText} >Data Placeholder</Text>
            </View>
            <View style = {styles.iconContainer}>
                <Pressable 
                    style = {styles.icon}
                    onPress = {()=>{loadData(item.save_id)}}
                    >
                    <Icon 
                        name='check' 
                        size = {40} 
                        color = 'green'
                    />
                </Pressable>
                <Pressable 
                    style = {styles.icon}
                    onPress = {()=>{deleteSaveData(item.save_id)}}
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
        fontSize:24
    },
    subText: {
        color: 'darkgray'
    }
})

export default (SaveView)