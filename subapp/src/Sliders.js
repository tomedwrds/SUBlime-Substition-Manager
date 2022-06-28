

import 'react-native-gesture-handler';
import React, { useState,useEffect } from 'react';
import {Pressable,View,FlatList,Alert,StyleSheet,Text} from 'react-native'


import { useSelector, useDispatch, } from 'react-redux'
import { add_save_data, create_game_data, increment_save_index, update_current_interval, update_interval_width, update_position, } from './actions';

import Icon from 'react-native-vector-icons/FontAwesome';
import SliderBar from './SliderBar';







const PlayerSlider = ({navigation}) => 
{
  //Setup all the hooks and shit that is then passed into all the items
  const positionsData = useSelector(state => state.positionsReducer);
  const generalData = useSelector(state => state.generalReducer);
  const playerData = useSelector(state => state.playerReducer);
  const savedData = useSelector(state => state.savedReducer);
  const dispatch = useDispatch()
  const updatePosition = time_name_position_color => dispatch(update_position(time_name_position_color))
  const createGameData = sub_data => dispatch(create_game_data(sub_data))
  const updateIntervalWidth = id_interval_width => dispatch(update_interval_width(id_interval_width))
  const updateCurrentInterval = interval => dispatch(update_current_interval(interval))
  const addSaveData = data => dispatch(add_save_data(data))
  const incrementSaveIndex = amount=> dispatch(increment_save_index(amount))
  
  
  
  const [moveDir, setMoveDir] = useState(null)
  const [startTile, setStartTile] = useState(null)
  const [dragBar, setDragBar] = useState([null,null,null,null])
  const [canAddPlayer,setCanAddPlayer] = useState(false)

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
        if(positionTimeline[k].name == null)
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

        let priorPerson = positionTimeline[0].name

        for(let k = 0; k < positionTimeline.length; k++)
        {
          //Check wether name has changed and also check to make sure that it is not the start of new interval
          if(priorPerson != positionTimeline[k].name && k % generalData.interval_length != 0)
          {
            subData.push({subId: subId, subMin: k,subPlayerOn:priorPerson,subPlayerOff: positionTimeline[k].name,subPos:positionInitials,subCords: positionCords})
            subId ++
          }
          //Reset the prior person
          priorPerson = positionTimeline[k].name
        }
      }

      createGameData(subData)
      updateCurrentInterval(1)
      navigation.navigate('Game')
    }
  }

  // function saveData ()
  // {
   
  //   incrementSaveIndex(1)
   
    
  //   }
 
  //   useEffect(() => {
  //     console.log('l')
  //     let savedId =  savedData.save_index
  //   let savedName = 'Test Schedule'
  //   //let savedDate = new Date()
  //   let savedPlayerData =playerData;
  //   let savedPositionsData =positionsData;
  //   let savedGeneralData =generalData;

  //   addSaveData({saveId: savedId, saveName: savedName, savePlayerData:savedPlayerData, savePositionsData:savedPositionsData,saveGeneralData:savedGeneralData})
    
      
  //   },[saveData.save_index]);
  
  return(
      
      
    <View >
     
      <View style = {styles.header}>
        <View style = {styles.intervalSelection}>
        {/* Cheap way to create an element a certain amount of times */}
        {[...Array(generalData.total_intervals)].map((prop,i) => { 
          
          //i+1 is used as current interval doesnt start at 0
          let color = 'transparent'
          if((i+1) == generalData.current_interval) {color = 'blue'}
          return(
             
            <Pressable key = {i} onPress={()=>{updateCurrentInterval(i+1)}} style = {{...styles.intervalButton, backgroundColor:color}} >
              <Text  style = {styles.intervalText}>{i+1}</Text>
            </Pressable>
            
          )
        })}
      
    
        </View>
        {/* <Pressable 
            onPress = {()=>saveData()}
            >
              <Icon 
                name='save' 
                size = {30} 
                color = 'green'
              />
          </Pressable> */}

        <View style = {styles.nextPageIcons}>
          <Pressable 
            onPress = {()=>selectionComplete()}
            >
              <Icon 
                name='check' 
                size = {30} 
                color = 'green'
              />
          </Pressable>
        </View>
      </View>

        
      <FlatList scrollEnabled 
      //initialNumToRender={positionsData.position_data.length} 
      data = {positionsData.position_data} 
      renderItem={(item)=> SliderBar(item,updatePosition,updateIntervalWidth,moveDir,setMoveDir,dragBar,setDragBar,startTile,setStartTile,positionsData,playerData,generalData)} 
      keyExtractor ={item => item.position_id}/>
    </View>
  )
}

  
const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
   
  
  },
  intervalSelection:{
    
    flexDirection:"row",
    borderWidth: 2,
    borderRadius: 10,
    marginLeft:70,
    overflow: 'hidden'

  
  },
  intervalButton: {
   padding:20,
   
    
    
  },
  intervalText: {
    fontSize:22
  },
  nextPageIcons: {
    
    alignItems:'flex-end',
    flex:1,
    marginRight:20
   
  }
})
  
  
  export default (PlayerSlider);