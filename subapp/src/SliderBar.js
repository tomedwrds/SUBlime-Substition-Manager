import React from "react"
import { Dimensions,View,Text,StyleSheet } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import AddPlayer from "./AddPlayer";
import assignNameColor from "./sliders/assignNameColor";
//General setup vars

const sliderBarRightMargin =20
const sliderBarTopMargin = 20
const sliderBorderWidth = 1
const sliderBodyHeight = 100 
const sliderContentHeight = sliderBodyHeight - sliderBorderWidth*2
const screen_width = Dimensions.get('window').width-sliderBarRightMargin

const SliderBar = ({item},updatePosition,updateIntervalWidth,moveDir,setMoveDir,dragBar,setDragBar,startTile,setStartTile,positionsData,playerData,generalData,assignNameColor) =>
{
 
    //Set up vars specific to each variable
    const positionName = item.position_inititals
    const positionId = item.position_id
    const positionTimeline = item.position_timeline
    const positionIntervalWidth = item.position_interval_width
    const pickerSelectData = playerData.player_data.filter(item => item.positions.includes(positionName) == true).map(item => ({label: item.name,value:item.id}))
    const intervalLength = generalData.interval_length
    const currentInterval = generalData.current_interval
  
    const totalIntervals = generalData.total_intervals
    

    const dragStart = (drag) => {
       
        //Get the start tile - newStartTile is used as opposed to a hook as hooks update async and therefore arent ideal
        const dragStartTile = Math.floor(drag.nativeEvent.x / positionIntervalWidth) + intervalLength*(currentInterval-1)
        
        //Check if tile has something in it as null tiles cannot be dragged
        if (positionTimeline[dragStartTile] != null)
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
                        updatePosition([i,null,positionId])
                    }
                }
            }
            //If moved beyond start tile
            else 
            {
             
                for (let k = startTile; k < endTile; k++)
                {
                    
                    updatePosition([k,positionTimeline[startTile],positionId])
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
                        updatePosition([i,null,positionId])
                    }
                }
            }
            else
            {
                for (let k = endTile; k < startTile; k++)
                {
                    updatePosition([k,positionTimeline[startTile],positionId])
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

 

   const transformed_data_for_visual = () =>
   {
     //Get a transformed version of teh data to play witth
     let transformed_data = []
     let current_length = 0;
     
     
     //loop through whole list
     for(let i = (currentInterval-1)*intervalLength; i < currentInterval*intervalLength; i++)
     {
      
       current_length += 1
       var isTileEmpty = positionTimeline[i] == null;
       if( i < (currentInterval)*intervalLength-1)
       {var isNextTileSame = positionTimeline[i] != positionTimeline[ i+1];}
       else var isNextTileSame = true
       if (isTileEmpty || (isNextTileSame && !isTileEmpty))
       {
     
         transformed_data.push({name: assignNameColor(positionTimeline[i],playerData)[0], length: current_length,color: assignNameColor(positionTimeline[i],playerData)[1]})
         current_length = 0
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
        onLayout={(k) => {updateIntervalWidth([positionId,(k.nativeEvent.layout.width-sliderBorderWidth*2)/intervalLength])}} 
        style = {styles.sliderBarBody}>

        {/* Top layer that displays transformed data */}
        <View style = {{position:'absolute',flexDirection:'row'}}>
          
          {transformed_data_for_visual().map((prop,index) => {
            return(
              <View key = {index}  style = {{...styles.sliderBox, height:(prop.name == null? 0:sliderContentHeight), width: positionIntervalWidth*prop.length, backgroundColor:(prop.name == null? 'transparent':prop.color)}}>
                <Text style = {styles.sliderText}>{prop.name}</Text>
              </View>
            )
          })}

        </View>
        
        
        {/* Layer that handles the picker selects */}
        {positionTimeline.map((prop,i) => {      
          if(i >= (currentInterval-1)*intervalLength && i < ((currentInterval)*intervalLength) )
          {
            
            return(
                <AddPlayer pickerSelectData ={pickerSelectData}
                //i is for index within positiontimeline. PositionId is the id of the position 
                updatePosition = { (value) => {updatePosition([i,value,positionId])}} 
                key = {i}  
                name = {prop } 
                index = {i} 
                offset ={intervalLength*(currentInterval-1)} ></AddPlayer>
              
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
      
      borderRadius: 5,
      justifyContent: 'center'
    },
    dragBar: {
      opacity:0.6,
      height:sliderContentHeight,
      borderRadius: 5
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
      borderRadius:5
    },
    
    position_font: {
      fontSize: 30,
      
    }
  })

export default(SliderBar)