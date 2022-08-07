import React from "react"
import { View,StyleSheet,Text } from "react-native"
import BasketballPitch from "./BasketballPitch"
import FootballPitch from "./FootballPitch"
import HockeyPitch from "./HockeyPitch"
import NetballPitch from "./NetballPitch"
import RugbyPitch from "./RugbyPitch"

function GamePitch(props)
{
    const RenderedPitch = () =>
    {
        switch(props.sport)
        {
            case '7H':
                return <HockeyPitch/>
                
            case '11H':
                return <HockeyPitch/>
                
            case 'N':
                return <NetballPitch/>
            case 'NS':
                return <NetballPitch/>
                
            case 'B':
                return <BasketballPitch/>
            case '11F':
                return <FootballPitch/>
            case '7F':
                return <FootballPitch/>  
            case 'R':
                return <RugbyPitch/>  
            default:
                return <HockeyPitch/>
                
        }
    }
    
    return(
        <View style = {{flex:1}} >
            {/* Game pitch serves as view for all absolute drawing to take place within */}
            <View style = {styles.gamePitch}>
                <RenderedPitch/>
            </View>    
            
            {/* Mapping of all icons to the pitch.
                the first map creates the rows than the second map renders the icons   */}
            {props.layoutData.map((prop,index) =>
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
    )
}

const styles = StyleSheet.create({
    gamePitch: {
        position: 'absolute',
        height: '100%',
        width:'100%',
        borderWidth:2,
        borderColor:'white',
        borderRadius:20,
        overflow:'hidden'
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
        fontSize: 16,
        color:'white'
    }
})

export default (GamePitch)