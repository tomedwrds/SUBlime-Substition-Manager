import React from "react"
import { View,StyleSheet,Text, Pressable } from "react-native"



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
 
    return(
        //Pressable wrap is used for determing when elements have been pressed
        <Pressable style = {{flex:1}} onPress = {()=>{(updateSelection())}}>

            {/* gamePitchContainer is the wrapping view of all elemenets all formating of background color, border, margin etc is in this */}
            <View style = {{...styles.gamePitchContainer,backgroundColor:selectedColor}}>
                
                {/* Tile text */}
                <Text style = {styles.nameText}>{item.layoutName}</Text>
                {/* View wrapper needs to exist to allow magic fuckery of absolute positioning  */}
                <View >
                    {/* Game pitch serves as view for all absolute drawing to take place within */}
                    <View style = {styles.gamePitch}>

                        {/* Top quarter */}
                        <View style = {{flex: 1,flexDirection:'row', backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}>
                            <View style = {{flex:1, backgroundColor:'green'}}></View>
                            <View style = {{flex:4}}>
                                <View style = {{flex:17,borderRightWidth:2,borderLeftWidth:2,borderBottomWidth:2,borderColor:'white', borderBottomEndRadius:150,borderBottomStartRadius:150}}></View>
                                <View style ={{flex:3}}></View>
                            </View>
                            <View style = {{flex:1, backgroundColor:'green'}}></View>
                        </View>
                        {/* Middle half of field */}
                        <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}></View>
                        <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}></View>
                        
                        {/* Bottom quarter */}
                        <View style = {{flex: 1, backgroundColor: 'green',flexDirection:'row'}}>
                            <View style = {{flex:1, backgroundColor:'green'}}></View>
                            <View style = {{flex:4}}>
                                <View style = {{flex:3}}></View>
                                <View style = {{flex:17,borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderColor:'white', borderTopLeftRadius:150,borderTopRightRadius:150}}></View>
                            </View>
                            <View style = {{flex:1, backgroundColor:'green'}}></View>
                        </View>
                    </View>    
                    
                    {/* Mapping of all icons to the pitch.
                     the first map creates the rows than the second map renders the icons   */}
                    {item.layoutData.map((prop,index) =>
                    {
                        return(
                            <View key = {index} style = {{flex: 1,flexDirection:'row'}}>
                                
                                {/* Mapping the icons */}
                                {prop.map((prop,index) => {
                                    
                                    //All icons need to be rendred due to how the positioning of them is depedente on flex
                                    //However we dont want all icons to appear so a transparency is applied if they shouldnt appear

                                    let opacity_ = 1
                                    if (prop == 0)  opacity_ = 0
                                    
                                    return(
                                        
                                        <View key = {index} style ={{...styles.iconBodyStyle, opacity: opacity_}}>
                                            <Text style = {styles.iconText}>{prop != 0 ? prop[1]:''}</Text>
                                        </View>
                                        
                                    )
                                
                                })}
                            </View>
                        )
                    })}

                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    gamePitchContainer: {
        flex:1,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:20,
        marginLeft: 40,
        marginRight:40,
        marginVertical: 20
    },
    gamePitch: {
        position: 'absolute',
        height: '100%',
        width:'100%',
        borderWidth:2,
        borderColor:'white',
        borderRadius:20,
        overflow:'hidden'
    },
  
    nameText: {
        fontSize:20,
        textAlign:'center',

    },
    iconBodyStyle: {
        flex:1,
        backgroundColor:'#78C5EF',
        margin:'0.2%',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        aspectRatio:1,
        top:0,
        
    },
    iconText: {
        fontSize: 20,
        color:'white'
    }
})

export default (GameField)