

import 'react-native-gesture-handler';
import React, { useState,useEffect, useLayoutEffect } from 'react';
import {Pressable,View,FlatList,Alert,StyleSheet,Text,Modal,TextInput} from 'react-native'


import { useSelector, useDispatch, } from 'react-redux'
import { add_save_data, create_game_data, increment_save_index, save_game, save_schedule, update_current_interval, update_interval_width, update_position, } from './actions';

import Icon from 'react-native-vector-icons/FontAwesome';
import SliderBar from './SliderBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import assignNameColor from './sliders/assignNameColor';
import RNPickerSelect from 'react-native-picker-select';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';





const PlayerSlider = ({navigation}) => 
{
  //Setup all the hooks and shit that is then passed into all the items
  const positionsData = useSelector(state => state.positionsReducer);
  
  
  const savedData = useSelector(state => state.savedReducer);
  const teamData = useSelector(state => state.teamReducer);
  const generalData = useSelector(state => state.generalReducer);
  const current_team_index = teamData.team_data.findIndex(item => item.team_id == generalData.current_team_index)
  const current_schedule_index = teamData.team_data[current_team_index].team_schedule_data.team_schedule_index
  
  const playerData = teamData.team_data[current_team_index].team_player_data.team_players
  
  const dispatch = useDispatch()
  const updatePosition = time_name_position_color => dispatch(update_position([...time_name_position_color,positionsData.mirror_intervals,positionsData.interval_length]))
  const createGameData = sub_data => dispatch(create_game_data(sub_data))
  const updateIntervalWidth = id_interval_width => dispatch(update_interval_width(id_interval_width))
  const updateCurrentInterval = interval => dispatch(update_current_interval(interval))
  const addSaveData = data => dispatch(add_save_data(data))
  const incrementSaveIndex = amount=> dispatch(increment_save_index(amount))
  const saveSchedule = data => dispatch(save_schedule(data))
  const saveGame = data => dispatch(save_game(data))
  const current_interval = generalData.current_interval

 
  
  const [moveDir, setMoveDir] = useState(null)
  const [startTile, setStartTile] = useState(null)
  const [dragBar, setDragBar] = useState([null,null,null,null])
  const [canAddPlayer,setCanAddPlayer] = useState(false)
  const [modalVisible,setModalVisible] = useState(false)
  const [otherTeamName, setOtherTeamName] = useState('')
  function selectionComplete ()
  {
    //Check if there is any gaps in the game schedule
    let isGap = false

    //Loop through all position data to check
    for(let i =0; i< positionsData.position_data.length; i++)
    {
      //Loop through the positon timeline and check for nulls
      let positionTimeline = positionsData.position_data[i].position_timeline
      for(let k = 0; k < positionTimeline.length; k++)
      {
        //Check if gap is empty
        if(positionTimeline[k] == null)
        {
          isGap = true
        }
      }
    }

    //evaluate wether there is a gap
    if(isGap)
    {
      //If there is a gap create a modal prompt 
      Alert.alert(
        "Error",
        'Team selection not complete',
        [
          //Creates an array of selectable player
          {
            text: "Close",
            style: "cancel"
          }
        ]
      )

    }
    else
    {
      //If not gaps create the sub data 
      const subData = []
      let subId = 0
      //Loop through all sub data 
      for(let i =0; i< positionsData.position_data.length; i++)
      {
        //Loop through the positon timeline and check when the person in position has changed 
        let positionTimeline = positionsData.position_data[i].position_timeline
        let positionInitials = positionsData.position_data[i].position_inititals
        let positionCords = positionsData.position_data[i].position_cords

        let priorPerson = positionTimeline[0]

        for(let k = 0; k < positionTimeline.length; k++)
        {
          //Check wether name has changed and also check to make sure that it is not the start of new interval
          if(priorPerson != positionTimeline[k] && k % positionsData.interval_length != 0)
          {
            subData.push({subId: subId, subMin: k,subPlayerOn:assignNameColor(priorPerson,playerData)[0] ,subPlayerOff: assignNameColor(positionTimeline[k],playerData)[0],subPos:positionInitials,subCords: positionCords})
            subId ++
          }
          //Reset the prior person
          priorPerson = positionTimeline[k]
        }
      }

      createGameData(subData)
      updateCurrentInterval(1)
      setCanAddPlayer(true)

      //Add the game data to the game history

      //Get the id of all players in the team and put in the list index 0 id index 1 frequency of player
      const team_data = teamData.team_data[current_team_index].team_player_data.team_players
      let timeData = []
      for(let k = 0; k < team_data.length; k++ )
      {
          timeData.push([team_data[k].id,0])
      }


      //generate the time data
      
      for(let position = 0; position < positionsData.position_data.length; position ++)
      {
          for(let minute = 0; minute < positionsData.position_data[position].position_timeline.length;minute++)
          {
              let player = positionsData.position_data[position].position_timeline[minute]
              
              if (player != null)
              {
                  let indexToAddTime = timeData.findIndex(item => item[0] == player)
                  
                  if (indexToAddTime != -1)
                  {
                      timeData[player][1] +=1
                  }
              }
          }
      }
      const current_game_index = teamData.team_data[current_team_index].team_game_data.team_game_index
      saveGame([current_team_index,{game_id:current_game_index,game_opponent: otherTeamName, game_date: new Date(), game_data: timeData}])

      navigation.navigate('Game')
    }
  }

  function saveData ()
  {
    setCanAddPlayer(true)
   
   
    
  }
 
    useEffect(() => {
      if(canAddPlayer)
      {
        console.log('saved')
        let savedId =  current_schedule_index
        let savedName = generalData.formation_name
        let savedDate = new Date()
        let savedPositionsData =positionsData;
   
        saveSchedule([current_team_index,{schedule_id: savedId, schedule_name: savedName, schedule_date: savedDate, schedule_data:savedPositionsData}])
        setCanAddPlayer(false)
        
      }
    
  
    },[canAddPlayer]);
  
  return(
      
    <SafeAreaView>
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize:32}}>Final Steps</Text>
            <TextInput
            style = {{fontSize:24,borderWidth:2,borderRadius:9,padding:8,marginVertical:20,width:300,textAlign:'center'}}
              placeholder='Enter Opponents Name'
              onChangeText={(value)=>{setOtherTeamName(value)}}
            />
            <View style = {{flexDirection:'row'}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Go Back</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {if(otherTeamName!= '') {setModalVisible(!modalVisible); selectionComplete()}}}
            >
              <Text style={styles.textStyle}>Begin Match</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      
      <View style = {{...styles.header, alignItems:'center'}}>
      <Text style ={{fontSize:40}}>Game Overview🏑</Text>
      
        
         

        <View style = {styles.nextPageIcons}>
        <Pressable 
            onPress = {()=>saveData()}
            >
              <Text style = {{fontSize:50}}>💾</Text>
          </Pressable> 
          <Pressable 
            onPress = {()=>setModalVisible(true)}
            
            >
             <Text style = {{fontSize:50}}>✅</Text>
          </Pressable>
        </View>
      </View>
      
      <View style = {styles.belowArea}>
        
        
        <View style = {styles.intervalSelectionContainer}>
        <Text style = {{fontSize:20}}>Interval</Text>  
        
        <View style = {styles.intervalSelection}>
        {/* Cheap way to create an element a certain amount of times */}
        
        {[...Array(positionsData.total_intervals)].map((prop,i) => { 
          
          //i+1 is used as current interval doesnt start at 0
          let color = 'transparent'
          let textColor = 'black'
          if((i+1) == generalData.current_interval) {color = '#95b7ed'; textColor = 'white'}

          return(
             
            <Pressable key = {i} onPress={()=>{updateCurrentInterval(i+1)}} style = {{...styles.intervalButton, backgroundColor:color}} >
              <Text  style = {{...styles.intervalText,color:textColor}}>{i+1}</Text>
            </Pressable>
            
          )
        })}
        </View>
        </View>
      
    
        
      </View>
      
        
          <FlatList scrollEnabled 
          initialNumToRender={positionsData.position_data.length} 
          data = {positionsData.position_data} 
          renderItem={(item)=> SliderBar(item,updatePosition,updateIntervalWidth,moveDir,setMoveDir,dragBar,setDragBar,startTile,setStartTile,positionsData,playerData,assignNameColor,current_interval)} 
          keyExtractor ={item => item.position_id}/>
    
    </SafeAreaView>
  )
}

  
const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    marginLeft:70,
    marginRight:20
   
  
  },
  intervalSelection:{
    
    flexDirection:"row",
    borderWidth: 2,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft:20
  
  },
  intervalSelectionContainer: {
    flexDirection:'row',
    
    flex:1,
    marginRight: 20,
    alignItems:'center'
  },
  belowArea:{
    
    flexDirection:"row",
    marginLeft:70,
    alignItems:'center',
    
    
   
  
  },
  intervalButton: {
   paddingVertical:10,
   paddingHorizontal:20
   
    
    
  },
  intervalText: {
    fontSize:20
  },
  nextPageIcons: {
    flex:1,
    flexDirection:'row',
    
    justifyContent:'flex-end'
    
    
   
  },
  centeredView: {
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
    marginHorizontal:10
  },
  
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
    //backgroundColor: '#ebebeb',
    textAlign: 'center',
    borderWidth:2,
    marginLeft:10,
    padding:10,
    borderRadius:9,
    width:180
    


 
  

  
},
  placeholder: {
    color: 'black'
  }
});
  
  export default (PlayerSlider);