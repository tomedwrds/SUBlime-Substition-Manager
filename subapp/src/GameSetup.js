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
    const [positionless,setPoisitonless] = useState(false)
    const sportData = [{label:'Hockey 7 Aside', value:'7H'},{label:'Hockey 11 Aside',value:'11H'},{label: 'Junior Netball Yr 3-6',value:'N'},{label: 'Netball',value:'NS'},{label: 'Basketball',value:'B'},{label: 'Football 7 Aside',value:'7F'},{label: 'Football 9 Aside',value:'9F'},{label: 'Football 11 Aside',value:'11F'},{label: 'Rugby',value:'R'}]
  
    const positionSelectionDataAll =   
    [
        {   layoutId: 0,
            layoutName: 'The Classic', 
            layoutSport: '11H',
            layoutData: [
                    [0,0,0,['Centre Foward','CF'],0,0,0],
                    [['Left Foward','LF'],0,0,0,0,0,['Right Foward','RF']],
                    [0,['Left Inner','LI'],0,0,0,['Right Inner','RI'],0],
                    [0,0,0,['Centre Half','CH'],0,0,0],
                    [['Left Half','LH'],0,0,0,0,0,['Right Half','RH']],
                    [0,0,['Centre Back','CB'],0,['Centre Back','CB'],0,0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:1,
            layoutName: '3-4-3', 
            layoutSport: '11H',
            layoutData: [
                    [0,0,0,['Centre Foward','CF'],0,0,0],
                    [0,['Left Foward','LF'],0,0,0,['Right Foward','RF'],0],
                    [0,0,0,0,0,0,0],
                    [['Left Half','LH'],0,['Centre Half','CH'],0,['Centre Half','CH'],0,['Right Half','RH']],
                    [0,0,0,0,0,0,0],
                    [0,['Centre Back','CB'],0,['Centre Back','CB'],0,['Centre Back','CB'],0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:2,
            layoutName: 'Park the Bus',
            layoutSport: '11H', 
            layoutData: [
                    [0,0,0,['Centre Foward','CF'],0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,['Left Inner','LI'],0,0,0,['Right Inner','RI'],0],
                    [0,0,['Centre Half','CH'],0,['Centre Half','CH'],0,0],
                    [['Left Half','LH'],0,0,0,0,0,['Right Half','RH']],
                    [0,['Centre Back','CB'],0,['Centre Back','CB'],0,['Centre Back','CB'],0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:3,
            layoutName: '4-4-2', 
            layoutSport: '11H',
            layoutData: [
                    [0,0,0,0,0,0,0],
                    [0,['Left Foward','LF'],0,0,0,['Right Foward','RF'],0],
                    [0,0,0,0,0,0,0],
                    [['Left Half','LH'],0,['Centre Half','CH'],0,['Centre Half','CH'],0,['Right Half','RH']],
                    [0,0,0,0,0,0,0],
                    [['Left Back','LB'],0,['Centre Back','CB'],0,['Centre Back','CB'],0,['Right Back','RB']],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:4,
            layoutName: '2-2-2', 
            layoutSport: '7H',
            layoutData: [
                    [0,0,0,0,0,0,0],
                    [0,0,['Left Foward','LF'],0,['Right Foward','RF'],0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,['Left Half','LH'],0,['Right Half','RH'],0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,['Left Back','LB'],0,['Right Back','RB'],0,0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:5,
            layoutName: '3-3', 
            layoutSport: '7H',
            layoutData: [
                    [0,0,0,0,0,0,0],
                    [0,['Left Foward','LF'],0,['Centre Foward','CF'],0,['Right Foward','RF'],0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,['Left Back','LB'],0,['Centre Back','CB'],0,['Right Back','RB'],0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:6,
            layoutName: '7 aside', 
            layoutSport: '7H',
            layoutData: [
                    [0,0,0,['Striker','ST'],0,0,0],
                    [0,['Striker','ST'],0,0,0,['Striker','ST'],0],
                    [0,0,0,0,0,0,0],
                    [0,['Midfield','MF'],0,0,0,['Midfield','MF'],0],
                    [0,0,0,['Defender','DF'],0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:7,
            layoutName: 'The test',
            layoutSport: 'T', 
            layoutData: [
                    [0,0,0,0,0,0,0],
                    [0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,['Left Back','LB'],['Left Back','LB'],0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0]]
        },
        {
            layoutId:8,
            layoutName: 'Yr 3/4 Netball',
            layoutSport: 'N', 
            layoutData: [
                [0,0,0,0,0,0,0],
                [0,['Attack','A'],0,0,0,['Attack','A'],0],
                [0,0,0,0,0,0,0],
                [0,0,0,['Centre','C'],0,0,0],
                [0,0,0,0,0,0,0],
                [0,['Defence','D'],0,0,0,['Defence','D'],0],
                [0,0,0,0,0,0,0]]
        },
        {
            layoutId:9,
            layoutName: 'Yr 5/6 Netball',
            layoutSport: 'N', 
            layoutData: [
                    [0,0,0,0,0,0,0],
                    [0,['Attack','A'],0,0,0,['Attack','A'],0],
                    [0,0,0,0,0,0,0],
                    [0,0,['Centre','C'],0,['Centre','C'],0,0],
                    [0,0,0,0,0,0,0],
                    [0,['Defence','D'],0,0,0,['Defence','D'],0],
                    [0,0,0,0,0,0,0]]
        },
        {
            layoutId:10,
            layoutName: 'Basketball',
            layoutSport: 'B', 
            layoutData: [
                    [0,0,0,0,0,0,0],
                    
                    
                    [0,0,0,0,0,0,0],
                    [0,0,['Point Guard (1)','PG-1'],0,['Shooting Guard (2)', 'SG-2'],0,0],
                    [0,['Small Foward (3)',  'SF-3'],0,0,0,['Power Foward (4)', 'PF-4'],0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,['Centre (5)','C-5'],0,0,0],
                    
                    [0,0,0,0,0,0,0]]
        },
        {
            layoutId:11,
            layoutName: '4-3-3', 
            layoutSport: '11F',
            layoutData: [
                    [0,0,0,['Centre Foward','CF'],0,0,0],
                    [0,['Left Wing','LW'],0,0,0,['Right Wing','RW'],0],
                    [0,0,['Left Midfield','LM'],0,['Right Midfield','RM'],0,0],
                    [0,0,0,['Centre Defending Midfield','CDM'],0,0,0],
                    [['Left Back','LB'],0,0,0,0,0,['Right Back','RB']],
                    [0,0,['Centre Back','CB'],0,['Centre Back','CB'],0,0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:12,
            layoutName: '4-4-2', 
            layoutSport: '11F',
            layoutData: [
                    [0,0,['Centre Foward','CF'],0,['Centre Foward','CF'],0,0],
                    [0,0,0,0,0,0,0],
                    [0,['Left Midfield','LM'],0,0,0,['Right Midfield','RM'],0],
                    [0,0,['Centre Midfield','CM'],0,['Centre Midfield','CM'],0,0],
                    [['Left Back','LB'],0,0,0,0,0,['Right Back','RB']],
                    [0,0,['Centre Back','CB'],0,['Centre Back','CB'],0,0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:13,
            layoutName: '4-4-2 Diamond', 
            layoutSport: '11F',
            layoutData: [
                    [0,0,['Centre Foward','CF'],0,['Centre Foward','CF'],0,0],
                    
                    [0,0,0,['Centre Attacking Midfield','CAM'],0,0,0],
                    [0,0,['Centre Midfield','CM'],0,['Centre Midfield','CM'],0,0],
                    [0,0,0,['Centre Defending Midfield','CDM'],0,0,0],
                    [['Left Back','LB'],0,0,0,0,0,['Right Back','RB']],
                    [0,0,['Centre Back','CB'],0,['Centre Back','CB'],0,0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:14,
            layoutName: '3-4-3', 
            layoutSport: '11F',
            layoutData: [
                    [0,0,0,['Centre Foward','CF'],0,0,0],
                    [0,['Left Wing','LW'],0,0,0,['Right Foward','RW'],0],
                    [0,0,0,0,0,0,0],
                    [['Left Midfield','LM'],0,['Centre Midfield','CM'],0,['Centre Midfield','CM'],0,['Left Midfield','RM']],
                    [0,0,0,0,0,0,0],
                    [0,['Centre Back','CB'],0,['Centre Back','CB'],0,['Centre Back','CB'],0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:15,
            layoutName: '2-2-2', 
            layoutSport: '7F',
            layoutData:  
                [
                [0,0,0,0,0,0,0],
                [0,0,['Centre Foward','CF'],0,['Centre Foward','CF'],0,0],
                [0,0,0,0,0,0,0],
                [['Left Midfield','LM'],0,0,0,0,0,['Right Midfield','RM']],
                [0,0,['Centre Back','CB'],0,['Centre Back','CB'],0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:16,
            layoutName: 'Rugby', 
            layoutSport: 'R',
            layoutData: [
                    [0,0,['Loosehead Prop', 'LP'],['Hooker','H'],['Tighthead Prop', 'TP'],0,0],
                    [0,0,['Loosehead Lock', 'LL'],0,['Tighthead Lock', 'TL'],0,0],
                    [0,['Blindside Flanker','BF'],0,0,['Openside Flanker', 'OF'],0,0],
                    [0,0,['Number 8', 'N8'],['Scrum Half','SH'],0,0,0],
                    [0,0,0,['Fly Half','FH'],['Inside Centre','IC'],0,0],
                    [0,0,0,0,0,['Outside Centre','OC'],0],
                    [0,['Left Wing','LW'],0,0,['Full Back','FB'],0,['Right Wing','RW']]]
        },
        {
            layoutId:17,
            layoutName: 'Netball', 
            layoutSport: 'NS',
            layoutData: [
                    [0,0,0,['Goal Shoot','GS'],0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,['Goal Attack','GA'],0,0,0,['Wing Attack','WA'],0],
                    
                    [0,0,0,['Centre','C'],0,0,0],
                    
                    [0,['Wing Defence','WD'],0,0,0,['Goal Defence','GD'],0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,['Goal Keep','GK'],0,0,0]]
        },
        {
            layoutId:18,
            layoutName: '2-3-2-1', 
            layoutSport: '9F',
            layoutData: [
                [0,0,0,['Centre Foward','CF'],0,0,0],
                [0,['Left Wing','LW'],0,0,0,['Right Wing','RW'],0],
                [0,0,0,0,0,0,0],
                [['Left Midfield','LM'],0,0,['Centre Midfield','CM'],0,0,['Right Midfield','RM']],
                
                [0,0,0,0,0,0,0],
                [0,['Centre Back','CB'],0,0,0,['Centre Back','CB'],0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:19,
            layoutName: '3-2-3', 
            layoutSport: '9F',
            layoutData: [
                [0,0,0,['Centre Foward','CF'],0,0,0],
                [0,['Left Wing','LW'],0,0,0,['Right Wing','RW'],0],
                [0,0,0,0,0,0,0],
                [0,0,['Left Midfield','LM'],0,['Right Midfield','RM'],0,0],
                
                
                [0,['Left Back','LB'],0,0,0,['Right Back','RB'],0],
                [0,0,0,['Centre Back','CB'],0,0,0],
                [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
        {
            layoutId:20,
            layoutName: '3-3', 
            layoutSport: '7F',
            layoutData:  
                [
                    [0,0,0,0,0,0,0],
                    [0,['Left Wing','LW'],0,['Centre Foward','CF'],0,['Right Wing','RW'],0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0],
                    [0,['Left Back','LB'],0,['Centre Back','CB'],0,['Right Back','RB'],0],
                    [0,0,0,0,0,0,0],
                    [0,0,0,['Goal Keeper','GK'],0,0,0]]
        },
    ]   
        //Filters to only have formations relavent to sport code
        
    useEffect(() => {
        
        if(canAddTeam && !leavingPage)
        {

            let positionSelectionData = positionSelectionDataAll.filter(item => item.layoutSport == sport)
            positionSelectionData.forEach((item, i) => {
                item.layoutId = i
              });

         

            //Get the position related data 
            createTeam({team_id: teamIndex,team_name: name,team_player_data: {team_players:[],team_player_index:0},team_schedule_data: {team_schedules: [], team_schedule_index:0},team_game_data:{team_games:[],team_game_index:0},team_sport:sport,team_sport_full:fullSport,team_tutorial: [true,true,true,true,true,true],team_positionless:positionless,team_formation_data: { team_formations:positionSelectionData,team_formation_index:positionSelectionData.length}})
            updateCurrentTeamIndex(teamIndex)
            incrementTeamIndex(1)

            setCanAddTeam(false)
            setLeavingPage(true)
            props.navigation.navigate('TeamOverview',{screen:'Team'})
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
                <Text style = {{fontSize:40,marginBottom:20}}>Team Setup</Text>
                
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
                
                <View style = {styles.inputArea}>
                        <View style ={styles.subTextView}>
                            <Text style = {styles.fieldTitle}>Positionless</Text>
                            <Text style = {styles.infoText}>{`(Recommended for social teams)\nAssigns every position to\nevery player.`}</Text>
                        </View>
                        <Switch
                            value = {positionless}
                            onValueChange={()=>{setPoisitonless(!positionless)}}
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
        marginTop:24,
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