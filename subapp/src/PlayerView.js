// In App.js in a new project




import React, { useEffect, useState } from 'react';
import { Chip } from 'react-native-paper';
import { View, Pressable, TextInput, Button,StyleSheet, SafeAreaView, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import {add,create_player,add_position, remove_position, remove_player, update_name, update_selected_pos} from './actions.js';



const PlayerTab = ({item},positionSelectionData,updateName,addPositionToPlayer,removePositionFromPlayer,removePlayer,updateSelectedPos) => {
  
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
          onPress: () => removePlayer(playerId)
         
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
      addPositionToPlayer([playerId,playerSelectedPos])
    }

  }

  //Delete the postion
  function deletePosition(chip) 
  {
    //Remove the chip from the player
    removePositionFromPlayer([playerId,chip])
  }
  
  
  return (

    
    <View style = {styles.playerBar}>

      {/*Text input for player name*/}
      <TextInput 
        style = {styles.playerTextInput}
        placeholder={playerName != '' ? playerName:'Player Name'}
        placeholderTextColor="grey"
        onEndEditing={(data)=>(updateName([playerId,data.nativeEvent.text]))}
      />

      {/*Select postion bar*/}
      <View style ={styles.playerPositionSelector}>
        
        <RNPickerSelect 
          onValueChange={(value) => { updateSelectedPos([playerId,value])}}
          placeholder={{ label: 'Add positions', value: null }}
          style = {pickerSelectStyles}
          items = {positionSelectionData}
         
          useNativeAndroidPickerStyle={false}
        />

      </View>
      
      {/*Add position chip button*/}
      <Pressable 
        
        onPress = {() =>addPosition()}>
          <Icon 
            name='plus' 
            size = {30} 
            color = 'green'
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
          <Icon 
            name='trash' 
            size = {30} 
            color = '#FF0000'
          />
      </Pressable>
    </View>
  );
}


function PlayerView({navigation }) {
  //Setupredux vars
  const dispatch = useDispatch()
  const createPlayer = player_data => dispatch(create_player(player_data))
  const globalState = useSelector(state => state.numberReducer);
  const addPositionToPlayer = position_and_index => dispatch(add_position(position_and_index))
  const removePositionFromPlayer = position_and_index => dispatch(remove_position(position_and_index))
  const removePlayer = player_index => dispatch(remove_player(player_index))
  const updateName = index_and_name => dispatch(update_name(index_and_name))
  const updateSelectedPos = index_pos => dispatch(update_selected_pos(index_pos))

  

  const positionSelectionData = []
  for(let i = 0; i < globalState.position_data.length; i++)
  {
    let formattedData = {label: globalState.position_data[i].position_name, value: globalState.position_data[i].position_inititals}

    //Check if element of same name already exists to allow it to be removed
    if(!positionSelectionData.some(formattedData => formattedData.label == globalState.position_data[i].position_name ))
    {
      
      positionSelectionData.push(formattedData)
    }

  }
  
   

  //Indexing vars
  const [newPlayerId, setNewPlayerId] = useState(0);
  

  function addPlayer() {
    //Add new player object to player data then increment id counter
    //The color code generates a random color
    createPlayer({
      id: newPlayerId,
      name: '',
      positions: [],
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      selectedPos: null
    })
    setNewPlayerId(newPlayerId + 1)
    
  }
  

  
  

  return(
   <SafeAreaView style={styles.body}>
     <View style={{flexDirection:'row'}}>
      <Pressable 
        style = {styles.positions}
        onPress = {addPlayer}
        >
          <Icon 
            name='plus' 
            size = {30} 
            color = 'green'
          />
      </Pressable>
      <Pressable 
        style = {styles.positions}
        onPress = {()=>navigation.navigate('Sliders')}
        >
          <Icon 
            name='check' 
            size = {30} 
            color = 'green'
          />
      </Pressable>
     </View>
    


      <FlatList
        data={globalState.player_data}
        renderItem={(item) => PlayerTab(item,positionSelectionData,updateName,addPositionToPlayer,removePositionFromPlayer,removePlayer,updateSelectedPos)}
        keyExtractor={item => item.id}
      />
      
    
  </SafeAreaView>
    
    
    
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  playerBar : {
    backgroundColor: 'white',
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
    padding:20
  },
  playerTextInput : {
    fontSize: 20,
    marginRight: 3,
    marginLeft: 3,
    borderRadius: 4,
    borderColor: 'grey',
    backgroundColor: '#ebebeb',
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
    backgroundColor: '#ebebeb',
    height: '100%',
    borderRadius: 4
  },
  inputIOS: {
    fontSize: 16,
    color: 'black',
    fontSize: 20,
    backgroundColor: '#ebebeb',
    height: '100%',
    borderRadius: 4
  

  
},
  placeholder: {
    color: 'grey'
  }
});
export default (PlayerView);