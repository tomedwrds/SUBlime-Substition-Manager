import React from "react"
import { View,Text, Button,StyleSheet } from "react-native"

import SelectDropdown from "react-native-select-dropdown";
import { memo } from "react";
const AddPlayer =(props) =>
    {
        //Back number text
        //<View style = {{flex: 1,justifyContent:'center',alignItems:'center'}}><Text style = {{fontSize: 20,color: 'white',opacity: 0.1}}>{props.index+1}</Text></View>
        return(
          
          
      <View  style = {{flex:1,borderColor:'black'}}>
  
        
                    {(props.name == null)  ?
                    <View style = {{alignItems:'center',justifyContent:'center',}}>
                      <SelectDropdown
                      data={props.pickerSelectData}
                      onSelect={(selectedItem, index) => {
                        props.updatePosition()
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
                      defaultButtonText={((props.index+1)-props.offset).toString()}
                    //  buttonStyle={{wid}}
                    />
                      {/* <RNPickerSelect 
                        onValueChange={props.updatePosition }
                        placeholder={{ label: ((props.index+1)-props.offset).toString(), value: null }}
                        style = {pickerSelectStyles}
                        items={props.pickerSelectData}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}/> */}
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