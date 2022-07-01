import React, { useState } from "react";
import { Text,StyleSheet,View, TextInput, Pressable, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch } from "react-redux";
import { update_interval_length, update_team_name, update_total_intervals } from "./actions";
const GameSetup = ({navigation}) => 
{
    //Setup redux
    const dispatch = useDispatch()
    const updateTeamName = name =>                  dispatch(update_team_name(name))
    const updateIntervalLength = interval_length => dispatch(update_interval_length(interval_length))
    const updateTotalIntervals = intervals => dispatch(update_total_intervals(intervals))

    //Setup hooks
    const [name,setName] = useState(null)
    const [intervals,setIntervals] = useState(null)
    const [intervalW,setIntervalW] = useState(null)

    function saveSettings()
    {
        //Check if names have been changed
        if(name == null || intervals == null || intervalW == null)
        {
           
           
            Alert.alert(
                "Error",
                "Selection not complete",
                [
                  {
                    text: "Dismiss",
                    
                  },
                  
                ]
              );
        }
        else
        {
            updateTeamName(name)
            updateIntervalLength(intervalW)
            updateTotalIntervals(intervals)
            navigation.navigate('Formation')
        }
    }
    


    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {{fontSize:40,marginBottom:20}}>Game Setup 🤓</Text>
                <Pressable 
                    onPress={()=>{saveSettings()}}
                    style = {{flex:1,alignItems:'flex-end'}}>
                    <Text style = {{fontSize:40}}>✅</Text>
                </Pressable>
            </View>
            <ScrollView >
                <Text style = {{fontSize:28}}>General Settings</Text>
                <View style = {styles.inputArea}>
                    
                    <TextInput 
                        placeholderTextColor={'#bfbbbb'} 
                        style = {{backgroundColor:'#ebebeb',borderRadius:9,fontSize:24,padding:12,width:450,textAlign:'center'}}
                        placeholder="Enter Team Name"
                        onChangeText={(value)=>setName(value)}
                        />
                    
                </View>
                <Text style = {{fontSize:28}}>Game Settings</Text>
                <View style = {styles.inputArea}>
                    
                    <RNPickerSelect
                        style = {pickerSelectStyles}
                        onValueChange={(value)=>{setIntervals(value)}}
                        items ={Array.from({length: 4}, (_, i) => ({label: (i+1).toString(),value:(i+1)}))}
                        placeholder = {{label:'Select Total Intervals',value:null}}
                       
                        />
                        
                </View>
                <View style = {styles.inputArea}>
                    
                    <RNPickerSelect
                    style = {pickerSelectStyles}
                    onValueChange={(value)=>{setIntervalW(value)}}
                    items ={Array.from({length: 100}, (_, i) => ({label: (i+1).toString(),value:(i+1)}))}
                    placeholder = {{label:'Select Interval Length',value:null}}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin:20
    },
    inputArea: {
        flexDirection:'row',
        
        marginVertical:8,
        
        alignItems:'center',
        
     
        
       
    },
    subText: {
        fontSize:24,
      
    
    },
    header: {
        flexDirection:'row'
    }
})

const pickerSelectStyles = StyleSheet.create({
  
    inputAndroid: {
      
      color: 'black',
      fontSize: 20,
  
      width:'100%',
      height:'100%',
      
   
  },
    
     


    inputIOS: {
     
      fontSize: 16,
      color: 'black',
      fontSize: 20,
      backgroundColor: '#ebebeb',
      padding:12,
      fontSize:24,
      borderRadius:9,
      width:450,

      
      textAlign: 'center',

  
   
    
  
    
  },
    placeholder: {
      color: '#bfbbbb'
    }
  });

export default (GameSetup)