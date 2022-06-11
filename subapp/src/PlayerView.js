// In App.js in a new project




import React, { useEffect, useState } from 'react';
import { Chip } from 'react-native-paper';
import { View, Pressable, TextInput, Button,StyleSheet, SafeAreaView, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import {add,create_player,add_position, remove_position, remove_player} from './actions.js';
/*function mapStateToProps(state) {
  return{
    players: state.players
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addPlayer : () => dispatch({type:'ADD PLAYER', payload: { id: newPlayerId, name: null, positionData: null}})
  }
}*/


const PlayerTab = (props) => {
  const dispatch = useDispatch()
  const addPositionToPlayer = position_and_index => dispatch(add_position(position_and_index))
  const removePositionFromPlayer = position_and_index => dispatch(remove_position(position_and_index))
  const removePlayer = player_index => dispatch(remove_player(player_index))
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
          onPress: () => deletePlayer2()
         
        }
      ]
    )
  }

 

 
  
  function deletePlayer2()
  {
    console.log(props)
    removePlayer(props.id)
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
        placeholder='Player Name'
        placeholderTextColor="grey"
      />

      {/*Select postion bar*/}
      <View style ={styles.playerPositionSelector}>
        
        <RNPickerSelect 
          onValueChange={(value) => setSelectedPos(value)}
          placeholder={{ label: 'Add positions', value: null }}
          style = {pickerSelectStyles}
          
          items={[
              { label: 'Left Foward', value: 'LF'},
              { label: 'Center Foward', value: 'CF' },
              { label: 'Right Foward', value: 'RF' },
              { label: 'Left Midfield', value: 'LM' },
              { label: 'Center Midfield', value: 'CM'},
              { label: 'Right Midfield', value: 'RM' },
              { label: 'Left Half', value: 'LH' },
              { label: 'Right Half', value: 'RH'},
              { label: 'Left Back', value: 'LB' },
              { label: 'Right Back', value: 'RB'},
              { label: 'Goal Keeper', value: 'GK' },
          ]}
          useNativeAndroidPickerStyle={false}
        />

      </View>
      
      {/*Add position chip button*/}
      <Pressable 
        style = {styles.positions} 
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
          //itemDimension={70}
          //spacing = {4}
          
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


function PlayerView() {
   

  //const [playersList, setPlayersList] = useState([]);
  const [newPlayerId, setNewPlayerId] = useState(0);
  
  const playersList = useSelector(state => state.numberReducer);
  

  function addPosition() {

    //Create new list with added items
    playersList.push({
      id: newPlayerId,
      name: '',
      positions: ['']
    })

    setNewPlayerId(newPlayerId + 1)
    
    
  }

  const renderItem = ({ item }) => {
    //console.log(item.positions)
    return(
      
    <PlayerTab 
      id = {item.id}
      pos = {item.positions}
      ds = {playersList.player_data}
    >
    </PlayerTab>
    )
  }
  console.log(playersList)
  

  return(
   <SafeAreaView style={styles.body}>
    <Pressable 
        style = {styles.positions}
        >
          <Icon 
            name='plus' 
            size = {30} 
            color = 'green'
          />
      </Pressable>


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