import React from "react"
import { View,StyleSheet,Text, Pressable, Alert } from "react-native"
import GamePitch from "./GamePitch"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from "react-redux";



const GameField = ({item},setSelectedLayout,selectedLayout,team_sport,formationManagment,teamId,deleteFormation) => {
    

    //Cutsomized styling to show what component is currently selected
    let selectedColor = '#D3D3D3'
    if (setSelectedLayout != null)
    {
        
        if (item.layoutId ==selectedLayout)
        {
            selectedColor = '#6ba1c4'
        }
    }

    function updateSelection ()
    {
     
        //If not already selected, select. If selected unselect
        if(setSelectedLayout != undefined)
        {
            setSelectedLayout(item.layoutId)
        }
      
    }

    function DeleteFormation()
    {
        if(formationManagment)
        {
            return <Pressable onPress = {()=>
                Alert.alert(
                    "Confirmation",
                    'Do you wish to delete this player',
                    [
                      //Array of selectable buttons
                     
                      { 
                        text: "Close", 
                       
                      },
                      { 
                        text: "Confirm", 
                        onPress: () => deleteFormation([teamId, item.layoutId])
                       
                      }
                    ]
                  )}>
                <Icon 
                    name='trash' 
                    size = {24} 
                    color = 'red'
                />
            </Pressable>
        }
        else
        {
            return null
        }
    }
    if(item.layoutId != -1)
    {
        return(
            
            
            <Pressable style = {{flex:1}} onPress = {()=>{(updateSelection()) }}>

                {/* gamePitchContainer is the wrapping view of all elemenets all formating of background color, border, margin etc is in this */}
                <View style = {{...styles.gamePitchContainer,backgroundColor:selectedColor}}>
                    
                    {/* Tile text */}
                    <View style = {{flexDirection:'row',alignItems:'center'}}>
                        <View style ={{flex:1,justifyContent:'center'}}>
                         <Text style = {styles.nameText}>{item.layoutName}</Text>
                        </View>
                        <View style ={{alignItems:'flex-end',justifyContent:'flex-end',alignItems:'flex-end'}}>
                            <DeleteFormation/>
                        </View> 
                       
                    </View>
                    {/* View wrapper needs to exist to allow magic fuckery of absolute positioning  */}
                    <GamePitch layoutData = {item.layoutData} sport = {team_sport}/>
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