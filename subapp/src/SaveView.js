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
                    <Icon 
                        name='check' 
                        size = {40} 
                        color = 'green'
                    />
                </Pressable>
                <Pressable 
                    style = {styles.icon}
                    onPress = {deleteTeam}
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
    },
    textContainer:{
       
      
        justifyContent:'center'
       
    }
})

export default (SaveView)