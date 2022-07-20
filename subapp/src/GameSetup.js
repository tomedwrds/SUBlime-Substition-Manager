import React, { useEffect, useState } from "react";
import { Text,StyleSheet,View, TextInput, Pressable, Alert, Switch } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch,useSelector } from "react-redux";
import { should_mirror_intervals, update_interval_length,create_team, increment_team_index,update_team_name, update_total_intervals, update_current_team_index } from "./actions";
const GameSetup = ({navigation}) => 
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
 
    const [canAddTeam,setCanAddTeam] = useState(false)
    const [leavingPage,setLeavingPage] = useState(false)
    
  
    useEffect(() => {
        
        if(canAddTeam && !leavingPage)
        {

           
            createTeam({team_id: teamIndex,team_name: name,team_player_data: {team_players:[],team_player_index:0},team_schedule_data: {team_schedules: [], team_schedule_index:0},team_game_data:{team_games:[],team_game_index:0},team_sport:'undefined'})
            updateCurrentTeamIndex(teamIndex)
            incrementTeamIndex(1)

            setCanAddTeam(false)
            setLeavingPage(true)
            navigation.navigate('TeamOverview')
            
        }
    },[canAddTeam])


    useFocusEffect(()=>{
       
        setLeavingPage(false)
    })

    function saveSettings()
    {
        //Check if names have been changed
        if(name == null /*|| intervals == null || intervalW == null*/)
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
            // updateIntervalLength(intervalW)
            // updateTotalIntervals(intervals)
            if (!canAddTeam && !leavingPage) 
            {
                setCanAddTeam(true) 
                
                
            }


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
                <Text style = {{fontSize:28}}>Team Information</Text>
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
                    <RNPickerSelect
                        style = {pickerSelectStyles}
                        onValueChange={(value)=>{}}
                        items ={[{label:'Hockey', value:'Hockey'}]}
                        placeholder = {{label:'',value:null}}
                       
                        />
                        
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

export default (GameSetup)