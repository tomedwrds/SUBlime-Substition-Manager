import React from "react";
import { Text,View,StyleSheet,Pressable,FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { delete_schedule, update_layout,update_interval_length,update_total_intervals,should_mirror_intervals } from "./actions";
import ScheduleSetup from "./ScheduleSetup";
import FormationSelection from "./FormationSelection";
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
        navigation.navigate('ScheduleOverview')
    }


    return(
        <SafeAreaView style = {styles.container}>
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
                
                <Text style = {{fontSize:40}}>Substituion Schedules</Text>
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
            data = {scheduleData}
            keyExtractor = {item => item.schedule_id}
            renderItem = {(item)=>SaveView(item,load_schedule,deleteSchedule, team_id)}
            ></FlatList>
            </SafeAreaView>
    
    )
}

function SaveView ({item},load_schedule,deleteSchedule,team_id) 
{
    
    function format_time()
    {
        let time = item.schedule_date
        const options = { hour:'numeric',minute:'numeric', year: 'numeric', month: 'long', day: 'numeric' };
        return time.toLocaleDateString('en-NZ',options)
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
                    onPress = {()=>{deleteSchedule([team_id,item.schedule_id])}}
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
        marginHorizontal:20
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
    }
})
export default (SelectSchedule)

