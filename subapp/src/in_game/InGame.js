import React from 'react'
import {Text,StyleSheet,View, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

function InGame()
{
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
                    <View style = {styles.subBar}>
                        <Text style = {styles.sideText}>-00:12</Text>
                        <Text style = {styles.nameText}>Tom ➜ Toby</Text>
                        <Text style = {styles.sideText}>LB</Text>
                    </View>
                </View>
            </View>
            <View style = {styles.pitchSide}>
            <Image source = {require('/b.jpg')}></Image>
                <View style ={styles.gamePitch}>
                    

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
    subInfo: {
        backgroundColor: 'yellow',
        flex: 3
    },
    titleText: {
        fontSize: 20
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