import React from "react"
import { View,Text, Button } from "react-native"
import RNPickerSelect from 'react-native-picker-select';
import { memo } from "react";
const AddPlayer =(props) =>
    {
       
        return(
      <View  style = {{flex:1,borderColor:'black'}}>
        
                    {(props.name == null)  ?
                    <View style = {{alignItems:'center',justifyContent:'center'}}>
                      <RNPickerSelect 
                        onValueChange={props.updatePosition }
                        placeholder={{ label: (props.index+1).toString(), value: null }}
                        //style = {pickerSelectStyles}
                        items={props.pickerSelectData}
                        useNativeAndroidPickerStyle={false}
                        fixAndroidTouchableBug={true}/>
                    </View> : <View></View>
        }
                  </View>
        )
      
    }

export default memo(AddPlayer)