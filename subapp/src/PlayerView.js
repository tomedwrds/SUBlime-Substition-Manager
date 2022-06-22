// In App.js in a new project




import React, { useEffect, useState } from 'react';
import { Chip } from 'react-native-paper';
import { View, Pressable, TextInput, Button,StyleSheet, SafeAreaView, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import {add,create_player,add_position, remove_position, remove_player, update_name} from './actions.js';



const PlayerTab = (props) => {
  //Redux vars
  const addPositionToPlayer = position_and_index => props.dispatch(add_position(position_and_index))
  const removePositionFromPlayer = position_and_index => props.dispatch(remove_position(position_and_index))
  const removePlayer = player_index => props.dispatch(remove_player(player_index))
  const updateName = index_and_name => props.dispatch(update_name(index_and_name))
  
  //Function that deletes players from the list
  const deletePlayer = () => {
    //Create alert to show to player
    Alert.alert(
      "Do you wish to delete this player?",
      '',
      [
        //Array of selectable buttons
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Confirm", 
          onPress: () => removePlayer(props.id)
         
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
  
  //Intalize var that holds current selected position
  const[selectedPos, setSelectedPos] = useState(null);
  

  function deletePosition(chip) 
  {
    //Remove the chip from the player
    removePositionFromPlayer([props.id,chip])
  }
  
  
  function addPosition() {
    
    if (!props.pos.includes(selectedPos) && selectedPos != null) 
    {
      //Update the main list
      addPositionToPlayer([props.id,selectedPos])
    }

  }
  

  
  
  
  
  return (

    
    <View style = {styles.playerBar}>

      {/*Text input for player name*/}
      <TextInput 
        style = {styles.playerTextInput}
        placeholder={props.name != '' ? props.name:'Player Name'}
        placeholderTextColor="grey"
        onEndEditing={(k)=>(updateName([props.id,k.nativeEvent.text]))}
      />

      {/*Select postion bar*/}
      <View style ={styles.playerPositionSelector}>
        
        <RNPickerSelect 
          onValueChange={(value) => {console.log(value); setSelectedPos(value)}}
          placeholder={{ label: 'Add positions', value: null }}
          style = {pickerSelectStyles}
          items = {props.positionData}
         
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
        
          data={props.pos}
          renderItem={renderPositionChips}
          horizontal
          keyExtractor={item => props.pos.indexOf(item)}
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
  const playersList = useSelector(state => state.numberReducer);
  

  const positionSelectionData = []
  for(let i = 0; i < playersList.position_data.length; i++)
  {
    let formattedData = {label: playersList.position_data[i].position_name, value: playersList.position_data[i].position_inititals}

    //Check if element of same name already exists to allow it to be removed
    if(!positionSelectionData.some(formattedData => formattedData.label == playersList.position_data[i].position_name ))
    {
      
      positionSelectionData.push(formattedData)
    }

  }
  
   

  //Indexing vars
  const [newPlayerId, setNewPlayerId] = useState(0);
  

  function addPosition() {
    //Add new player object to player data then increment id counter
    //The color code generates a random color
    createPlayer({
      id: newPlayerId,
      name: '',
      positions: [],
      color: '#' + Math.floor(Math.random()*16777215).toString(16)
    })
    setNewPlayerId(newPlayerId + 1)
    
  }
  

  const renderItem = ({ item }) => {
    return(
      
    <PlayerTab 
      id = {item.id}
      pos = {item.positions}
      ds = {playersList.player_data}
      dispatch = {dispatch}
      name = {item.name}
      positionData = {positionSelectionData}
    >
    </PlayerTab>
    )
  }
  
  

  return(
   <SafeAreaView style={styles.body}>
     <View style={{flexDirection:'row'}}>
      <Pressable 
        style = {styles.positions}
        onPress = {addPosition}
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
        data={playersList.player_data}
        renderItem={renderItem}
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