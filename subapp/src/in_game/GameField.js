import React from "react"
import { View,FlatList,StyleSheet,Text } from "react-native"
import { useState } from "react"

import PlayerIcon from './PlayerIcon.js'


const GameField = (props) => {
    const [iconWidth, setIconWidth] = useState(50)
    const [iconHeight, setIconHeight] = useState(50)
    const totalColumns = 7;
    const totalRows = 11;

    const DATA =   [
                    [0,0,0,'CF',0,0,0],
                    [0,0,'LF',0,'RF',0,0],
                    [0,'RI',0,0,0,'LI',0],
                    [0,0,0,'CH',0,0,0],
                    ['LH',0,0,0,0,0,'RH'],
                    [0,0,'CB',0,'CB',0,0],
                    [0,0,0,'GK',0,0,0]]
  
    
 
    return(
        <View style ={styles.gamePitch} onLayout = {(k) =>{setIconWidth(k.nativeEvent.layout.width/totalColumns); setIconHeight(k.nativeEvent.layout.height/totalRows)}} >
        <View style = {{position: 'absolute',height: '100%',width:'100%',borderWidth:2,borderColor:'white',borderRadius:20,overflow:'hidden'}}>
          <View style = {{flex: 1,flexDirection:'row', backgroundColor: 'green',borderBottomWidth:2,borderColor:'white'}}>
            <View style = {{flex:1, backgroundColor:'green'}}></View>
            <View style = {{flex:4}}>
                <View style = {{flex:17,borderWidth:2,borderColor:'white', borderBottomEndRadius:150,borderBottomStartRadius:150}}></View>
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
                <View style = {{flex:17,borderWidth:2,borderColor:'white', borderTopLeftRadius:150,borderTopRightRadius:150}}></View>
            </View>
            <View style = {{flex:1, backgroundColor:'green'}}></View>
          </View>
        </View>    
          
                             
                {DATA.map((prop,index) =>
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
    )
}

const styles = StyleSheet.create({
    gamePitch: {
       
        flex: 1,
        marginHorizontal:30,
        marginVertical: 10
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