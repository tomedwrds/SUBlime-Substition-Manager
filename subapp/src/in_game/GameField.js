import React from "react"
import { View,StyleSheet,Text, Pressable } from "react-native"
import GamePitch from "./GamePitch"


const GameField = ({item},setSelectedLayout,selectedLayout) => {

    //Cutsomized styling to show what component is currently selected
    let selectedColor = '#D3D3D3'
    if (item.layoutId ==selectedLayout)
    {
        selectedColor = '#6ba1c4'
    }

    function updateSelection ()
    {
        
        //If not already selected, select. If selected unselect
        if (item.layoutId != selectedLayout)
        {
            setSelectedLayout(item.layoutId)
        }
        else
        {
            setSelectedLayout(null)
        }
    }
    if(item.layoutId != -1)
    {
        return(
            
            
            <Pressable style = {{flex:1}} onPress = {()=>{(updateSelection())}}>

                {/* gamePitchContainer is the wrapping view of all elemenets all formating of background color, border, margin etc is in this */}
                <View style = {{...styles.gamePitchContainer,backgroundColor:selectedColor}}>
                    
                    {/* Tile text */}
                    <Text style = {styles.nameText}>{item.layoutName}</Text>
                    {/* View wrapper needs to exist to allow magic fuckery of absolute positioning  */}
                    <GamePitch layoutData = {item.layoutData}/>
                </View>
            </Pressable>
          
        )
    }
    else
    {
        return(
            <View style = {{flex:1}}/>
        )
    }
}

const styles = StyleSheet.create({
    gamePitchContainer: {
        flex:1,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:20,
        marginLeft: 20,
        marginRight:20,
        marginVertical: 20
    },
    
  
    nameText: {
        fontSize:20,
        padding:10,
        textAlign:'center',

    },

    
})

export default (GameField)