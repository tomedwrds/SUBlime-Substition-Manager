import React from "react"
import { View,Text, Button,StyleSheet } from "react-native"
import RNPickerSelect from 'react-native-picker-select';
import { memo } from "react";
const AddPlayer =(props) =>
    {
        //Back number text
        //<View style = {{flex: 1,justifyContent:'center',alignItems:'center'}}><Text style = {{fontSize: 20,color: 'white',opacity: 0.1}}>{props.index+1}</Text></View>
        return(
      <View  style = {{flex:1,borderColor:'black'}}>
        
                    {(props.name == null)  ?
                    <View style = {{alignItems:'center',justifyContent:'center',}}>
                      <RNPickerSelect 
                        onValueChange={props.updatePosition }
                        placeholder={{ label: ((props.index+1)-props.offset).toString(), value: null }}
                        style = {pickerSelectStyles}
                        items={props.pickerSelectData}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}/>
                    </View> : <View></View> 
                   
        }
                  </View>
        )
      
    }
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
          height: '100%',
          textAlign: 'center',

      
       
        
      
        
      },
        placeholder: {
          color: 'grey'
        }
      });
export default memo(AddPlayer)