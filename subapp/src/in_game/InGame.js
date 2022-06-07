import React, { useState } from 'react'
import {Text,StyleSheet,View, Image,ImageBackground, Pressable} from 'react-native'
import { FlatList,SectionList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatGrid } from 'react-native-super-grid';
import PlayerIcon from './PlayerIcon.js'

import UpcomingSub from './UpcomingSub.js'


const totalColumns = 7;
const totalRows = 11;

function InGame()
{
    function renderIcon({item}) {
        return <PlayerIcon width = {iconWidth} height = {iconHeight} name = {item}/>
    }
    
    const layoutCalcs = (k) => {
        //Find width of icons
        setIconWidth(k.nativeEvent.layout.width / totalColumns)
        setIconHeight(k.nativeEvent.layout.height / totalRows)
    }

    const DATA = new Array(totalRows*totalColumns).fill('TE');
    const [iconWidth, setIconWidth] = useState(10)
    const [iconHeight, setIconHeight] = useState(10)
    return(
        <SafeAreaView style = {styles.body}>
            <View style = {styles.infoSide}>
                <View style = {styles.gameInfo}>
                    <Text style = {styles.titleText}>Game Information</Text>
                    <Text style = {styles.generalText}>Game Information</Text>
                    <Text style = {styles.generalText}>Game Information</Text>
                    <Text style = {styles.generalText}>Game Information</Text>

                </View>
                <View style = {styles.subInfo}>
                    <UpcomingSub subPos = 'LB' playerOn = 'Tom' playerOff = 'Toby' time = '1'></UpcomingSub>
                </View>
            </View>
            <View style = {styles.pitchSide}>
            
                <View style ={styles.gamePitch} >
                
                <ImageBackground onLayout = {layoutCalcs} source={require('./b.jpg')} style = {{width: '100%', height: '100%'}}>
                <FlatList
                        data = {DATA}
                        renderItem = {renderIcon}
                       
                        numColumns = {totalColumns}
                        key = {4}
                />
                    
                
                </ImageBackground>


                </View>
            </View>
        </SafeAreaView>
    )
       
}
const styles = StyleSheet.create({
    body: {
     
        flex: 1,
        flexDirection: 'row'
    },
    infoSide: {
        backgroundColor: 'blue',
        flex:1
    },
    pitchSide: {
        
        flex: 1
    },
    gameInfo: {
        backgroundColor: 'pink',
        flex: 2,
        color:'red'
    },
    
    titleText: {
        fontSize: 20
    },
    subInfo: {
        backgroundColor: 'yellow',
        flex: 3
    },
    subBar: {
        flexDirection: 'row',
        backgroundColor:'#00bfff',
        margin:20,
        borderRadius: 4,
        height: 60,
        alignItems: 'center'
    },
    nameText:{
        flex: 1,
        fontSize:20,
        textAlign:'center',
        color: 'white',
        borderWidth: 2,
        borderBottomColor: 'rgba(0,0,0,0)',
        borderTopColor: 'rgba(0,0,0,0)',
        borderLeftColor: 'white',
        borderRightColor: 'white'
    },
    sideText:
    {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize:20,
        color: 'white'
    },
    gamePitch: {
        backgroundColor: 'green',
        flex: 1,
        marginHorizontal:30,
        marginVertical: 10
    }
})
export default (InGame);