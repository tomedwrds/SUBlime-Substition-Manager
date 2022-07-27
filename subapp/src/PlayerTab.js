import React from "react";
import { Alert,Text,View,Pressable,TextInput,StyleSheet,FlatList } from "react-native";
import { Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
const PlayerTab = ({item},positionSelectionData,updateName,addPositionToPlayer,removePositionFromPlayer,removePlayer,updateSelectedPos,positionState,current_team_index) => {
  

 
    //Fetch the vars relavent to the player
    const playerId = item.id;
    const playerName = item.name;
    const playerPositions = item.positions;
    const playerSelectedPos = item.selectedPos;
    
    //Creates a modal that then prompts the ability to delete a player
    const deletePlayer = () => {
      //Create alert to show to player
      Alert.alert(
        "Do you wish to delete this player?",
        '',
        [
          //Creates an array of selectable player
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Confirm", 
            onPress: () => removePlayer([current_team_index,playerId])
           
          }
        ]
      )
    }
  
  
    //Render a position chip for each position in the list
    const renderPositionChips = ({ item }) => (
      
      <Chip 
        style = {styles.positions} 
        onPress = {() => {deletePosition(item)}} 
        onClose = {() => {}} >
          {item}
  
      </Chip>
      
    );
    
  
    //Add a position to a player
    function addPosition() 
    {
      //Check if position isnt already in list or the selected pos is null
      if (!playerPositions.includes(playerSelectedPos) && playerSelectedPos != null) 
      {
        //Add the position to the player in the store
        addPositionToPlayer([current_team_index,playerId,playerSelectedPos])
      }
  
    }
  
    //Delete the postion
    function deletePosition(chip) 
    {
      //Remove the chip from the player
      removePositionFromPlayer([current_team_index,playerId,chip])
    }
    
    
    return (
  
      
      <View style = {styles.playerBar}>
  
        {/*Text input for player name*/}
        <TextInput 
          style = {styles.playerTextInput}
          placeholder={playerName != '' ? playerName:'Player Name'}
          placeholderTextColor= {playerName != '' ? 'black':"grey"} 
          onEndEditing={(data)=>(updateName([current_team_index,playerId,data.nativeEvent.text]))}
        />
  
        {/*Select postion bar*/}
        <View style ={styles.playerPositionSelector}>
          
          <RNPickerSelect 
            onValueChange={(value) => { updateSelectedPos([current_team_index,playerId,value])}}
            placeholder={{ label: 'Add positions', value: null }}
            style = {pickerSelectStyles}
            items = {positionSelectionData}
           
            useNativeAndroidPickerStyle={false}
          />
  
        </View>
        
        {/*Add position chip button*/}
        <Pressable 
          style = {{marginHorizontal:10}}
          onPress = {() =>addPosition()}>
            <Icon 
              name='plus' 
              size = {30} 
              color = '#0BD61F'
            />
        </Pressable>
        
        {/*Displays all the position chips in a grid format*/}
        <View style = {styles.playerPositionChips}>
          <FlatList
          
            data={playerPositions}
            renderItem={renderPositionChips}
            horizontal
            keyExtractor={item => playerPositions.indexOf(item)}
          />  
        </View>
        
        {/*Delete player button*/}
        <Pressable 
          onPress={deletePlayer} 
          style = {styles.playerDelete}>
            <Text style = {{fontSize:30}}>🗑️</Text>
        </Pressable>
      </View>
    );
  }

  const styles = StyleSheet.create({


    playerBar : {
      backgroundColor: '#ebebeb',
      width: '98%',
      height: 50,
      marginLeft: '1%',
      flexDirection: 'row',
      borderRadius: 4,
      borderColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8
    },
    positions: {
      
      backgroundColor:'white'
    },
    playerTextInput : {
      fontSize: 20,
      marginRight: 3,
      marginLeft: 3,
      borderRadius: 4,
      borderColor: 'grey',
      backgroundColor: 'white',
      height: '90%',
      flex: 1,
    },
    playerPositionSelector : {
      flex: 1,  
      height: '90%'
    },
    playerAddPostions : {
      marginLeft: 20,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center'
    }
  
    ,
    playerPositionChips : {
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      flex: 1.5
    },
    playerDelete : {
      padding: 4,
      paddingLeft: 8
    },
    
    
  });
  
  
  const pickerSelectStyles = StyleSheet.create({
   
    inputAndroid: {
      fontSize: 16,
      color: 'black',
      fontSize: 20,
      backgroundColor: 'white',
      height: '100%',
      borderRadius: 4
    },
    inputIOS: {
      fontSize: 16,
      color: 'black',
      fontSize: 20,
      backgroundColor: 'white',
      height: '100%',
      borderRadius: 4
    
  
    
  },
    placeholder: {
      color: 'grey'
    }
  });

  export default (PlayerTab)