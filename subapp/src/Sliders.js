

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {Pressable,View,FlatList,Alert} from 'react-native'


import { useSelector, useDispatch } from 'react-redux'
import { create_game_data, update_interval_width, update_position } from './actions';

import Icon from 'react-native-vector-icons/FontAwesome';

import SliderBar from './SliderBar';







const PlayerSlider = ({navigation}) => 
{
  //Setup all the hooks and shit that is then passed into all the items
  const globalState = useSelector(state => state.numberReducer);
  const dispatch = useDispatch()
  const updatePosition = time_name_position_color => dispatch(update_position(time_name_position_color))
  const createGameData = sub_data => dispatch(create_game_data(sub_data))
  const updateIntervalWidth = id_interval_width => dispatch(update_interval_width(id_interval_width))
  const [moveDir, setMoveDir] = useState(null)
  const [startTile, setStartTile] = useState(null)
  const [dragBar, setDragBar] = useState([null,null,null,null])
    
  function selectionComplete ()
  {
    //Check if there is any gaps in the game schedule
    let isGap = false

    //Loop through all position data to check
    for(let i =0; i< globalState.position_data.length; i++)
    {
      //Loop through the positon timeline and check for nulls
      let positionTimeline = globalState.position_data[i].position_timeline
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
      for(let i =0; i< globalState.position_data.length; i++)
      {
        //Loop through the positon timeline and check when the person in position has changed 
        let positionTimeline = globalState.position_data[i].position_timeline
        let positionInitials = globalState.position_data[i].position_inititals
        let positionCords = globalState.position_data[i].position_cords

        let priorPerson = positionTimeline[0].name

        for(let k = 0; k < positionTimeline.length; k++)
        {
          //Check wether name has changed
          if(priorPerson != positionTimeline[k].name)
          {
            subData.push({subId: subId, subMin: k,subPlayerOn:priorPerson,subPlayerOff: positionTimeline[k].name,subPos:positionInitials,subCords: positionCords})
            subId ++
          }
          //Reset the prior person
          priorPerson = positionTimeline[k].name
        }
      }

      createGameData(subData)
      navigation.navigate('Game')
    }
  }

  
  return(
      
      
    <View>
     
     <Pressable 
      onPress = {()=>selectionComplete()}
      >
        <Icon 
          name='check' 
          size = {30} 
          color = 'green'
        />
      </Pressable>
        
      <FlatList scrollEnabled initialNumToRender={globalState.position_data.length} data = {globalState.position_data} renderItem={(item)=>SliderBar(item,updatePosition,updateIntervalWidth,moveDir,setMoveDir,dragBar,setDragBar,startTile,setStartTile,globalState)} keyExtractor ={item => item.position_id}></FlatList>
    </View>
  )
}

  
  
  
  export default (PlayerSlider);