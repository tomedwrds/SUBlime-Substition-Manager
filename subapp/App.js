// In App.js in a new project



import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {Pressable, Text,View,StyleSheet, Animated} from 'react-native'
import { FlatList, GestureHandlerRootView, PanGestureHandler, State, TapGestureHandler } from 'react-native-gesture-handler';
import { shadow } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';

//import { createStore } from 'redux';
//import { Provider } from 'react-redux';

//import PlayerView from './src/PlayerView';



//Intalize Array that contains data of all players and then set it to list hook
const players = [

];

const initalState = {
  players: []
}

//Reducer function
/*const reducer =(state = initalState,action) => {
  switch (action.type) {
    //switch in here
  }
  return state;
}*/

//const store = createStore(reducer)

const DATA = [
  {
      name: '1',
      color: 'red',
      index: 0
  },
  {
      name: '2',
      color: 'purple',
      index: 1
  },
  {
      name: '3',
      color: 'orange',
      index: 2
  },
  {
      name: '4',
      color: 'black',
      index: 3
  },
  {
    name: '5',
    color: 'yellow',
    index: 4
  }



]
const sliderBarMargin = 20

const TagSection = (props) =>
{
  
  
  return(
    <Pressable
      
      style = {{...styles.tagSection, backgroundColor: props.color, width: props.width  , justifyContent: 'center', alignItems: 'center'}}
      
    >
      <Text
        style = {styles.tagSectionText}
      >{props.name}</Text>
    </Pressable>
    
  )

}



function App() {
 
  
  
  
  
  const [width, setWidth] = useState(100)
  


  const windowWidth = Dimensions.get('window').width;
  const [widths, setWidths] = useState((new Array(DATA.length).fill((windowWidth-2*sliderBarMargin)/DATA.length)))
  const[intWidth, setIntWidth] = useState(widths)
 
  const [DATAstuff, setDatastuff] = useState(DATA)
  
  const new_width = (index ) => {
    
      const k = widths.slice()
      k[index] = 300
      
      setWidths(k) 
      
      
  }
  return(
    
    <SafeAreaView>
      <View style = {styles.sliderBar}>
        {DATAstuff.map((prop,index) => {
            
            return (
              <PanGestureHandler key = {index} activeOffsetX={[-20,20]} onGestureEvent={(k) => 
                {
                  if (k.nativeEvent.state == State.ACTIVE)
                  {
                      // 1 left, 1 right
                      const move_dir =1
                     // k.nativeEvent.
                      const j = widths.slice()
                      j[index] = k.nativeEvent.x
                      j[index+1] = j[index+move_dir] - move_dir*(j[index] -widths[index])
                      
                      setWidths(j) 

                      if (widths[index+move_dir] < 10)
                      {
                        
                        const newList = DATAstuff.slice()
                        newList.splice(index+move_dir,1)

                        setDatastuff(newList)
                        const newList2 = widths.slice()
                        newList2.splice(index+move_dir,1)
                        newList2[index] += widths[index+move_dir]
                        setWidths(newList2)
                        console.log(newList)
                        
                        
                      }
                      
                    
                  }
                }}
                >
                
                <View style={{ width: widths[index], height: 100, backgroundColor: prop.color }}>
                  <Text style = {styles.tagSectionText}>{prop.name}</Text>
                </View>
                
                
              </PanGestureHandler>
              //<SafeAreaView>TagSection name = {prop.name}  color = {prop.color} width = {widths[prop.index]} ></TagSection>
            //   <Pressable
            //   key = {index}
            //   style = {{...styles.tagSection, backgroundColor: prop.color, width: widths[index]  , justifyContent: 'center', alignItems: 'center'}}
            //   onPress = {() => new_width(index)}
            // >
            //   <Text
            //     style = {styles.tagSectionText}
            //   >{prop.name}</Text>
            // </Pressable>
            
              );
          })}
      </View>
        
      
    </SafeAreaView>
    
    
    
        // <SafeAreaView>
          // <PanGestureHandler activeOffsetX={[-60,60]} onGestureEvent={(k) => 
          //   {
          //     if (k.nativeEvent.state == State.ACTIVE)
          //     {
          //       setWidth(k.nativeEvent.x)
          //     }
          //   }}
          //   >
            
          //   <View style={{ width: width, height: 100, backgroundColor: "red" }}>
          //     <Text>HEY!</Text>
          //   </View>
            
            
          // </PanGestureHandler>
        //   </SafeAreaView>
      
      
     
      
    
    
  )
  
}
const styles = StyleSheet.create({

  tagSection: {
    height: 100,
  },
  tagSectionText: {
    fontSize: 30,
    color: 'white'
  },
  sliderBar: {
    flexDirection: 'row',
    
    borderWidth: 3,
    borderRadius: 40,
    overflow: 'hidden',
    margin: sliderBarMargin
  }
})
export default App;