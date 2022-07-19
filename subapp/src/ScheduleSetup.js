import React, { useEffect, useState } from "react";
import { Text,StyleSheet,View, TextInput, Pressable, Alert, Switch } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch,useSelector } from "react-redux";
import { should_mirror_intervals, update_interval_length,create_team, increment_team_index,update_team_name, update_total_intervals, update_current_team_index } from "./actions";
const ScheduleSetup = ({navigation}) => 
{
    //Setup redux
    const dispatch = useDispatch()
    const updateIntervalLength = interval_length => dispatch(update_interval_length(interval_length))
    const updateTotalIntervals = intervals => dispatch(update_total_intervals(intervals))
    const shouldMirrorIntervals = data => dispatch(should_mirror_intervals(data))
   
    const mirror = useSelector(state => state.generalReducer).mirror_intervals
  

  

    //Setup hooks
    const [intervals,setIntervals] = useState(null)
    const [intervalW,setIntervalW] = useState(null)
    
    
  
  

    function saveSettings()
    {
        //Check if names have been changed
        if(intervals == null || intervalW == null)
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
            updateIntervalLength(intervalW)
            updateTotalIntervals(intervals)
            navigation.navigate('Formation')


        }
    }

    


    
    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {{fontSize:40,marginBottom:20}}>Schedule Setup 🤓</Text>
                <Pressable 
                    onPress={()=>{saveSettings()}}
                    style = {{flex:1,alignItems:'flex-end'}}>
                    <Text style = {{fontSize:40}}>✅</Text>
                </Pressable>
            </View>
            <ScrollView >
                
                <Text style = {{fontSize:28}}>Game Settings</Text>
                <View style = {styles.inputArea}>
                    <View style ={styles.subTextView} >
                        <Text style = {styles.fieldTitle}>Total Intervals</Text>
                        <Text style = {styles.infoText}>2 - halfs 3 - thirds 4 - quarters</Text>
                    </View>
                    <RNPickerSelect
                        style = {pickerSelectStyles}
                        onValueChange={(value)=>{setIntervals(value)}}
                        items ={Array.from({length: 4}, (_, i) => ({label: (i+1).toString(),value:(i+1)}))}
                        placeholder = {{label:'',value:null}}
                       
                        />
                        
                </View>
                <View style = {styles.inputArea}>
                    <View style ={styles.subTextView}>
                        <Text style = {styles.fieldTitle}>Interval Length</Text>
                        <Text style = {styles.infoText}>Length of each interval in minutes</Text>
                    </View>
                    <RNPickerSelect
                    style = {pickerSelectStyles}
                    onValueChange={(value)=>{setIntervalW(value)}}
                    items ={Array.from({length: 100}, (_, i) => ({label: (i+1).toString(),value:(i+1)}))}
                    placeholder = {{label:'',value:null}}
                    />
                </View>
                <View style = {styles.inputArea}>
                    <View style ={styles.subTextView}>
                        <Text style = {styles.fieldTitle}>Mirror Intervals</Text>
                        <Text style = {styles.infoText}>{`Makes the schedule of every\ninterval identical to the first one`}</Text>
                    </View>
                    <Switch
                        value = {mirror}
                        onValueChange={()=>{shouldMirrorIntervals(!mirror)}}
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
    subTextView: {
        width: 200
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
    },
    fieldTitle: {
        fontSize:20
    },
    infoText: {
        fontSize:10,
        color:'grey'
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

export default (ScheduleSetup)