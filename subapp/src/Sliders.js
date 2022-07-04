

import 'react-native-gesture-handler';
import React, { useState,useEffect, useLayoutEffect } from 'react';
import {Pressable,View,FlatList,Alert,StyleSheet,Text} from 'react-native'


import { useSelector, useDispatch, } from 'react-redux'
import { add_save_data, create_game_data, increment_save_index, update_current_interval, update_interval_width, update_position, } from './actions';

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
  const generalData = useSelector(state => state.generalReducer);
  const playerData = useSelector(state => state.playerReducer);
  const savedData = useSelector(state => state.savedReducer);
  const dispatch = useDispatch()
  const updatePosition = time_name_position_color => dispatch(update_position([...time_name_position_color,generalData.mirror_intervals,generalData.interval_length]))
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
          if(priorPerson != positionTimeline[k] && k % generalData.interval_length != 0)
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
        let savedId =  savedData.save_index
        let savedName = generalData.team_name
        let savedDate = new Date()
        let savedPlayerData =playerData;
        let savedPositionsData =positionsData;
        let savedGeneralData =generalData;

        addSaveData({save_id: savedId, save_name: savedName, save_date: savedDate, save_playerData:savedPlayerData, save_positionsData:savedPositionsData,save_generalData:savedGeneralData})
        setCanAddPlayer(false)
        incrementSaveIndex(1)
      }
    
  
    },[canAddPlayer]);
  
  return(
      
    <SafeAreaView>
    
    
      <View style = {{...styles.header, alignItems:'center'}}>
      <Text style ={{fontSize:40}}>Game Overview🏑</Text>
      
        
         

        <View style = {styles.nextPageIcons}>
        <Pressable 
            onPress = {()=>saveData()}
            >
              <Text style = {{fontSize:50}}>💾</Text>
          </Pressable> 
          <Pressable 
            onPress = {()=>selectionComplete()}
            
            >
             <Text style = {{fontSize:50}}>✅</Text>
          </Pressable>
        </View>
      </View>
      
      <View style = {styles.belowArea}>
        <Text style = {{fontSize:20}}>View</Text>
        <View style = {{alignItems:'center'}}>
          <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                  { label: 'Player', value: 'football' },
                  { label: 'Time', value: 'baseball' },              
              ]}
              placeholder={{label:'Positions',value:'1'}}
              style = {pickerSelectStyles}
          />
        </View>
        
        <View style = {styles.intervalSelectionContainer}>
        <Text style = {{fontSize:20}}>Interval</Text>  
        
        <View style = {styles.intervalSelection}>
        {/* Cheap way to create an element a certain amount of times */}
        {[...Array(generalData.total_intervals)].map((prop,i) => { 
          
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
          renderItem={(item)=> SliderBar(item,updatePosition,updateIntervalWidth,moveDir,setMoveDir,dragBar,setDragBar,startTile,setStartTile,positionsData,playerData,generalData,assignNameColor)} 
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