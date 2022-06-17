

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {Pressable, Text,View,StyleSheet, Animated, Image} from 'react-native'
import { FlatList, GestureHandlerRootView, PanGestureHandler, ScrollView, State, TapGestureHandler } from 'react-native-gesture-handler';
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







const TestSlider = () => {



    const intervals = 15
    const rightMargin =20
    const screen_width = Dimensions.get('window').width-rightMargin
    
    const globalState = useSelector(state => state.numberReducer);
    const pickerSelectData = globalState.player_data.map(item => ({label: item.name,value:item.name}))
    
    
    const dispatch = useDispatch()
    
    const updatePosition = time_name_position_color => dispatch(update_position(time_name_position_color))
    
   
  
    return(
      <ScrollView>
      {globalState.position_data.map((prop,index) => {

        const [moveDir, setMoveDir] = useState(null)
        const [startTile, setStartTile] = useState(null)
        const [intervalWidth, setIntervalWidth] = useState(0)
        const [dragBar, setDragBar] = useState(null)
        const positionName = prop.position_name

        
         const assignColor = (name) =>
         {
           //Prevent place holder values slipping through and causing erros
           if (name != null)
           {
             //Join on the name of the two lists and return the color
             var join = globalState.player_data.find(player => player.name == name)
             return join.color
           }
     
         }
         const dragStart = (drag) => {
             
           //Get the start tile - newStartTile is used as opposed to a hook as hooks update async and therefore arent ideal
           const newStartTile = Math.floor(drag.nativeEvent.x / intervalWidth)
     
           //Check if tile has something in it as null tiles cannot be dragged
           if (globalState.position_data[prop.position_id].position_timeline[newStartTile].name != null)
           {
             //Setupvars prior name is used to see when blobs end, and flound_bob is used to determine what blob to turn into drag bar
             let prior_name =  globalState.position_data[prop.position_id].position_timeline[0].name
             let blob_length = 0
             let found_blob = false
            
             //Loop through all of the invervals
             for( let i =0; i < intervals; i++)
             {
               
               
     
     
               //Check to see if a blob has finished being iterated over as the name has changed or end of intervals has been reacheds
               if (globalState.position_data[prop.position_id].position_timeline[i].name != prior_name )
               {
                 prior_name = globalState.position_data[prop.position_id].position_timeline[i].name
                 //Check to see if iterated over blob is the relavent one
                 if (found_blob == true)
                 {
                   
                   //if (i==(intervals-1)) blob_length = 1
                   //Determine x pos of half of the blob this is done for determing drag direction
                   const half_blob_x = (i-blob_length)*intervalWidth + blob_length*intervalWidth/2
                   
                   //Determine what way drag is using drag pos and halfway
                   if (drag.nativeEvent.x  > half_blob_x)
                   {
                     
                     setMoveDir('right')
                     setDragBar([{start: 0, end: (i-blob_length)*intervalWidth},
                       {start: (i-blob_length)*intervalWidth, end: drag.nativeEvent.x},
                       {start: drag.nativeEvent.x,end:screen_width}])
                       
                       setStartTile(i-1)
                     
                   }
                   else if (drag.nativeEvent.x <=  half_blob_x)
                   {
                     
                     setMoveDir('left')
                     
                       setDragBar([{start: 0, end: drag.nativeEvent.x},
                         {start: drag.nativeEvent.x, end: i*intervalWidth},
                         {start: i*intervalWidth,end:screen_width}
                       ])
                       setStartTile(i-blob_length)
                   }
                   
                 
                 
                 }
                 found_blob = false
                 //Reset the vars and blob length
                 blob_length = 0
                 
                 
               }
               //Check to see if the invterval has been reached that the start tile was in. 
               //Once found it means the drag bar can be created with the drag bar on that blob
               if (i==newStartTile)
               { 
                 found_blob = true
               }
               
               
     
               blob_length += 1
         
             }
     
             
             
         }
         
             
           
         
         }
         const dragEnd = (drag) => {
             
             const endTile = Math.round(drag.nativeEvent.x / intervalWidth)
             if (moveDir == 'right')
             {
                 if(endTile <= startTile)
                 {
                   
                   for (let i = endTile; i <= startTile; i++)
                   {
                     updatePosition([i,null,prop.position_name])
                   }
                 }
                 else {
                   
                 for (let k = startTile; k < endTile; k++)
                 {
                     updatePosition([k,globalState.position_data[prop.position_id].position_timeline[startTile].name,prop.position_name,globalState.position_data[prop.position_id].position_timeline[startTile].color])
                 }
               }
             }
             else if (moveDir == 'left')
             {
               if(endTile >= startTile)
               {
                 for (let i = startTile; i < endTile; i++)
                   {
                     updatePosition([i,null,prop.position_name])
                   }
               }
               else
               {
                 for (let k = endTile; k < startTile; k++)
                 {
                     updatePosition([k,globalState.position_data[prop.position_id].position_timeline[startTile].name,prop.position_name,globalState.position_data[prop.position_id].position_timeline[startTile].color])
                 }
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
           let game_length = globalState.position_data[prop.position_id].position_timeline.length
           
           //loop through whole list
           for(let i = 0; i < game_length; i++)
           {
             current_length += 1
             var isTileEmpty = globalState.position_data[prop.position_id].position_timeline[i].name == null;
             if( i < game_length-1)
             {var isNextTileSame = globalState.position_data[prop.position_id].position_timeline[i].name != globalState.position_data[prop.position_id].position_timeline[ i+1].name;}
             else var isNextTileSame = true
             if (isTileEmpty || (isNextTileSame && !isTileEmpty))
             {
           
               transformed_data.push({name: globalState.position_data[prop.position_id].position_timeline[i].name, length: current_length,color: globalState.position_data[prop.position_id].position_timeline[i].color})
               current_length = 0
             }  
           }
          
           return transformed_data
         }



        return(
        <GestureHandlerRootView  key = {index} style = {{height:100,flexDirection:'row',marginRight: rightMargin}}>
            <Text style = {styles.position_font}>{prop.position_name}</Text>
            <PanGestureHandler 
                    onActivated = {(drag,prop) => dragStart(drag)}
                    onGestureEvent = {(drag) => dragActive(drag)}
                    //onActivated = {(drag) => dragStart(drag,prop)}
                    onEnded = {(drag) => dragEnd(drag)}
                  >
                <View onLayout={(k) => setIntervalWidth(k.nativeEvent.layout.width/intervals)} style = {{flexDirection:'row',flex:1}}>
                <View style = {{position:'absolute',flexDirection:'row'}}>

                {/*transformed_data_for_visual().map((prop,index) => {
                    return(
                      <View key = {index}  style = {{...styles.sliderBox, height:(prop.name == null? 0:100), width: intervalWidth*prop.length, backgroundColor:(prop.name == null? 'transparent':prop.color)}}>
                        <Text style = {styles.sliderText}>{prop.name}</Text>
                      </View>
                    )})*/}
                </View>
                {
                  
                   globalState.position_data[prop.position_id].position_timeline.map((prop,index) => {
                      
                      return(
                      
                    <View key = {index} style = {{flex:1,borderColor:'black'}}>
                        {(prop.name == null)  ?
                        <View style = {{alignItems:'center',justifyContent:'center'}}>
                        <RNPickerSelect 
                        onValueChange={(value)=>{updatePosition([index,value,positionName,assignColor(value)])}}
                        placeholder={{ label: (index+1).toString(), value: null }}
                        style = {pickerSelectStyles}
                        
                        items={pickerSelectData}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}

                      /></View> : <View></View>
                        }
                    </View>
                    )
                })}
                
             
                {(dragBar != null )?
                
                <View style = {{position:'absolute',flexDirection:'row'}}>
                    <View style = {{ width: (dragBar[0].end-dragBar[0].start),opacity:0,height:100}}>

                    </View>
                    <View style = {{...styles.dragBar,backgroundColor: globalState.position_data[prop.position_id].position_timeline[startTile].color, width: dragBar[1].end-dragBar[1].start}}>
                      
                    </View>
                    <View style = {{width: dragBar[2].end-dragBar[2].start,height:100}}>

                    </View>
                </View>: null
}
               
                </View>
                
                
            </PanGestureHandler>
    
        </GestureHandlerRootView>
        )})}</ScrollView>
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
    sliderText: {
      fontSize: 20,
      textAlign:'center',
      textAlignVertical:'center'
    },
    sliderBox: {
      
      borderRadius: 9,
      justifyContent: 'center'
    },
    dragBar: {
      opacity:0.6,
      height:100,
      borderRadius: 9
    },
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
     
      borderRadius: 6
    },
    position_font: {
      fontSize: 30
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
      textAlign: 'center',
      borderLeftWidth:1
  
   
    
  
    
  },
    placeholder: {
      color: 'grey'
    }
  });
  
  export default (PlayerSlider);