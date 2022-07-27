import React from "react";
import { Text,View,SafeAreaView,StyleSheet,Pressable,FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector,useDispatch } from "react-redux";
import { delete_schedule, update_layout,update_interval_length,update_total_intervals,should_mirror_intervals } from "./actions";

const SelectSchedule = ({navigation}) => {

    const dispatch = useDispatch()
    const teamData = useSelector(state => state.teamReducer);
    const generalData = useSelector(state =>state.generalReducer)
    const current_team_index = teamData.team_data.findIndex(item => item.team_id == generalData.current_team_index)
    const deleteSchedule = index => dispatch(delete_schedule(index))
    const scheduleData = teamData.team_data[current_team_index].team_schedule_data.team_schedules
    const updateLayout = layout_data => dispatch(update_layout(layout_data))
    const updateIntervalLength = interval_length => dispatch(update_interval_length(interval_length))
    const updateTotalIntervals = intervals => dispatch(update_total_intervals(intervals))
    const shouldMirrorIntervals = data => dispatch(should_mirror_intervals(data))
    
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
            <View style = {styles.header}>
                
                <Text style = {{fontSize:40}}>Schedule Selection</Text>
                <View style = {{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                    <Pressable onPress = {()=>navigation.navigate('ScheduleSetup')}>
                        <Icon 
                                name='plus' 
                                size = {40} 
                                color = 'green'
                            />
                    </Pressable>
                </View>
            </View>
        <FlatList
            data = {scheduleData}
            keyExtractor = {item => item.schedule_id}
            renderItem = {(item)=>SaveView(item,load_schedule,deleteSchedule, current_team_index)}
            ></FlatList>
            </SafeAreaView>
    
    )
}

function SaveView ({item},load_schedule,deleteSchedule,current_team_index) 
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
                    onPress = {()=>{deleteSchedule([current_team_index,item.schedule_id])}}
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

