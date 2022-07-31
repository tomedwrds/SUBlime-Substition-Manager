import React from "react";
import { Text,View,StyleSheet,Pressable,Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function SaveView ({item},loadData,deleteSaveData) 
{
    
    const deleteTeam = () => {
        //Create alert to show to player
        Alert.alert(
          "Do you wish to delete this this team?",
          'Once deleted the team is permanently gone',
          [
            //Creates an array of selectable player
            {
              text: "Cancel",
              style: "cancel"
            },
            { 
              text: "Confirm", 
              onPress: () => deleteSaveData(item.team_id)
             
            }
          ]
        )
      }
    return(
        <View style = {styles.body}>
            <View style = {styles.textContainer}>
                <Text style = {styles.titleText}>{item.team_name}</Text>
               
               
            </View>
            <View style = {styles.iconContainer}>
                <Pressable 
                    style = {styles.icon}
                    onPress = {()=>{loadData(item.team_id)}}
                    >
                    <Text style = {{fontSize:40}}>✅</Text>
                </Pressable>
                <Pressable 
                    style = {styles.icon}
                    onPress = {deleteTeam}
                    >
                    <Text style = {{fontSize:40}}>❌</Text>
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
        padding: 4
    },
    titleText: {
        fontSize:32
    },
    subText: {
        color: 'darkgray'
    },
    textContainer:{
       
      
        justifyContent:'center'
       
    }
})

export default (SaveView)