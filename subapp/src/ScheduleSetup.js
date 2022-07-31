import React, { useEffect, useState } from "react";
import { Text,StyleSheet,View, TextInput, Pressable, Alert, Switch, ScrollView, Modal } from "react-native";
import SafeViewAndroid from "./SafeViewAndroid";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch,useSelector } from "react-redux";
import { should_mirror_intervals, update_interval_length,create_team, increment_team_index,update_team_name, update_total_intervals, update_current_team_index, update_formation_name } from "./actions";
const ScheduleSetup = (props) => 
{
    //Setup redux
    const dispatch = useDispatch()
    const updateIntervalLength = interval_length => dispatch(update_interval_length(interval_length))
    const updateTotalIntervals = intervals => dispatch(update_total_intervals(intervals))
    const shouldMirrorIntervals = data => dispatch(should_mirror_intervals(data))
    const updateFormationName = name => dispatch(update_formation_name(name))
   
    const mirror = useSelector(state => state.positionsReducer).mirror_intervals
  

  

    //Setup hooks
    const [intervals,setIntervals] = useState(null)
    const [intervalW,setIntervalW] = useState(null)
    const [name,setName] = useState(null)
    
  
  

    function saveSettings()
    {
        //Check if names have been changed
        if(intervals == null || intervalW == null || name == null)
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
            updateFormationName(name)
            props.toggleModalSetup()
            props.toggleModalFormations()


        }
    }

    


    
    return(
        <Modal
        transparent={false}
        visible={props.displayModal}
        onRequestClose={props.toggleModalSetup}
        animationType={'slide'}
        onShow={()=>{setIntervals(null);setIntervalW(null);setName(null)}}
        >
            <SafeAreaView style = {styles.container} >
                <View style = {styles.header}>
                    <Text style = {{fontSize:40,marginBottom:10}}>Subsheet Settings</Text>
                    <Pressable 
                        onPress={()=>{props.toggleModalSetup()}}
                        style = {{flex:1,alignItems:'flex-end'}}>
                        <Text style = {{fontSize:40}}>⬅️</Text>
                    </Pressable>
                    <Pressable 
                        onPress={()=>{saveSettings()}}
                        style = {{alignItems:'flex-end'}}>
                        <Text style = {{fontSize:40}}>✅</Text>
                    </Pressable>
                </View>
                <ScrollView style ={{paddingBottom:100}} >
                    
                  
                    <View style = {styles.inputArea}>
                        <View style ={styles.subTextView} >
                            <Text style = {styles.fieldTitle}>Subsheet Name</Text>
                        </View>
                        <TextInput 
                            placeholderTextColor={'#bfbbbb'} 
                            style = {{backgroundColor:'#ebebeb',borderRadius:9,fontSize:20,padding:12,width:450,textAlign:'center'}}
                        
                            onChangeText={(value)=>setName(value)}
                            />
                            
                    </View>
                    <View style = {styles.inputArea}>
                        <View style ={styles.subTextView} >
                            <Text style = {styles.fieldTitle}>Total Intervals</Text>
                            <Text style = {styles.infoText}>2 - halfs 3 - thirds 4 - quarters</Text>
                        </View>
                        <View style ={{borderRadius:9,overflow:'hidden'}}>
                        <RNPickerSelect
                            style = {pickerSelectStyles}
                            onValueChange={(value)=>{setIntervals(value)}}
                            items ={Array.from({length: 4}, (_, i) => ({label: (i+1).toString(),value:(i+1)}))}
                            placeholder = {{label:'',value:null}}
                            useNativeAndroidPickerStyle={false}
                        
                            />
                            </View>
                            
                    </View>
                    <View style = {styles.inputArea}>
                        <View style ={styles.subTextView}>
                            <Text style = {styles.fieldTitle}>Interval Length</Text>
                            <Text style = {styles.infoText}>Length of each interval in minutes</Text>
                        </View>
                        <View style ={{borderRadius:9,overflow:'hidden'}}>
                            <RNPickerSelect
                            style = {pickerSelectStyles}
                            onValueChange={(value)=>{setIntervalW(value)}}
                            items ={Array.from({length: 100}, (_, i) => ({label: (i+1).toString(),value:(i+1)}))}
                            placeholder = {{label:'',value:null}}
                            useNativeAndroidPickerStyle={false}
                            />
                        </View>
                    </View>
                
                    <View style = {styles.inputArea}>
                        <View style ={styles.subTextView}>
                            <Text style = {styles.fieldTitle}>Mirror Intervals</Text>
                            <Text style = {styles.infoText}>{`(Recommended)\nMakes the subsheet of every\ninterval identical to the first one.`}</Text>
                        </View>
                        <Switch
                            value = {mirror}
                            onValueChange={()=>{shouldMirrorIntervals(!mirror)}}
                        />
                    </View>
                    
            
                
                
                
                </ScrollView>
            </SafeAreaView>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
       marginHorizontal:20,
       flex:1
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
      
        fontSize: 1,
        color: 'black',
        fontSize: 20,
        backgroundColor: '#ebebeb',
        padding:12,
 
        borderRadius:9,
        width:450,
        
        alignItems:'center',
        justifyContent:'center',
        
        textAlign: 'center',
      
   
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