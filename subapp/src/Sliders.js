

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {Pressable, Text,View,StyleSheet, Animated, Image} from 'react-native'
import { FlatList, GestureHandlerRootView, PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import { Button, shadow } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
//import { useSelector, useDispatch } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';
import { useSelector, useDispatch } from 'react-redux'
import { update_position } from './actions';
//import { Provider } from 'react-redux';
//import { store } from './src/store.js';



//import { applyMiddleware } from 'redux';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { NavigationContainer } from '@react-navigation/native';
const sliderBarMargin = 20





const Sliders = () => {
 
  
  
  
  
  

    const windowWidth = Dimensions.get('window').width;
    const totalIntervals = 15;
    const intervalWidth = (windowWidth-2*sliderBarMargin)/15;
    
  
    
  
    const initalPlayerData = [
      
      {
          name: 'Tom Edwards',
          color: 'red',
          index: 0,
          start: 0,
          end: 60
      },
      
      {
          name: 'Toby Harvie',
          color: 'purple',
          index: 0,
          start: 600,
          end: 800
      }]
    
    const [playerData, setPlayerData] = useState(initalPlayerData)
    
    const fillSpace = () => {
      const snapGaps = []
      //Snap all items to list
      var arrayLength = playerData.length 
  
      for(var i = 0; i< arrayLength; i++) 
      {
        //Remove any covered up slots
        if ((playerData[i].end - playerData[i].start) > 0)
        {
          //Snap item and add it to the list
          const roundedStart = Math.round(Math.round(((playerData[i].start)) / intervalWidth)*intervalWidth)
          const roundedEnd = Math.round(Math.round(((playerData[i].end)) / intervalWidth)*intervalWidth)
          if ((roundedEnd - roundedStart) > 0)
  
       {     snapGaps.push({
              name: playerData[i].name,
              color: playerData[i].color,
              index: playerData[i].index,
              start: roundedStart,
              end: roundedEnd
            })}
        }
  
      }
      
      
  
      const fillGaps = snapGaps.slice()
      
      //Testing fill gaps code
      var arrayLengthGaps = snapGaps.length 
      var toatal_added = 0
      for(var i = 0; i< arrayLengthGaps; i++) 
      {
        
  
        //Check if last item if so close out list
        if(i == arrayLengthGaps-1)
        {
          
          const gapToFill = Math.round(((windowWidth-(2*sliderBarMargin)-playerData[i].end)) / intervalWidth)
          
          for(var k = 0; k< gapToFill; k++) 
          {
          
            fillGaps.push({
              name: 'Empty',
              color: 'white',
              index: 0,
              start: snapGaps[i].end+k*Math.round(intervalWidth),
              end: snapGaps[i].end+(k+1)*Math.round(intervalWidth)
             })
          
          }
          
          
        }
        //General check for gaps - note addition of 1 to account for gap
        else if((snapGaps[i].end) != snapGaps[i+1].start)
        {
          
          //Append new items with a thing in each slot
          
          const gapToFill = Math.round((playerData[i+1].start) / intervalWidth) - Math.round((playerData[i].end) / intervalWidth)
          
          for(var k = 0; k< gapToFill; k++) 
          {
            toatal_added += 1
            fillGaps.splice(i+toatal_added,0,{
              name: 'Empty',
              color: 'white',
              index: 0,
              start: snapGaps[i].end+k*Math.round(intervalWidth),
              end: snapGaps[i].end+(k+1)*Math.round(intervalWidth)
             })
          
          }
        }
  
  
        
        
      }
  
      //Cut
      const cutGaps = fillGaps.slice()
      
      //Testing fill gaps code
      var arrayLengthGaps = fillGaps.length 
      var toatal_added = 0
  
      for(var i = 0; i <arrayLengthGaps; i++)
      {
      
        if(fillGaps[i].name == 'Empty' && (fillGaps[i].end-fillGaps[i].start) > Math.round(intervalWidth))
        {
          
          //Determine amount of gaps to fill up
          const gapToFill = Math.round(((fillGaps[i].end) -(fillGaps[i].start)) / intervalWidth);
          
          
          
          
          for(var k = 0; k< gapToFill; k++) 
          {
            toatal_added += 1
            cutGaps.splice(i+toatal_added,0,{
              name: 'Empty',
              color: 'pink',
              index: 0,
              start: fillGaps[i-1].end+k*Math.round(intervalWidth),
              end: fillGaps[i-1].end+(k+1)*Math.round(intervalWidth)
            })
          }
          cutGaps.splice(i,1);
        }
        
      }
      //Add in a buffer
      cutGaps.splice(0, 0, {
        name: 'Buffer',
        color: 'pink',
        index: 0,
        start: 60,
        end: 0
    })
      
      
      //Fix up indexing
      var arrayLengthGaps = cutGaps.length 
      var toatal_added = 0
      for(var i = 0; i< arrayLengthGaps; i++) 
      {
        cutGaps[i].index = i
      }
  
      //Update the state
      setPlayerData(cutGaps)
      
      
    }
    
    const [moveDir,setMoveDir] = useState('null');
    const [amountDeleted, setAmountDeleted] = useState(0);
    const [enterPos, setEnterPos] = useState(0)
    const [ haveEnter, setHaveEnter] = useState(false)
  
    const handleAmountDeleted = () => 
    {
      setAmountDeleted(amountDeleted+1)
    }
  
  
    const dragActive = (drag,prop) => {
      //Update drag
      
      if (drag.nativeEvent.state == State.ACTIVE && prop.name != 'Empty')
      {
  
  
       
  
        //Create new list
        const updatePlayerData = playerData.slice()
        
        if (moveDir == 'right')
        {
          
          if(( updatePlayerData[prop.index+1+amountDeleted].name == 'Empty') /*|| ((drag.nativeEvent.absoluteX-sliderBarMargin >= updatePlayerData[prop.index+1+amountDeleted].start))*/ )
          {
            //Update x pos of dragged bar
            updatePlayerData[prop.index].end = drag.nativeEvent.absoluteX-sliderBarMargin
            //Reduce size of bar next to
            updatePlayerData[prop.index+1+amountDeleted].start = (drag.nativeEvent.absoluteX-sliderBarMargin)
  
          
            // //Remove items from slider bar
            if ((updatePlayerData[prop.index+1+amountDeleted].end - (drag.nativeEvent.absoluteX-sliderBarMargin)) <= 0)
            {
              setAmountDeleted(amountDeleted+1)
              //updatePlayerData.splice(prop.index+1,1)
              
            }
          }
          //For 
          else
          {
            //Pulling back drag following the entering of another 'bar'
            if(haveEnter == false)
            {
              
              
              setHaveEnter(true)
              setEnterPos(updatePlayerData[prop.index+1+amountDeleted].start)
              
              
            }
            updatePlayerData[prop.index].end = drag.nativeEvent.absoluteX-sliderBarMargin
            updatePlayerData[prop.index+1+amountDeleted].start = (drag.nativeEvent.absoluteX-sliderBarMargin)
  
          
          if (drag.nativeEvent.absoluteX-sliderBarMargin <= enterPos)
          {
              
              //Snap the bar segmetn
              updatePlayerData[prop.index+1+amountDeleted].start = Math.round(Math.round(((enterPos)) / intervalWidth)*intervalWidth)
              
              //If outside add new empty
              updatePlayerData.splice(prop.index+1+amountDeleted,0,{
                name: 'Empty',
                color: 'yellow',
                index: 0,
                start: drag.nativeEvent.absoluteX-sliderBarMargin,
                end: enterPos
              })
  
              var arrayLengthGaps = updatePlayerData.length 
              
              for(var i = 0; i< arrayLengthGaps; i++) 
              {
                updatePlayerData[i].index = i
              }
              setHaveEnter(false)
              setEnterPos(0)
            }
          } 
          
          
        }
        else if (moveDir == 'left' && prop.index-1-amountDeleted >= 0)
        {
          
          if(( updatePlayerData[prop.index-1-amountDeleted].name == 'Empty') /*|| ((drag.nativeEvent.absoluteX-sliderBarMargin >= updatePlayerData[prop.index+1+amountDeleted].start))*/ )
          {
           
            //Update x pos of dragged bar
            updatePlayerData[prop.index].start = drag.nativeEvent.absoluteX-sliderBarMargin
            //Reduce size of bar next to
            updatePlayerData[prop.index-1-amountDeleted].end = (drag.nativeEvent.absoluteX-sliderBarMargin)
  
          
            // //Remove items from slider bar
            if ((updatePlayerData[prop.index-1-amountDeleted].end - updatePlayerData[prop.index-1-amountDeleted].start) <= 0)
            {
              console.log(amountDeleted)
              setAmountDeleted(amountDeleted+1)
              console.log(amountDeleted)
              
            }
          }
          else
          {
            //Pulling back drag following the entering of another 'bar'
            if(haveEnter == false)
            {
              //console.log(updatePlayerData[prop.index-1-amountDeleted].end)      
              
              setHaveEnter(true)
              setEnterPos(updatePlayerData[prop.index-1-amountDeleted].end)
              
              
            }
  
            updatePlayerData[prop.index].start = drag.nativeEvent.absoluteX-sliderBarMargin
            updatePlayerData[prop.index-1-amountDeleted].end = (drag.nativeEvent.absoluteX-sliderBarMargin)
  
  
          if (((drag.nativeEvent.absoluteX-sliderBarMargin) > enterPos) && (enterPos != 0))
          {
              
            
              // //Snap the bar segmetn
            updatePlayerData[prop.index-1-amountDeleted].end = Math.round(Math.round(((enterPos)) / intervalWidth)*intervalWidth)
            
            console.log('kk')
        
            
            //setAmountDeleted(amountDeleted)
            
          
              // //If outside add new empty
           
            updatePlayerData.splice(prop.index-amountDeleted,0,{
              name: 'Empty',
              color: 'yellow',
              index: 0,
              start: enterPos,
              end: drag.nativeEvent.absoluteX-sliderBarMargin
            })
            //Kill the buffer
            updatePlayerData.splice(0,1)
            
            console.log(updatePlayerData)
             
              // console.log(updatePlayerData)
              // console.log('k')
              var arrayLengthGaps = updatePlayerData.length 
              
              for(var i = 0; i< arrayLengthGaps; i++) 
              {
                updatePlayerData[i].index = i
              }
           
              setHaveEnter(false)
              setEnterPos(0)
            }
           
          } 
          
          
          
        }
  
       
        setPlayerData(updatePlayerData)
        
        
      }
      
      
    }
  
    const dragEnd = (drag,prop) => {
      //Snap the location of items to a grid
      fillSpace()
      console.log('f')
    }
    
    const dragStart = (drag,prop) => {
      //Get width of the bar
      const barWidth = playerData[prop.index].end - playerData[prop.index].start
  
      //Determine what way drag is
      if (drag.nativeEvent.x > barWidth/2)
      {
        setMoveDir('right')
      }
      else if (drag.nativeEvent.x <=  barWidth/2)
      {
        setMoveDir('left')
      }
  
      
      //Set amount deleted as a var to prevent indexing errors
      setAmountDeleted(0)
      setHaveEnter(false)
  
    }
      
    const addNewPlayer = (value) => {
      //Create a new version of the player data list adjust name in color before updating it again
      const updatePlayerData = playerData.slice();
      
      updatePlayerData[prop.index].name = value; 
      updatePlayerData[prop.index].color = 'green'; 
      
      setPlayerData(updatePlayerData)
    }
    
    return(
      <SafeAreaView>
       
        <GestureHandlerRootView>
          {/*General encompassing view of whole slider bar*/}
          <View style = {{... styles.sliderBar}} > 
            {/*Map each data value in the playerdata list to a componenet*/}
            {playerData.map((prop,index) => {
              {/*Dont render any players who have been squished - this is done as opposed to removing at pull time to prevent indexing errors*/}
              if (((playerData[prop.index].end - playerData[prop.index].start) > 0))
              {
                return (
                  
                  //Pan gesture handler controls the drag motion
                  <PanGestureHandler key = {index}
                    onGestureEvent = {(drag) => dragActive(drag,prop)}
                    onActivated = {(drag) => dragStart(drag,prop)}
                    onEnded = {(drag) => dragEnd(drag,prop)}
                  >
  
                    {/* Outer view that sets the width of each item */}
                    <View style = {{width: (prop.end-prop.start)}}>
  
                     {/* Inner view that sets the realted styling of the item  */}
                      <View  style={{...styles.tagSection ,  backgroundColor:prop.color }}>
                      
                        {/* Check if item is empty if empty put in a picker select to add new item or if player in just render normalyl */}
                        {//(prop.name != 'Empty')  ?
                          <Text numberOfLines={1}  style = {{...styles.tagSectionText} }>{prop.name}</Text>
                          
                          /*<RNPickerSelect 
                            onValueChange={(value) => {addNewPlayer}}
                            placeholder={{ label: '+', value: null }}
                            style = {pickerSelectStyles}
                            
                            items={[
                                { label: 'Alex Ying', value: 'Alex ying'},
                                { label: 'Jerry Chang', value: 'Jerry Chang' },
                                { label: 'Callum Lockhart', value: 'callum lockhart' },
                                
                            ]}
                            useNativeAndroidPickerStyle={false}
                            fixAndroidTouchableBug={true}
                          />*/
                        }
                            
                      </View> 
                    </View>
                  </PanGestureHandler>
                  
                )
              }
            
             
              
            
            })}
          </View>
          </GestureHandlerRootView>
          <Button style={{backgroundColor: 'red', width: 100}} onPress = {fillSpace}>Hello</Button>
          
      </SafeAreaView>
      
     
        
      
      
    )
    
  }

const TestSlider = () => {
    
    const screen_width = Dimensions.get('window').width
    const intervals = 15
    const interval_width = screen_width/intervals
    const globalState = useSelector(state => state.numberReducer);
    const pickerSelectData = globalState.player_data.map(item => ({label: item.name,value:item.name}))
    const [dragBar, setDragBar] = useState(null)
    const [moveDir, setMoveDir] = useState(null)
    const [startTile, setStartTile] = useState(null)
    const dispatch = useDispatch()
    const updatePosition = time_name_position => dispatch(update_position(time_name_position))
    const dragStart = (drag) => {
        
        
      const newStartTile = Math.floor(drag.nativeEvent.x / interval_width)

        if (globalState.position_data[0].position_timeline[newStartTile] != null)
        {
          
          let prior_name =  globalState.position_data[0].position_timeline[0]
        let blob_length = 0
        let found_blob = false
        for( let i =0; i < intervals; i++)
        {
          
          
          //Check if name has changed and name changed from 
          if (globalState.position_data[0].position_timeline[i] != prior_name)
          {
            
            prior_name = globalState.position_data[0].position_timeline[i]
            
            if (found_blob == true)
            {
              

              const blob_width = (i-blob_length)*interval_width + blob_length*interval_width/2
              //Determine what way drag is
              if (drag.nativeEvent.x  > blob_width)
              {
                
                setMoveDir('right')
                setDragBar([{start: 0, end: (i-blob_length)*interval_width},
                  {start: (i-blob_length)*interval_width, end: drag.nativeEvent.x},
                  {start: drag.nativeEvent.x,end:screen_width}])
                
              }
              else if (drag.nativeEvent.x <=  blob_width)
              {
                setMoveDir('left')
                
                  setDragBar([{start: 0, end: drag.nativeEvent.x},
                    {start: drag.nativeEvent.x, end: i*interval_width},
                    {start: i*interval_width,end:screen_width}
                  ])
              }
              
            
            
            }
            found_blob = false
            //Reset the vars and blob length
            blob_length = 0
            
          }
          if (i==newStartTile)
          {
            
            found_blob = true
          }

          blob_length += 1
    
        }

        

       
        

        setStartTile(newStartTile)
        
    }
    
        
        // //Set amount deleted as a var to prevent indexing errors
        // setAmountDeleted(0)
        // setHaveEnter(false)
    
    }
    const dragEnd = (drag) => {
        
        const endTile = Math.round(drag.nativeEvent.x / interval_width)
        if (moveDir == 'right')
        {
            for (let i = startTile; i < endTile; i++)
            {
                updatePosition([i,globalState.position_data[0].position_timeline[startTile],'CF'])
            }
        }
        else if (moveDir == 'left')
        {
            for (let i = endTile; i < startTile; i++)
            {
                updatePosition([i,globalState.position_data[0].position_timeline[startTile],'CF'])
            }
        }
        setDragBar(null)
        setMoveDir(null)
        setStartTile(null)
    }
    const dragActive = (drag) =>
    {
        if (moveDir == 'right')
        {
            
            setDragBar([{start: 0, end: dragBar[0].end},
                {start: dragBar[1].start, end: drag.nativeEvent.x},
                {start: drag.nativeEvent.x,end:screen_width}
    ])
    
        }
        else if (moveDir == 'left')
        {
            setDragBar([{start: 0, end: drag.nativeEvent.x},
                {start: drag.nativeEvent.x, end: dragBar[1].end},
                {start: dragBar[2].start,end:screen_width}
    ])
        }
    }

    
    const transformed_data_for_visual = () =>
    {
      //Get a transformed version of teh data to play witth
      let transformed_data = []
      let current_length = 0;
      let totalSlack = 0;
      for(let i = 0; i < globalState.position_data[0].position_timeline.length; i++)
      {
        current_length += 1
        if (current_length > 1) totalSlack ++
        if (globalState.position_data[0].position_timeline[i] == null || (globalState.position_data[0].position_timeline[i] != globalState.position_data[0].position_timeline[i+1] && globalState.position_data[0].position_timeline[i] != null))
        {
          transformed_data.push({name: globalState.position_data[0].position_timeline[i], length: current_length,index_slack:  totalSlack})
          current_length = 0
        }  
      }
      console.log(transformed_data)
      return transformed_data
    }
    
    return(
        
        <GestureHandlerRootView style = {{height:100,flexDirection:'row'}}>
            <PanGestureHandler 
                    onActivated = {(drag,prop) => dragStart(drag)}
                    onGestureEvent = {(drag) => dragActive(drag)}
                    //onActivated = {(drag) => dragStart(drag,prop)}
                    onEnded = {(drag) => dragEnd(drag)}
                  >
                <View style = {{flexDirection:'row',flex:1}}>
                  
                {
               
                    globalState.position_data[0].position_timeline.map((prop,index) => {
                    return(
                    <View key = {index} style = {{flex:1,borderColor:'black',borderWidth: 1}}>
                        {(prop == null)  ?
                        <RNPickerSelect 
                        onValueChange={(value)=>{updatePosition([index,value,'CF'])}}
                        placeholder={{ label: '+', value: null }}
                        style = {pickerSelectStyles}
                        
                        items={pickerSelectData}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}
                      /> : <View></View>
                        }
                    </View>
                    )
                })}
                <View style = {{position:'absolute',flexDirection:'row'}}>

                {transformed_data_for_visual().map((prop,index) => {
                    return(
                      <View key = {index} style = {{width: interval_width*prop.length,backgroundColor:'red'}}>
                        <Text>{prop.name}</Text>
                      </View>
                    )})}
                </View>
             
                {(dragBar != null)?
                
                <View style = {{position:'absolute',flexDirection:'row'}}>
                    <View style = {{ width: (dragBar[0].end-dragBar[0].start),opacity:0,height:100}}>

                    </View>
                    <View style = {{backgroundColor:'blue', width: dragBar[1].end-dragBar[1].start,opacity:0.8,height:100}}>

                    </View>
                    <View style = {{width: dragBar[2].end-dragBar[2].start,height:100}}>

                    </View>
                </View>: null
}
               
                </View>
                
                
            </PanGestureHandler>
    
        </GestureHandlerRootView>
    )
}
const PlayerSlider = () =>
{
    return(
        <View>
    <TestSlider/>
    
    </View>
    )
}
  const styles = StyleSheet.create({

    tagSection: {
  
          textAlign: "center",
          position: "relative",
      
      
          borderRightColor: "white",
    
  
          borderLeftColor: "white",
      overflow: 'hidden',
     
      margin: 0,
      padding: 0,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
      
    },
    tagSectionText: {
      
          color: "white",
          fontSize: 20,
      
      
      
  
          
      
      
  
    },
    sliderBar: {
      flexDirection: 'row',
      
      borderWidth: 0,
      borderRadius: 1,
      height: 75,
      margin: sliderBarMargin,
      fontSize: 59,
      backgroundColor: 'yellow',
      overflow:'hidden',
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 6
    }
  })
  const pickerSelectStyles = StyleSheet.create({
   
    inputAndroid: {
      
      color: 'black',
      //fontSize: 20,
      //backgroundColor: 'red',
      //height: '100%',
      //width: '100%'
      
    },
    inputIOS: {
      fontSize: 16,
      color: 'black',
      fontSize: 20,
      backgroundColor: '#ebebeb',
      height: '100%',
      borderRadius: 4
    
  
    
  },
    placeholder: {
      color: 'grey'
    }
  });
  
  export default (PlayerSlider);