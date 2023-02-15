import React, { useEffect, useState } from "react";
import { Text,StyleSheet,View, TextInput, Pressable, Alert, Switch, ScrollView, Modal } from "react-native";
import SafeViewAndroid from "./SafeViewAndroid";
import { SafeAreaView } from "react-native-safe-area-context";

import { useDispatch,useSelector } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import { should_mirror_intervals, update_interval_length,create_team, increment_team_index,update_team_name, update_total_intervals, update_current_team_index, update_formation_name, update_interval_selector } from "./actions";
const ScheduleSetup = (props) => 
{
    //Setup redux
    const dispatch = useDispatch()
    const updateIntervalLength = interval_length => dispatch(update_interval_length(interval_length))
    const updateTotalIntervals = intervals => dispatch(update_total_intervals(intervals))
    const shouldMirrorIntervals = data => dispatch(should_mirror_intervals(data))
    const updateFormationName = name => dispatch(update_formation_name(name))
    const updateIntervalSelector = data => dispatch(update_interval_selector(data))
   
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
            //Create the interval selector data
            let interval_selector = []
            if(intervalW >= 30)
            {
                //If its greater than 30 the interval is split into two parts. The lower section is a and upper section is b. We need to find the offset for the upper section
                const upper_interval_offset = Math.ceil(intervalW / 2)
                //Now add the data for each interval adding in the lower and upper section
                for(let interval = 0; interval < intervals; interval ++)
                {
                    interval_selector.push({intervalTag: (interval+1)+'a',upperIntervalOffset: upper_interval_offset,intervalValue:interval+1,lower:true},{intervalTag: (interval+1)+'b',upperIntervalOffset: upper_interval_offset,intervalValue:interval+1,lower:false})
                }
            }
            else
            {
                //Otherwise just create an interval selector without sub tags
                for(let interval = 0; interval < intervals; interval ++)
                {
                    interval_selector.push({intervalTag: (interval+1),upperIntervalOffset: intervalW,intervalValue:interval+1,lower:true})
                }
            }
           


            updateIntervalLength(intervalW)
            updateTotalIntervals(intervals)
            updateIntervalSelector(interval_selector)

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
        supportedOrientations={['landscape']}
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
                    
                            <SelectDropdown
                                data={Array.from({length: 4}, (_, i) => ({label: (i+1).toString(),value:(i+1)}))}
                                onSelect={(selectedItem, index) => {
                                    setIntervals(selectedItem.value);
                                    
                                }}
                                buttonTextAfterSelection={(selectedItem) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem.label
                                }}
                                rowTextForSelection={(item) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item.label
                                }}
                                defaultButtonText={' '}
                                buttonStyle = {styles.dropDown}
                                buttonTextStyle={styles.dropDownText}
                                rowTextStyle={styles.dropDownText}
                                rowStyle={{borderRadius:4}}
                                dropdownStyle={{borderRadius:9}}
                            />
                            </View>
                            
                    </View>
                    <View style = {styles.inputArea}>
                        <View style ={styles.subTextView}>
                            <Text style = {styles.fieldTitle}>Interval Length</Text>
                            <Text style = {styles.infoText}>Length of each interval in minutes</Text>
                        </View>
                        <View style ={{borderRadius:9,overflow:'hidden'}}>
                            <SelectDropdown
                                data={Array.from({length: 45}, (_, i) => ({label: (i+1).toString(),value:(i+1)}))}
                                onSelect={(selectedItem, index) => {
                                    setIntervalW(selectedItem.value);
                                    
                                }}
                                buttonTextAfterSelection={(selectedItem) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem.label
                                }}
                                rowTextForSelection={(item) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item.label
                                }}
                                defaultButtonText={' '}
                                buttonStyle = {styles.dropDown}
                                buttonTextStyle={styles.dropDownText}
                                rowTextStyle={styles.dropDownText}
                                rowStyle={{borderRadius:4}}
                                dropdownStyle={{borderRadius:9}}
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
       flex:1,
       marginTop:24,
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
    },
    dropDown: {
        
        fontSize: 20,
        backgroundColor: '#ebebeb',
        padding:0,
        fontSize:24,
        borderRadius:9,
        width:450,
        height:60,
  
        
        textAlign: 'center',
    },
    dropDownText: {
        fontSize: 24,
        color: 'black',
    }
})


export default (ScheduleSetup)