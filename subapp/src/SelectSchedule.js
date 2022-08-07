import React from "react";
import { Text,View,StyleSheet,Pressable,FlatList,Alert,Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { delete_schedule, update_layout,update_interval_length,update_total_intervals,should_mirror_intervals, update_team_tutorial } from "./actions";
import ScheduleSetup from "./ScheduleSetup";
import FormationSelection from "./FormationSelection";
import { useFocusEffect } from "@react-navigation/native";
const SelectSchedule = ({navigation}) => {

    const dispatch = useDispatch()
    const teamData = useSelector(state => state.teamReducer);
    const generalData = useSelector(state =>state.generalReducer)
    const team_id  = generalData.current_team_index
    const adjusted_team_index = teamData.team_data.findIndex(item => item.team_id == team_id)
    const deleteSchedule = index => dispatch(delete_schedule(index))
    const scheduleData = teamData.team_data[adjusted_team_index].team_schedule_data.team_schedules
    const updateLayout = layout_data => dispatch(update_layout(layout_data))
    const updateIntervalLength = interval_length => dispatch(update_interval_length(interval_length))
    const updateTotalIntervals = intervals => dispatch(update_total_intervals(intervals))
    const shouldMirrorIntervals = data => dispatch(should_mirror_intervals(data))
    const updateTeamTutorial = data => dispatch(update_team_tutorial(data))

    //Modal managment
    const [displaySetup,setDisplaySetup] = useState(false)
    function toggleModalSetup (){setDisplaySetup(!displaySetup); }
    
    const [displayFormations,setDisplayFormations] = useState(false)
    function toggleModalFormations (){setDisplayFormations(!displayFormations);}

    function load_schedule(i)
    {
        //Adjust index to account for deleted stuff
        const schedule_index = scheduleData.findIndex(item => item.schedule_id == i)
        
        updateLayout([scheduleData[schedule_index].schedule_data.position_data,
            scheduleData[schedule_index].schedule_data.formation_name])
        updateIntervalLength(scheduleData[schedule_index].schedule_data.interval_length)
        updateTotalIntervals(scheduleData[schedule_index].schedule_data.total_intervals)
        shouldMirrorIntervals(scheduleData[schedule_index].schedule_data.mirror_intervals)
        navigation.navigate('ScheduleOverview', {screen:'Schedule'})
    }
    
    
   

 

    return(
        
        <SafeAreaView style = {styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={teamData.team_data[adjusted_team_index].team_tutorial[0]} 
                supportedOrientations={['landscape']}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{fontSize:32,marginBottom:20}}>Welcome to SUBlime – Subsheets</Text>
                        <Text style = {{textAlign:'center'}}>{'In SUBlime you can create Subsheets. Subsheets are an overview of your substitutions during the game. You can add players to them to create your ideal game plan. \n'}</Text>
                        <Text style = {{textAlign:'center',paddingBottom:10}}>Begin by pressing ‘+’ to create your first subsheet.</Text>
                        <View style = {{flexDirection:'row'}}>
                        <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {updateTeamTutorial([team_id,0])}}
                        >
                        <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <ScheduleSetup
                displayModal = {displaySetup}
                toggleModalSetup = {()=>toggleModalSetup()}
                toggleModalFormations = {()=>toggleModalFormations()}
                navigation = {navigation}
            />
             <FormationSelection
                displayFormations = {displayFormations}
                toggleModalSetup = {()=>toggleModalSetup()}
                toggleModalFormations = {()=>toggleModalFormations()}
                navigation = {navigation}
            />
            <View style = {styles.header}>
                
                <Text style = {{fontSize:40}}>Subsheets</Text>
                <View style = {{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                    <Pressable onPress = {()=>toggleModalSetup()}>
                        <Icon 
                        name='plus' 
                        size = {50} 
                        color = '#0BD61F'
                        />
                    </Pressable>
                </View>
            </View>
   
        <FlatList
            data = {scheduleData.reverse()}
            keyExtractor = {item => item.schedule_id}
            renderItem = {(item)=>SaveView(item,load_schedule,deleteSchedule, team_id)}
            contentContainerStyle={{paddingBottom:30,flexGrow:1}}
            ListEmptyComponent={()=><View style = {{justifyContent:'center',alignItems:'center',flex:1}}><Text style = {{fontSize:20,textAlign:'center'}}>{'No subsheets exist\n Press the "➕" to create a subsheet'}</Text></View>}
            
            ></FlatList>
            
            </SafeAreaView>
    
    )
}

function SaveView ({item},load_schedule,deleteSchedule,team_id) 
{
    
    function format_time()
    {
        const time_data = item.schedule_date
        const time = new Date(time_data.year,time_data.month,time_data.day,time_data.hour,time_data.minute)
        const options = { hour:'numeric',minute:'numeric', year: 'numeric', month: 'long', day: 'numeric' };
        return time.toLocaleDateString('en-NZ',options)
    }
    
    const deleteScheduleAlert = () => {
        //Create alert to show to player
        Alert.alert(
          "Do you wish to delete this this schedule?",
          'Once deleted, the schedule is permanently gone',
          [
            //Creates an array of selectable player
            {
              text: "Cancel",
              style: "cancel"
            },
            { 
              text: "Confirm", 
              onPress: () => deleteSchedule([team_id,item.schedule_id])
             
            }
          ]
        )
      }
   
    return(
        
        <View style = {styles.body}>
            <View style = {styles.textContainer}>
                <Text style ={styles.titleText}>{item.schedule_name}</Text>
                <Text style = {styles.subText} >Formation: {item.schedule_data.formation_name}</Text>
                <Text style = {styles.subText} >{format_time()}</Text>
            
            </View>
            <View style = {styles.iconContainer}>
                <Pressable 
                    style = {styles.icon}
                    onPress = {()=>{load_schedule(item.schedule_id)}}
                    >
                    <Icon 
                        name='check' 
                        size = {40} 
                        color = 'green'
                    />
                </Pressable>
                <Pressable 
                    style = {styles.icon}
                    onPress = {deleteScheduleAlert}
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
    header: {
        flexDirection:'row'
    },
    container: {
        marginHorizontal:20,
        flex:1
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
        fontSize:22,
        paddingBottom:4
    },
    subText: {
        color: 'darkgray'
    },centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      
      button: {
        borderRadius: 9,
        padding: 10,
        elevation: 2,
        borderWidth:2,
        marginHorizontal:10,
        backgroundColor:'white'
      },
})
export default (SelectSchedule)

