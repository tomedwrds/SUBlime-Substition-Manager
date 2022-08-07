import React, { useEffect, useState } from "react";
import { Text,StyleSheet,View, TextInput, Pressable, Alert, Switch, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

import { useDispatch,useSelector } from "react-redux";
import { should_mirror_intervals, update_interval_length,create_team, increment_team_index,update_team_name, update_total_intervals, update_current_team_index } from "./actions";
import SelectDropdown from "react-native-select-dropdown";
const GameSetup = (props) => 
{
  
    //Setup redux
    const dispatch = useDispatch()
    const updateTeamName = name =>                  dispatch(update_team_name(name))
   
    const createTeam = team_data => dispatch(create_team(team_data))
    const incrementTeamIndex = data => dispatch(increment_team_index(data))
    const mirror = useSelector(state => state.generalReducer).mirror_intervals
    const teamIndex = useSelector(state => state.teamReducer).team_index

    const updateCurrentTeamIndex = index => dispatch(update_current_team_index(index))

    //Setup hooks
    const [name,setName] = useState(null)
    const [sport,setSport] = useState(null)
    const [fullSport,setFullSport] = useState(null)
 
    const [canAddTeam,setCanAddTeam] = useState(false)
    const [leavingPage,setLeavingPage] = useState(false)
    const sportData = [{label:'Hockey 7 Aside', value:'7H'},{label:'Hockey 11 Aside',value:'11H'},{label: 'Junior Netball Yr 3-6',value:'N'},{label: 'Netball',value:'NS'},{label: 'Basketball',value:'B'},{label: 'Football 7 Aside',value:'7F'},{label: 'Football 8 Aside',value:'8F'},{label: 'Football 11 Aside',value:'11F'},{label: 'Rugby',value:'R'},{label: 'Test', value:'T'}]
  
    useEffect(() => {
        
        if(canAddTeam && !leavingPage)
        {

            
            //Get the position related data 
            createTeam({team_id: teamIndex,team_name: name,team_player_data: {team_players:[],team_player_index:0},team_schedule_data: {team_schedules: [], team_schedule_index:0},team_game_data:{team_games:[],team_game_index:0},team_sport:sport,team_sport_full:fullSport,team_tutorial: [true,true,true,true,true]})
            updateCurrentTeamIndex(teamIndex)
            incrementTeamIndex(1)

            setCanAddTeam(false)
            setLeavingPage(true)
            props.navigation.navigate('TeamOverview',{screen:'Subsheets'})
            props.closeModal()
            
        }
    },[canAddTeam])


    useFocusEffect(()=>{
       
        setLeavingPage(false)
    })

    function saveSettings()
    {
        //Check if names have been changed
        if(name == null || sport == null)
        {
           
            
            Alert.alert(
                "Insufficent Information",
                "Fill in all of the fields in order to progress",
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
            // updateIntervalLength(intervalW)
            // updateTotalIntervals(intervals)
            if (!canAddTeam && !leavingPage) 
            {
                setCanAddTeam(true) 
                
                
            }


        }
    }

    


    
    return(
        <Modal 
        transparent={false}
        visible={props.displayModal}
        onRequestClose={props.closeModal}
        animationType={'slide'}
        onShow={()=>{setSport(null);setName(null)}}
        supportedOrientations={['landscape']}
        >
        <SafeAreaView style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {{fontSize:40,marginBottom:20}}>Game Setup</Text>
                
                <Pressable 
                    onPress={()=>{props.closeModal()}}
                    style = {{alignItems:'flex-end',flex:1}}>
                    <Text style = {{fontSize:40}}>⬅️</Text>
                </Pressable>
                <Pressable 
                    onPress={()=>{saveSettings()}}
                    style = {{alignItems:'flex-end'}}>
                    <Text style = {{fontSize:40}}>✅</Text>
                </Pressable>
            </View>
            <Text style = {{fontSize:28}}>Enter Team Information</Text>
            <ScrollView style = {{flex:1}}>
                
                <View style = {styles.inputArea}>
                    <View style ={styles.subTextView} >
                        <Text style = {styles.fieldTitle}>Team Name</Text>
                    </View>
                    <TextInput 
                        placeholderTextColor={'#bfbbbb'} 
                        style = {{backgroundColor:'#ebebeb',borderRadius:9,fontSize:24,padding:12,width:450,textAlign:'center'}}
                      
                        onChangeText={(value)=>setName(value)}
                        />
                    
                </View>
              
                <View style = {styles.inputArea}>
           
                    <View style ={styles.subTextView} >
                        <Text style = {styles.fieldTitle}>Sport</Text>
                        
                    </View>
                    <SelectDropdown
                        data={sportData}
                        onSelect={(selectedItem, index) => {
                            setSport(selectedItem.value);
                             setFullSport(sportData[index].label)
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
                    {/* <RNPickerSelect
                        style = {pickerSelectStyles}
                        onValueChange={(value,i)=>{setSport(value); setFullSport(sportData[i-1].label)}}
                        items ={sportData}
                        placeholder = {{label:'',value:null}}
                        useNativeAndroidPickerStyle={false}
                       
                        /> */}
                        
                </View>
                {/* <Text style = {{fontSize:28}}>Game Settings</Text>
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
                </View> */}
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
        height:60,
        
     
        
       
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


    
  
    


export default (GameSetup)