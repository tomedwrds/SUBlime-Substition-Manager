import React from "react"
import { View,StyleSheet,Text, Pressable,Alert } from "react-native"
import SelectDropdown from "react-native-select-dropdown"
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
            case '9F':
                return <FootballPitch/>  
            case 'R':
                return <RugbyPitch/>  
            default:
                return <HockeyPitch/>
                
        }
    }
    let positionSelectionData = []
    switch(props.sport)
    {
        case '11H':
        positionSelectionData = [
        
            {label: 'Left Foward', value:'LF'},
            {label: 'Centre Foward', value:'CF'},
            {label: 'Right Foward', value:'RF'},
            {label: 'Left Inner', value:'LI'},
            {label: 'Right Inner', value:'RI'},
        
            {label: 'Left Half', value:'LH'},
            {label: 'Centre Half', value:'CH'},
            {label: 'Right Half', value:'RH'},
            {label: 'Left Back', value:'LB'},
            {label: 'Centre Back', value:'CB'},
            {label: 'Right Back', value:'RB'},
            {label: 'Goal Keeper', value:'GK'}]
            break;
        case '7H':
        positionSelectionData = [
            {label: 'Striker', value:'ST'},
            {label: 'Left Foward', value:'LF'},
            {label: 'Centre Foward', value:'CF'},
            {label: 'Right Foward', value:'RF'},
            
            {label: 'Midfield', value:'MF'},
            {label: 'Left Half', value:'LH'},
            {label: 'Right Half', value:'RH'},
            {label: 'Defender', value:'DF'},
            {label: 'Left Back', value:'LB'},
            {label: 'Centre Back', value:'CB'},
            {label: 'Right Back', value:'RB'},
            {label: 'Goal Keeper', value:'GK'}]
            break;
        case 'T':
        positionSelectionData = [
            {label: 'Left Back', value: 'LB'}
        ]
        break;
        case 'N':
        positionSelectionData = [
            {label: 'Attack', value: 'A'},
            {label: 'Centre', value: 'C'},
            {label: 'Defence', value: 'D'},
        ]
        break;
        case 'NS':
        positionSelectionData = [
            {label: 'Goal Shoot', value: 'GS'},
            {label: 'Goal Attack', value: 'GA'},
            {label: 'Wing Attack', value: 'WA'},
            {label: 'Centre', value: 'C'},
            {label: 'Wing Defence', value: 'WD'},
            {label: 'Goal Defence', value: 'GD'},
            {label: 'Goal Keep', value: 'GK'},
        ]
        break;
        case 'B':
        positionSelectionData = [
        {label: 'Point Guard (1)', value: 'PG-1'},
        {label: 'Shooting Guard (2)', value: 'SG-2'},
        {label: 'Small Foward (3)', value: 'SF-3'},
        {label: 'Power Foward (4)', value: 'PF-4'},
        {label: 'Centre (5)', value: 'C-5'}
        ]
        break;
        case 'R':
        positionSelectionData = [
            {label: 'Loosehead Prop', value: 'LP'},
            {label: 'Hooker', value: 'H'},
            {label: 'Tighthead Prop', value: 'TP'},
            {label: 'Loosehead Lock', value: 'LL'},
            {label: 'Tighthead Lock', value: 'TL'},
            {label: 'Blindside Flanker', value: 'BF'},
            {label: 'Openside Flanker', value: 'OF'},
            {label: 'Number 8', value: 'N8'},
            {label: 'Scrum Half', value: 'SH'},
            {label: 'Fly Half', value: 'FH'},
            {label: 'Inside Centre', value: 'IC'},
            {label: 'Outside Centre', value: 'OC'},
            {label: 'Left Wing', value: 'LW'},
            {label: 'Full Back', value: 'FB'},
            {label: 'Right Wing', value: 'RW'}
        ]
            break;
        case '11F':
            positionSelectionData = [
            
            {label: 'Left Wing', value:'LW'},
            {label: 'Centre Foward', value:'CF'},
            {label: 'Right Wing', value:'RW'},
            {label: 'Left Midfield', value:'LM'},
            {label: 'Centre Midfield', value:'CM'},
            {label: 'Centre Attacking Midfield', value:'CAM'},
            {label: 'Centre Defending Midfield', value:'CDM'},
            {label: 'Right Midfield', value:'RM'},
            {label: 'Left Back', value:'LB'},
            {label: 'Centre Back', value:'CB'},
            {label: 'Right Back', value:'RB'},
            {label: 'Goal Keeper', value:'GK'}]
            
            break;
            case '9F':
            positionSelectionData = [
            
                {label: 'Left Wing', value:'LW'},
                {label: 'Centre Foward', value:'CF'},
                {label: 'Right Wing', value:'RW'},
                {label: 'Left Midfield', value:'LM'},
                {label: 'Centre Midfield', value:'CM'},
                {label: 'Right Midfield', value:'RM'},
                {label: 'Left Back', value:'LB'},
                {label: 'Centre Back', value:'CB'},
                {label: 'Right Back', value:'RB'},
                {label: 'Goal Keeper', value:'GK'}]
                
                break;
            case '7F':
            positionSelectionData = [
            
                {label: 'Left Wing', value:'LW'},
                {label: 'Centre Foward', value:'CF'},
                {label: 'Right Wing', value:'RW'},
                {label: 'Left Midfield', value:'LM'},
                {label: 'Right Midfield', value:'RM'},
                {label: 'Left Back', value:'LB'},
                {label: 'Centre Back', value:'CB'},
                {label: 'Right Back', value:'RB'},
                {label: 'Goal Keeper', value:'GK'}]
                
                break;
        default:
        break;


    }
    
    function deletePosition(row,column)
    {
        console.log('asfs')
        if(props.updateFormation != undefined)
        {
            Alert.alert(
                "Confirmation",
                "Do you wish to remove this player from the formation",
                [
                  {
                    text: "Cancel",
                  
                    style: "cancel"
                  },
                  { text: "Confirm", onPress: () =>  props.updateFormation(Object.assign([...props.layoutData], {
                    [row]: Object.assign([...props.layoutData[row]], {
                      [column]: -1
                    })
                  })) }
                ]
              );
            
           
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
            {props.layoutData.map((prop,row) =>
            {
              
                return(
                    
                    <View key = {row} style = {{flex: 1,flexDirection:'row'}}>
                        
                        {/* Mapping the icons */}
                        {prop.map((prop,column) => {
                            
                            //All icons need to be rendred due to how the positioning of them is depedente on flex
                            //However we dont want all icons to appear so a transparency is applied if they shouldnt appear

                            let opacity_ = 1
                            if (prop == 0)  opacity_ = 0
                            if(prop != -1)
                            {
                                return(
                                    
                                    <Pressable disabled={props.updateFormation == undefined} key = {column} style ={{...styles.iconBodyStyle, opacity: opacity_}} onPress = {()=>deletePosition(row,column)}>
                                        <Text style = {styles.iconText}>{prop != 0 ? prop[1]:''}</Text>
                                    </Pressable>        
                                )
                            }
                            else
                            {
                                return(                              
                                    <View key = {column} style ={{flex:1,overflow:'hidden',justifyContent:'center'}}>
                                        <SelectDropdown
                                            data={positionSelectionData}
                                            onSelect={(selectedItem, index) => {
                                               
                                                props.updateFormation(Object.assign([...props.layoutData], {
                                                    [row]: Object.assign([...props.layoutData[row]], {
                                                      [column]: [selectedItem.label,selectedItem.value]
                                                    })
                                                  }))
                                                
                                                
                                            }}
                                            renderCustomizedButtonChild={(item,index)=>{
                                                return(
                                                    <View key = {index} style ={{flex:1,
                                                        margin:'0.2%',
                                                        justifyContent:'center',
                                                        alignItems:'center',
                                                        aspectRatio:1,
                                                        top:0}}>
                                                    <Text style = {{fontSize:24,color:'white',fontWeight:'bold'}}>+</Text>
                                                </View>
                                                )

                                            }}
                                            buttonStyle={{backgroundColor:'transparent'}}
                                            rowTextForSelection={(item, index) => {
                                                // text represented for each item in dropdown
                                                // if data array is an array of objects then return item.property to represent item in dropdown
                                                return item.value
                                            }}
                                            dropdownStyle={{borderRadius:10,width:60}}

                                            
                                           
                                       
                                        />
                                    </View>
                                    
                                ) 
                            }
                        
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