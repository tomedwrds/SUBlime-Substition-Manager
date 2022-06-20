import React from "react"
import { View,FlatList,StyleSheet,Text } from "react-native"
import { useState } from "react"

import PlayerIcon from './PlayerIcon.js'


const GameField = ({item}) => {


    
  
    
 
    return(
        <View style = {styles.gamePitchContainer}>
        <View style = {{flex: 1}}>
            <Text style = {styles.nameText}>{item.layoutName}</Text>
            
        </View>
        <View style ={styles.gamePitch}  >
        
        <View style = {{position: 'absolute',height: '100%',width:'100%',borderWidth:2,borderColor:'white',borderRadius:20,overflow:'hidden'}}>
          <View style = {{flex: 1,flexDirection:'row', backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}>
            <View style = {{flex:1, backgroundColor:'green'}}></View>
            <View style = {{flex:4}}>
                <View style = {{flex:17,borderRightWidth:2,borderLeftWidth:2,borderBottomWidth:2,borderColor:'white', borderBottomEndRadius:150,borderBottomStartRadius:150}}></View>
                <View style ={{flex:3}}></View>
            </View>
            
            <View style = {{flex:1, backgroundColor:'green'}}></View>
          </View>
          <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}></View>
          <View style = {{flex: 1, backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}></View>
          <View style = {{flex: 1, backgroundColor: 'green',flexDirection:'row'}}>
            <View style = {{flex:1, backgroundColor:'green'}}></View>
            <View style = {{flex:4}}>
                <View style = {{flex:3}}></View>
                <View style = {{flex:17,borderRightWidth:2,borderLeftWidth:2,borderTopWidth:2,borderColor:'white', borderTopLeftRadius:150,borderTopRightRadius:150}}></View>
            </View>
            <View style = {{flex:1, backgroundColor:'green'}}></View>
          </View>
        </View>    
          
                             
                {item.layoutData.map((prop,index) =>
                {
                    return(
                        <View key = {index} style = {{flex: 1,flexDirection:'row'}}>
                            {prop.map((prop,index) => {
                                let opacity_ = 1
                                if (prop == 0)  opacity_ = 0
                                return(
                                    
                                    <View key = {index} style ={{...styles.iconBodyStyle, opacity: opacity_}}>
                                        <Text style = {styles.iconText}>{prop != 0 ? prop:''}</Text>
                                    </View>
                                    
                                    )
                            
                            })}
                        </View>
                    )
                })}
             
               
                    
                
               


                </View>
                </View>
    )
}

const styles = StyleSheet.create({
    gamePitchContainer: {
        flex:1,
        backgroundColor:'#D3D3D3',
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        borderRadius:20,
        margin:20
    },
    gamePitch: {
        
        flex: 9,
        
        
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