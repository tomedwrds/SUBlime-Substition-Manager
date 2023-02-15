import React from "react";
import { Modal,View,Text,Pressable,Alert } from "react-native";
import GamePitch from "./GamePitch";
import { useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-element-textinput";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useEffect } from "react";

const CreateFormation = (props) => {
    const [formation,setFormation] = useState([
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1],
        [-1,-1,-1,-1,-1,-1,-1]])

    const [formationName, setFormationName] = useState('')
    
 
    
    
    
    useEffect(()=>{
        setFormation([
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1]])
        setFormationName('')
       
    },[props.displayModal])
  
 


    function getPostionsAdded()
    {
        let num = 0;
        for(let row = 0; row < formation.length; row++)
        {
            for(let column = 0; column < formation[row].length; column++)
            {
                if (formation[row][column] != -1) num ++
            }
        }
        return num
    }
    function addNewFormation()
    {
        if(formationName != '')
        {
          
            if(getPostionsAdded() == 0)
            {
                Alert.alert(
                    "Error",
                    "Formation must have at least one position",
                    [
                     
                      { text: "Close"}
                    ]
                  );
            }
            else
            {
                let formattedFormation = []
                for(let row = 0; row < formation.length; row++)
                {
                    let rowData = []
                    for(let column = 0; column < formation[row].length; column++)
                    {
                        if (formation[row][column] == -1) rowData.push(0)
                        else rowData.push(formation[row][column])
                    }
                
                    formattedFormation.push(rowData)
                }
                
                const newFormation = {layoutData:formattedFormation,layoutId:props.formationId,layoutName:formationName,layoutSport:props.sport}
                props.createFormation([props.teamIndex,newFormation])
                props.setDisplayModal(!props.displayModal)
            }
           
        }
        else
        {
            Alert.alert(
                "Error",
                "Enter a name for your formation to contiue",
                [
                 
                  { text: "Close"}
                ]
              );
        }

    }
 
    
   
    
    return(
        <Modal
        supportedOrientations={['landscape']}
        visible ={props.displayModal}
        onRequestClose = {()=>props.setDisplayModal(!props.displayModal)
        
        }
        animationType={'slide'}
        >
            <SafeAreaView style={{flexDirection:'row',flex:1,marginHorizontal:20,marginTop:30}}>
                <View style ={{flex:1,marginLeft:10}}>
                    <Text style = {{fontSize:40}}>Formation Creation</Text>
                    <TextInput placeholderTextColor={'#bfbbbb'} 
                        style = {{backgroundColor:'#ebebeb',borderRadius:9,fontSize:24,padding:12,width:350,textAlign:'center'}} placeholder="Formation Name" onChangeText={(value)=>setFormationName(value)}/>
                    <View style = {{flexDirection:'row',marginTop:15}}>
                        <Text style = {{fontSize:24}}>Positions Added: {getPostionsAdded()}</Text>
                    </View>
                    <View style ={{flexDirection:'row',marginTop:1,alignItems:'center'}}>
                        <Pressable onPress={()=>addNewFormation()}>
                        <Text style ={{fontSize:40}}>💾</Text>
                        </Pressable>
                        <Pressable onPress={()=>
                        Alert.alert(
                            "Warning",
                            "Closing a formation will cause all progress to be lost",
                            [
                                { text: "Cancel"},
                              { text: "Continue", onPress: ()=> props.setDisplayModal(!props.displayModal)}
                            ]
                          )
                            
                            
                            } style ={{marginLeft:10}}>
                            <Text style ={{fontSize:40}}>🗑️</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <GamePitch layoutData={formation} sport = {props.sport} updateFormation = {setFormation} currentPositions = {getPostionsAdded()}/>
                </View>
               
            </SafeAreaView>
        </Modal>
    )
}
export default (CreateFormation)