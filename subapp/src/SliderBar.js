import React from "react"
import { Dimensions,View,Text,StyleSheet, ImageBackground } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import AddPlayer from "./AddPlayer";
import assignNameColor from "./sliders/assignNameColor";
import SelectDropdown from "react-native-select-dropdown";
//General setup vars

const sliderBarRightMargin =20
const sliderBarTopMargin = 20
const sliderBorderWidth = 1
const sliderBodyHeight = 100 
const sliderContentHeight = sliderBodyHeight - sliderBorderWidth*2
const screen_width = Dimensions.get('window').width-sliderBarRightMargin
const image = { uri: "https://www.seekpng.com/png/full/9-95144_diagonal-stripes-png-graphic-transparent-parallel.png" };
const SliderBar = ({item},updatePosition,updateIntervalWidth,moveDir,setMoveDir,dragBar,setDragBar,startTile,setStartTile,positionsData,playerData,assignNameColor,currentInterval,viewType,updatePlayerIntervalWidth,team_id,minutesPlayed,activeGameInterval) =>
{ 

  
    //Set up vars specific to each variable
    const positionName = item.position_inititals
    const positionId = item.position_id
    const positionTimeline = item.position_timeline
    const intervalLength = positionsData.interval_length
    let dropDownWidth = 140
    
    //Adjust were interval width is recieved from depdent on picker select data
    let positionIntervalWidth = item.position_interval_width
    if(viewType == 'Player')
    {
      positionIntervalWidth = playerData[positionId].intervalWidth
    }
    
    let pickerSelectData = []
    if(viewType == 'Position')
    {
      pickerSelectData = playerData.filter(item => item.positions.includes(positionName) == true).map(item => ({label: item.name,value:item.id}))
    } 
    else(viewType == 'Player')
    {
      //potential for index error here
      //console.log(playerData[positionId].positions)
      pickerSelectData = playerData.filter(item => item.positions.includes(positionName) == true).map(item => ({label: item.name,value:item.id}))
      //pickerSelectData = playerData[positionId].positions.map(item => ({label: item.name,value:item.id}))
    }
    
    if(pickerSelectData.length == 0) {pickerSelectData.push({value:null,label:"Go to the 'team' tab to add a player to this position."});dropDownWidth = 450}
    
   
  
    const totalIntervals = positionsData.total_intervals
    
  
    const dragStart = (drag) => {
       if(viewType == 'Position')
       {
        //Get the start tile - newStartTile is used as opposed to a hook as hooks update async and therefore arent ideal
        let dragStartTile = Math.floor(drag.nativeEvent.x / positionIntervalWidth) + intervalLength*(currentInterval-1)
        
     
        
       

        // //Extra drag area on right
        // if (positionTimeline[dragStartTile-1] != null && positionTimeline[dragStartTile] == null)
        // {
         
       
        //    dragStartTile = dragStartTile-1
        // }
        
        // //Extra drag area on left
        // if (positionTimeline[dragStartTile+1] != null && positionTimeline[dragStartTile] == null)
        // {
          
        //    dragStartTile = dragStartTile+1
        // }
        

        //Check if tile has something in it as null tiles cannot be dragged
        if (positionTimeline[dragStartTile] != null && dragStartTile >= minutesPlayed)
        {
            //Setupvars prior name is used to see when blobs end, and flound_bob is used to determine what blob to turn into drag bar
            let prior_name =  positionTimeline[(currentInterval-1)*intervalLength]
            let blob_length = 0
            let found_blob = false
            
            //Loop through all of the invervals
            for( let i = (currentInterval-1)*intervalLength; i <= currentInterval*intervalLength; i++)
            {
                
                //This is used to check if tile has changed without causing an indesxing error
                if (i < currentInterval*intervalLength) {var tileChanged = positionTimeline[i] != prior_name}
                
                //Check to see if a blob has finished being iterated over as the name has changed or end of intervals has been reacheds
                if (tileChanged || i==currentInterval*intervalLength )
                {
                
                
                    //Check to see if iterated over blob is the relavent one
                    if (found_blob == true)
                    {
                        //Set found blob to false so a 2nd drag bar isnt created
                        found_blob = false
                        
                        const offsetI = i -(currentInterval-1)*intervalLength
                        
                        //Determine x pos of half of the blob this is done for determing drag direction
                        const half_blob_x = (offsetI-blob_length)*positionIntervalWidth + blob_length*positionIntervalWidth/2 
                        
                        
                        //Determine what way drag is using drag pos and halfway
                        if (drag.nativeEvent.x  > half_blob_x)
                        {
                        
                            setMoveDir('right')
                            setDragBar([{start: 0, end: (offsetI-blob_length)*positionIntervalWidth},
                                {start: (offsetI-blob_length)*positionIntervalWidth, end: drag.nativeEvent.x},
                                {start: drag.nativeEvent.x,end:screen_width},positionId])
                            
                            setStartTile(i-1)
                        
                        }
                        else if (drag.nativeEvent.x <=  half_blob_x)
                        {
                        
                            setMoveDir('left')
                        
                            setDragBar([{start: 0, end: drag.nativeEvent.x},
                                {start: drag.nativeEvent.x, end: offsetI*positionIntervalWidth},
                                {start: offsetI*positionIntervalWidth,end:screen_width},positionId
                                ])
                            setStartTile(i-blob_length)
                        }
                        
                
                    }
                    //Set prior name check exists to prevent indexing error
                    if (i < currentInterval*intervalLength)
                    {
                        prior_name = positionTimeline[i]
                    }
                    
                    //Reset the vars and blob length
                    blob_length = 0
                    
                    
                }
                //Check to see if the invterval has been reached that the start tile was in. 
                //Once found it means the drag bar can be created with the drag bar on that blob
                if (i==dragStartTile)
                { 
                    found_blob = true
                }
                
                //Increment the blob length
                blob_length += 1
        
            }

        
        
        }
      }
    
       
     
   
    }
    const dragEnd = (drag) => {
       
        const endTile = Math.round(drag.nativeEvent.x / positionIntervalWidth) + intervalLength*(currentInterval-1)
        
        if (moveDir == 'right')
        {
            //Check if ended behind the start tile and thus delete 
            if(endTile <= startTile)
            {
                
                for (let i = endTile; i <= startTile; i++)
                {
                    //Check to make sure that tile being iterated over is the same as draged tile
                    if (positionTimeline[i] == positionTimeline[startTile])
                    {

                      if(i >= minutesPlayed) updatePosition([i,null,positionId])
                    }
                }
            }
            //If moved beyond start tile
            else 
            {
             
                for (let k = startTile; k < endTile; k++)
                {
                    
                  if(k >= minutesPlayed) updatePosition([k,positionTimeline[startTile],positionId])
                }
            }
        }
        else if (moveDir == 'left')
        {
            //Deletion
            if(endTile >= startTile)
            {

                for (let i = startTile; i < endTile; i++)
                {
                    if (positionTimeline[i] == positionTimeline[startTile])
                    {
                      if(i >= minutesPlayed) updatePosition([i,null,positionId])

                        
                    }
                }
            }
            else
            {
                for (let k = endTile; k < startTile; k++)
                {
                  if(k >= minutesPlayed) updatePosition([k,positionTimeline[startTile],positionId])
                }
            }
        }
        setDragBar([null,null,null,null])
        setMoveDir(null)
        setStartTile(null)
    }

    const dragActive = (drag) =>
    {
   
        if (moveDir == 'right')
        {
            
            setDragBar([{start: 0, end: dragBar[0].end},
                {start: dragBar[1].start, end: drag.nativeEvent.x},
                {start: drag.nativeEvent.x,end:screen_width},positionId])
    
        }
        else if (moveDir == 'left')
        {
            setDragBar([{start: 0, end: drag.nativeEvent.x},
                {start: drag.nativeEvent.x, end: dragBar[1].end},
                {start: dragBar[2].start,end:screen_width},positionId])
        }
    }    

 
    //Assign color gets the relavent information from the player data strucutre and assigns that color to the slider
    function assignNameColorPos (position_id,position_data)
    {

      //Prevent place holder values slipping through and causing erros
      if (position_id != null)
      {
          
          //Join on the name of the two lists and return the color
          var join = position_data.find(pos => pos.position_id == position_id)
          if (join != undefined)
          {
              //0 for name, 1 for color
              return [join.position_name,join.position_color]
          }
          else
          {
              return ['Deleted Player', 'red']
          }
      }
      else{return[null,null]}

    }
   const transformed_data_for_visual = () =>
   {
     //Get a transformed version of teh data to play witth
     let transformed_data = []
     let current_length = 0;
     let overlap_length =-1
     let overLapStart = 0
     let setOverlap = false
     let overLappedData = []
     
     //loop through whole list

    //Add overlapped data for minutes
    if(minutesPlayed >= (currentInterval-1)*intervalLength && activeGameInterval == currentInterval)
    {
      transformed_data.push({name:'Already Played',length:minutesPlayed%intervalLength,color:'white',overlap:[]})
      
     for(let i = (currentInterval-1)*intervalLength+minutesPlayed%intervalLength; i < currentInterval*intervalLength; i++)
     {
      
      
       
       
      //Checking if next tile is diffrent - indexing error prevention
      if( i < (currentInterval)*intervalLength-1)
      {
        var isNextTileSame = positionTimeline[i] == positionTimeline[ i+1];
      }
      else var isNextTileSame = false

      let overLapped = positionsData.position_data.map((item)=>item.position_timeline[i]).find((item,index)=>(index != positionId&& item!= null&& item == positionTimeline[i])) != undefined
      
      if (overLapped && !setOverlap)
      {
        overLappedData.push({place:current_length,type:'start'})
       setOverlap = true
        
      } else if ((!overLapped && setOverlap )|| (!isNextTileSame && overLapped))
      {
        if((!isNextTileSame && overLapped))  overLappedData.push({place:current_length+1,type:'end'})
        else overLappedData.push({place:current_length,type:'end'})
        setOverlap = false
      }
      current_length += 1

      if (!isNextTileSame)
      {
        
        if(setOverlap)
        {
          overLappedData.push({place:current_length,type:'end'})
        setOverlap = false
        }
        
        if(viewType == 'Player')
        {
          transformed_data.push({name: assignNameColorPos(positionTimeline[i],positionsData.position_data)[0], length: current_length,color: assignNameColorPos(positionTimeline[i],positionsData.position_data)[1], overlap:overLappedData})
        }
        else
        {
          transformed_data.push({name: assignNameColor(positionTimeline[i],playerData)[0], length: current_length,color: assignNameColor(positionTimeline[i],playerData)[1], overlap:overLappedData})
        }
        current_length = 0
        overLappedData = []
    
      
      }  
     }
    }
    else if(currentInterval < activeGameInterval)
    {
      console.log('l')
      transformed_data.push({name:'Already Played',length:intervalLength,color:'white',overlap:[]})
      
    }
    else
    {
      for(let i = (currentInterval-1)*intervalLength; i < currentInterval*intervalLength; i++)
     {
      
      
       
       
      //Checking if next tile is diffrent - indexing error prevention
      if( i < (currentInterval)*intervalLength-1)
      {
        var isNextTileSame = positionTimeline[i] == positionTimeline[ i+1];
      }
      else var isNextTileSame = false

      let overLapped = positionsData.position_data.map((item)=>item.position_timeline[i]).find((item,index)=>(index != positionId&& item!= null&& item == positionTimeline[i])) != undefined
      
      if (overLapped && !setOverlap)
      {
        overLappedData.push({place:current_length,type:'start'})
       setOverlap = true
        
      } else if ((!overLapped && setOverlap )|| (!isNextTileSame && overLapped))
      {
        if((!isNextTileSame && overLapped))  overLappedData.push({place:current_length+1,type:'end'})
        else overLappedData.push({place:current_length,type:'end'})
        setOverlap = false
      }
      current_length += 1

      if (!isNextTileSame)
      {
        
        if(setOverlap)
        {
          overLappedData.push({place:current_length,type:'end'})
        setOverlap = false
        }
        
        if(viewType == 'Player')
        {
          transformed_data.push({name: assignNameColorPos(positionTimeline[i],positionsData.position_data)[0], length: current_length,color: assignNameColorPos(positionTimeline[i],positionsData.position_data)[1], overlap:overLappedData})
        }
        else
        {
          transformed_data.push({name: assignNameColor(positionTimeline[i],playerData)[0], length: current_length,color: assignNameColor(positionTimeline[i],playerData)[1], overlap:overLappedData})
        }
        current_length = 0
        overLappedData = []
    
      
      }  
     }
    }


     
     return transformed_data
   }
  

   

  return(
  <GestureHandlerRootView    style = {styles.sliderBarContainer}>
 
    {/* Text for position */}
    <View style = {{justifyContent:'center',width:70,textAlign:'center',alignItems:'center'}}>
    <Text style = {styles.position_font}>{positionName}</Text>
    </View>
    {/* Pan gesture handler handles drag event */}
    <PanGestureHandler 
      onActivated = {(drag) => dragStart(drag)}
      onGestureEvent = {(drag) => dragActive(drag)}
      onEnded = {(drag) => dragEnd(drag)}>
      
      {/* First view is the primary view all the other views are stacked on top of this. Onlayout is used to setup calculations*/}
      <View 
       key = {positionName}
        onLayout={(k) => {
        if(viewType == 'Position')
        {
          updateIntervalWidth([positionId,(k.nativeEvent.layout.width-sliderBorderWidth*2)/intervalLength])
          
        } 
        else
        {
          
          updatePlayerIntervalWidth([team_id,positionId,(k.nativeEvent.layout.width-sliderBorderWidth*2)/intervalLength])
        }
      }}
        
        style = {styles.sliderBarBody}>

        {/* Top layer that displays transformed data */}
        <View style = {{position:'absolute',flexDirection:'row'}}>
          
          {transformed_data_for_visual().map((prop,index) => {
         
            return(
              
              <View key = {index}  style = {{...styles.sliderBox, height:(prop.name == null? 0:sliderContentHeight), width: positionIntervalWidth*prop.length, backgroundColor:(prop.name == null? 'transparent':prop.color)}}>
            
                {(prop.overlap != []) ? 
                
                <View style = {{flex:1}}>
                  <View style = {{position:'absolute',flexDirection:'row'}}>
                  {prop.overlap.map((item,i) => 
                  {
                    if(i!=0 && viewType == 'Position')
                    {
                      
                      return(
                        
                  
                          <View key = {i} style = {{ width: (item.place-prop.overlap[i-1].place)*positionIntervalWidth,backgroundColor:'red', opacity: (item.type == 'end'? 0.3: 0),height:sliderContentHeight}} >
                           <ImageBackground imageStyle = {{resizeMode:'repeat'}} source = {require('./images/overlap.png')} style = {{flex:1}}>
                            <View style = {{flex:1}}></View>
                           </ImageBackground>
                          </View>
                       
                        
                        
                      )
                    }
                    else
                    {
                     
                      return(
                        <View key = {i} style = {{ width: item.place*positionIntervalWidth}}></View>
                      )

                    }
                  })}
                  </View>
                </View>:<View></View>
                 }
               
                <View style = {{position:'absolute',flexDirection:'row',height:sliderContentHeight,width:positionIntervalWidth*prop.length,justifyContent:'center',alignItems:'center'}}>
                  <Text style = {styles.sliderText}>{prop.name}</Text>

                </View>
                
              </View>
            )
          })}

        </View>
        
        
        {/* Layer that handles the picker selects */}
        {positionTimeline.map((prop,i) => {   
           
          if(i >= (currentInterval-1)*intervalLength && i < ((currentInterval)*intervalLength) )
          {
           
            const key = i
            const name = prop 
            const index = i 
            const offset =intervalLength*(currentInterval-1)
            

            return(
              <View key = {i}  style = {{flex:1,borderColor:'black',justifyContent:'center'}}>
  
        
                    {(name == null)  ?
                    <View style = {{alignItems:'center',justifyContent:'center',flex:1}}>
                      <SelectDropdown
                      data={pickerSelectData}
                      onSelect={(selectedItem, index) => {
                        updatePosition([i,selectedItem.value,positionId])
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem.label
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item.label
                      }}
                      renderCustomizedButtonChild={(item,i,number=(index+1)-offset)=>{
                   
                        return (
                          
                            <Text style = {{fontSize:16,textAlign:'center'}}>{number}</Text>
                          )
                      }}
                      
                     // defaultButtonText={((index+1)-offset).toString()}
                      defaultValue={'a'}
                     
                    
                      buttonStyle={{padding:0,margin:0,width:'100%',backgroundColor:'transparent'}}
                      buttonTextStyle={{padding:0,margin:0}}
                      rowStyle={{padding:0,margin:0}}
                      
                      dropdownStyle={{borderRadius:9,width:dropDownWidth}}
                      
                    />
                    
                     
                    </View> : <View></View> 
                   
        }
                  </View>
            )
          }
        })}
          
        {/* Drag bar later that is placed on top */}
        {(dragBar[3] == positionId )?
          
          <View style = {{position:'absolute',flexDirection:'row'}}>
            <View style = {{ width: (dragBar[0].end-dragBar[0].start),opacity:0,height:sliderContentHeight}}/>
            <View style = {{...styles.dragBar,backgroundColor: assignNameColor(positionTimeline[startTile],playerData)[1], width: dragBar[1].end-dragBar[1].start}}/>
            <View style = {{width: dragBar[2].end-dragBar[2].start,height:sliderContentHeight}}/>   
          </View>: null
      }
         
      </View>
          
          
    </PanGestureHandler>

  </GestureHandlerRootView>
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
      height:sliderContentHeight,
      borderRadius: 9
    },
    sliderBarContainer: {
      height:sliderBodyHeight,
      flexDirection:'row',
      marginRight: sliderBarRightMargin,
      marginTop: sliderBarTopMargin,
    },
    
    sliderBarBody: {
      flexDirection:'row',
      flex:1,
      borderWidth: 1,
      borderRadius:9
    },
    
    position_font: {
      fontSize: 30,
      
    }
  })

export default(SliderBar)