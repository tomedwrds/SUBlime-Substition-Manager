import React from "react";
import { Text,View,StyleSheet,Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function SaveView ({item},loadData) 
{
    
   
    return(
        <View style = {styles.body}>
            <View style = {styles.textContainer}>
                <Text>{item.saveName}</Text>
                <Text>4-3-2-1</Text>
                <Text>some date</Text>
            </View>
            <View style = {styles.iconContainer}>
                <Pressable 
                    style = {styles.icon}
                    onPress = {loadData}
                    >
                    <Icon 
                        name='check' 
                        size = {30} 
                        color = 'green'
                    />
                </Pressable>
                <Pressable 
                    style = {styles.icon}
                    onPress = {()=>{}}
                    >
                    <Icon 
                        name='trash' 
                        size = {30} 
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
        padding:20
        
    },
    iconContainer: {
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    icon: {
        padding: 20
    }
})

export default (SaveView)