

import 'react-native-gesture-handler';
import React, { useState,useEffect, useLayoutEffect } from 'react';
import {Pressable,View,FlatList,Alert,StyleSheet,Text,Modal,TextInput} from 'react-native'


import { useSelector, useDispatch, } from 'react-redux'
import { add_save_data, create_game_data, increment_save_index, save_game, save_schedule, update_current_interval, update_interval_width, update_player_interval_width, update_position,update_team_tutorial } from './actions';

import Icon from 'react-native-vector-icons/FontAwesome';
import SliderBar from './SliderBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import assignNameColor from './sliders/assignNameColor';
import SelectDropdown from 'react-native-select-dropdown';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';





const SliderMain = (props) => 
{
  



  //Setup all the hooks and shit that is then passed into all the items
  const positionsData = useSelector(state => state.positionsReducer);
 
  const teamData = useSelector(state => state.teamReducer);
  const generalData = useSelector(state => state.generalReducer);

  const team_id = generalData.current_team_index
  const adjusted_team_index = teamData.team_data.findIndex(item => item.team_id == team_id)


  const current_schedule_index = teamData.team_data[adjusted_team_index].team_schedule_data.team_schedule_index
  
  const playerData = teamData.team_data[adjusted_team_index].team_player_data.team_players
  
  const dispatch = useDispatch()
  const updatePosition = time_name_position_color => dispatch(update_position([...time_name_position_color,positionsData.mirror_intervals,positionsData.interval_length]))
  const createGameData = sub_data => dispatch(create_game_data(sub_data))
  const updateIntervalWidth = id_interval_width => dispatch(update_interval_width(id_interval_width))
  const updatePlayerIntervalWidth = width => dispatch(update_player_interval_width(width))
  const updateCurrentInterval = interval => dispatch(update_current_interval(interval))
  const addSaveData = data => dispatch(add_save_data(data))
  const incrementSaveIndex = amount=> dispatch(increment_save_index(amount))
  const saveSchedule = data => dispatch(save_schedule(data))
  const saveGame = data => dispatch(save_game(data))
  const current_interval = generalData.current_interval
  const updateTeamTutorial = data => dispatch(update_team_tutorial(data))

 
  
  const [moveDir, setMoveDir] = useState(null)
  const [startTile, setStartTile] = useState(null)
  const [dragBar, setDragBar] = useState([null,null,null,null])
  const [canAddPlayer,setCanAddPlayer] = useState(false)
  const [modalVisible,setModalVisible] = useState(false)
  const [otherTeamName, setOtherTeamName] = useState('')
  const [viewType, setViewType] = useState('Position')

  const [intervalTab,setIntervalTab] = useState([...Array(positionsData.total_intervals)])


  //set up vars for handling interval selector

  const intervalSelector = positionsData.interval_selector
  const intervalLength = positionsData.interval_length

  //Setup interval bounds
  const intervalLowerBound = (lower? intervalLength*(positionsData.current_interval-1):intervalLength*(positionsData.current_interval-1)+upperIntervalOffset)
  const intervalUperBound = (lower? intervalLength*(positionsData.current_interval-1)+upperIntervalOffset:intervalLength*(positionsData.current_interval))
  const intervalLengthProper = intervalUperBound-intervalLowerBound

  //We want to set upperInterval Off
  const [upperIntervalOffset, setUpperIntervalOffset] = useState(intervalSelector[0].upperIntervalOffset)
  const [lower,setLower] = useState(true)

  useFocusEffect(
    React.useCallback(() => {
      updateCurrentInterval(1)
      setUpperIntervalOffset(intervalSelector[0].upperIntervalOffset)
      setLower(true)
    }, [])
  );

  //Get data for updating schedule on fly
  let minutesPlayed = props.minute
  if(minutesPlayed == undefined) minutesPlayed = 0
  const navigation = props.navigation
  let gameActive = props.gameActive
  let activeGameInterval = props.activeGameInterval
  if (activeGameInterval == undefined) activeGameInterval = 1

  if(gameActive == undefined) gameActive =false

  const updateShcheduleInGame = () => {
    //Create alert to show to player
    Alert.alert(
      "Do you wish to update the subsheet?",
      'This feature is new and unstable and may crash the app. Additonally any changes to player play time is not reflected on the season totals.',
      [
        //Creates an array of selectable player
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Confirm", 
          onPress: () => 
          {
            checkForGaps() 
    }
          
         
        }
      ]
    )
  }

 



let sliderData = []


if(viewType == 'Player')
{
  
  for(let i = 0; i < playerData.length; i ++)
  {
    let id  =  playerData[i].id;
    let initials = playerData[i].name

    //Create the position timeline 
    let timeline = new Array(positionsData.total_intervals*intervalLength).fill(null)

    sliderData.push({position_id:id,position_inititals:initials,position_name:initials,position_interval_width:100,position_timeline:timeline})
  }

  //Asign positions data to the players
  for(let position = 0; position < positionsData.position_data.length; position++)
  {
    for(let minute = 0; minute< positionsData.position_data[position].position_timeline.length;minute++)
    {
      let position_id = positionsData.position_data[position].position_timeline[minute]
      if(position_id != null)
      {
       
        
        
          sliderData[position_id].position_timeline[minute] = position

        
        
      }
    }
  }
  
}
else
{
  sliderData = positionsData.position_data
}

  function checkForGaps ()
  {
    //Check if there is any gaps in the game schedule
    var isGap = false

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
    if(isGap)
    {
      Alert.alert(
        "Warning",
        "There is unassigned playtime in your Subsheet",
        [
          {
            text: "Cancel",
          
            style: "cancel"
          },
          { text: "Continue",
          onPress: () =>{ checkForOverlap()} }
        ]
      );
    }
    else
    {
      checkForOverlap()
    }
  }

  function checkForOverlap()
  {
    var isOverlap = false
    //check if there is an over lap
    for(let min = 0; min < intervalLength*current_interval; min++)
    {
      let players = []
      for(let pos = 0; pos < positionsData.position_data.length; pos++)
      {
        players.push(positionsData.position_data[pos].position_timeline[min])
        const duplicate = players.some(element => {
          if (players.indexOf(element) !== players.lastIndexOf(element) && !players.includes(null)) {
            return true;
          }
      
          return false;
        });

        if(duplicate)
        {
          isOverlap = true
        }
      }
     
    }
    if (isOverlap)
    {
      Alert.alert(
        "Warning",
        "A player has been assigned multiple positions in a single minute",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "Continue",
          onPress: () => selectionComplete() }
        ]
      );
    }
    else
    {
      selectionComplete()
    }
    
  }
  function selectionComplete ()
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
          if(priorPerson != positionTimeline[k] && k % intervalLength != 0)
          {
            subData.push({subId: subId, subMin: k,subPlayerOn:assignNameColor(priorPerson,playerData)[0] ,subPlayerOff: assignNameColor(positionTimeline[k],playerData)[0],subPos:positionInitials,subCords: positionCords})
            subId ++
          }
          //Reset the prior person
          priorPerson = positionTimeline[k]
        }
      }

      createGameData(subData)
      
      

      //Add the game data to the game history

      //Get the id of all players in the team and put in the list index 0 id index 1 frequency of player
      const team_data = teamData.team_data[adjusted_team_index].team_player_data.team_players
      let timeData = []
      for(let k = 0; k < team_data.length; k++ )
      {
          timeData.push([team_data[k].id,0])
      }

      //get date data
      const current_date = new Date()
      const savedDate = {year:current_date.getFullYear(),month:current_date.getMonth(),day: current_date.getDate(), hour: current_date.getHours(),minute: current_date.getMinutes()}
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
                      timeData[indexToAddTime][1] +=1
                  }
              }
          }
      }
      const current_game_index = teamData.team_data[adjusted_team_index].team_game_data.team_game_index
      
      if(gameActive == false)
     { 
      
      updateCurrentInterval(1)
      navigation.navigate('Game',{screen:'Active Game'})
      saveGame([team_id,{game_id:current_game_index,game_opponent: otherTeamName, game_date: savedDate, game_data: timeData}])
      setCanAddPlayer(true)

     }
      
    
  }

  function saveData ()
  {
    setCanAddPlayer(true)
   
   
    
  }
 

    useEffect(() => {
      if(canAddPlayer)
      {
        
        let savedId =  current_schedule_index

        let savedName = generalData.formation_name 
        if (otherTeamName != '') savedName = 'Subsheet used against "' + otherTeamName +'"'
        const current_date = new Date()
        const savedDate = {year:current_date.getFullYear(),month:current_date.getMonth(),day: current_date.getDate(), hour: current_date.getHours(),minute: current_date.getMinutes()}
        let savedPositionsData =positionsData;
        savedPositionsData = {formation_name: savedPositionsData.formation_name, interval_length: savedPositionsData.interval_length,mirror_intervals:savedPositionsData.mirror_intervals,position_data:savedPositionsData.position_data,total_intervals:savedPositionsData.total_intervals}
        saveSchedule([team_id,{schedule_id: savedId, schedule_name: savedName, schedule_date: savedDate, schedule_data:savedPositionsData}])
        setCanAddPlayer(false)
        
      }
    
  
    },[canAddPlayer]);



 
    
  return(
      
    <SafeAreaView>
    
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        supportedOrientations={['landscape']}
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
              onPress={() => {if(otherTeamName!= '') {setModalVisible(!modalVisible); checkForGaps()}}}
            >
              <Text style={styles.textStyle}>Begin Match</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
          animationType="slide"
          transparent={true}
          visible={teamData.team_data[adjusted_team_index].team_tutorial[3]} 
          supportedOrientations={['landscape']}
          onRequestClose={() => {updateTeamTutorial([team_id,3])}}
      >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={{fontSize:32,marginBottom:20}}>Welcome to SUBlime – Subsheet Creation</Text>
                  <Text style = {{textAlign:'center'}}>{'It is time to get down to business. On this page you can manage your newly created Subsheet. Tap on a minute to begin adding players into a position at that time. You can then drag the added player to increase their playtime. Be warned, that your subsheet will be deleted if you don’t save it.\n\nOnce you have finished your Subsheet press the ‘✅’ button to begin the match.\n'}</Text>
                 
                  <View style = {{flexDirection:'row'}}>
                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {updateTeamTutorial([team_id,3])}}
                  >
                  <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  </View>
              </View>
          </View>
      </Modal>
      
      <View style = {{...styles.header, alignItems:'center'}}>
      <Text style ={{fontSize:40}}>Subsheet Creation🏑</Text>
      
        
         

        <View style = {styles.nextPageIcons}>
        <Pressable 
            onPress = {()=>saveData()}
            >
              <Text style = {{fontSize:50}}>💾</Text>
          </Pressable> 
          <Pressable 
            onPress = {()=>{
              if(gameActive == true)
              {
                updateShcheduleInGame()
              }
              else
              {
                setModalVisible(true)
              }
            }}
              
            
            >
             <Text style = {{fontSize:50}}>✅</Text>
          </Pressable>
        </View>
      </View>
      
      <View style = {styles.belowArea}>
        <Text style = {{fontSize:20,marginRight:10}}></Text>
          <View style = {{alignItems:'center'}}>
           
             {/* <SelectDropdown
                data={[
                    {label:'Position',value:'Position'},
                    { label: 'Player', value: 'Player' }
                   
                    
                ]}
                onSelect={(selectedItem) => {
                  setViewType(selectedItem.value)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.label
                }}
                rowTextForSelection={(item) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.label
                }}
                buttonStyle={styles.dropDown}
                buttonTextStyle={styles.dropDownText}
                rowTextStyle={styles.dropDownText}
                defaultValue={'Position'}
                defaultButtonText={'Position'}
                dropdownStyle={{borderRadius:9}}
            /> */}
          </View>
          
        
        <View style = {styles.intervalSelectionContainer}>
        <Text style = {{fontSize:20}}>Interval</Text>  
        
        <View style = {styles.intervalSelection}>
        {/* Cheap way to create an element a certain amount of times */}
        
        {
         
          intervalSelector.map((prop,i) => { 
            
            //i+1 is used as current interval doesnt start at 0
            let color = 'transparent'
            let textColor = 'black'
            if((prop.intervalValue) == generalData.current_interval && prop.lower == lower) {color = '#95b7ed'; textColor = 'white'}
            
            return(
              
              <Pressable key = {i} onPress={()=>{updateCurrentInterval(prop.intervalValue);setUpperIntervalOffset(prop.upperIntervalOffset);setLower(prop.lower)}} style = {{...styles.intervalButton, backgroundColor:color}} >
                <Text  style = {{...styles.intervalText,color:textColor}}>{prop.intervalTag}</Text>
              </Pressable>
              
            )
          })
        }
        </View>
        </View>
      
    
        
      </View>
      <View style = {{flexDirection:'row',marginRight:20}}>
        <View style = {{justifyContent:'center',alignItems:'center'}}>
          <Text style = {{fontSize:30,textAlignVertical:'center',textAlign:'center',width:70}}>🕛</Text>
          </View>
        {
            
            Array((lower? upperIntervalOffset:intervalLength) - (lower? 1:upperIntervalOffset+1) + 1).fill().map((_, idx) =>  (lower? 1:upperIntervalOffset+1) + idx).map((prop) => {
        
            return(
              
              <View key = {prop} style = {{flex:1,justifyContent:'center',alignItems:'center',paddingTop:10,borderRadius:1,borderColor:'red'}}>
                <Text style = {{fontSize:20}}>{prop}</Text>
              </View>
            )
          })
        }
      </View>
      
        
          <FlatList 
          scrollEnabled={moveDir==null} 
          initialNumToRender={sliderData.length} 
          data = {sliderData} 
          renderItem={(item)=> SliderBar(item,updatePosition,updateIntervalWidth,moveDir,setMoveDir,dragBar,setDragBar,startTile,setStartTile,positionsData,playerData,assignNameColor,current_interval,viewType,updatePlayerIntervalWidth,team_id,minutesPlayed,activeGameInterval,intervalLength,upperIntervalOffset,lower)} 
          keyExtractor ={item => item.position_id}
          contentContainerStyle={{flexGrow:1,paddingBottom:200}}
         

        
          
          />
    
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
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft:20
  
  },
  intervalSelectionContainer: {
    flexDirection:'row',
    justifyContent:'flex-end',
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
    marginHorizontal:10,
    backgroundColor:'white'
  },
  dropDown: {
        
    fontSize: 16,
  color: 'black',
  fontSize: 20,
  //backgroundColor: '#ebebeb',
  textAlign: 'center',
  borderWidth:2,
 
  borderRadius:9,
  width:180,
  justifyContent:'center'
},
dropDownText: {
    fontSize: 24,
    color: 'black',
    
}
  
})
  
const pickerSelectStyles = StyleSheet.create({
  
  inputAndroid: {
    
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
  
  export default (SliderMain);