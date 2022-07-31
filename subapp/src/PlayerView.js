// In App.js in a new project




import React, { useEffect, useState, useRef} from 'react';
import { Chip } from 'react-native-paper';
import { View, Pressable, TextInput, Button,StyleSheet, Alert, FlatList,Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import RNPickerSelect from 'react-native-picker-select';

import { useSelector, useDispatch } from 'react-redux'
import {add,create_player,add_position, remove_position, remove_player, update_name, update_selected_pos, increment_player_index,update_player_positions_open} from './actions.js';
import getPositionInitals from './player_selection/get_position_initals.js';
import generateSchedule from './schedule auto generation/generateSchedule.js';





function PlayerView({navigation }) {
  
  //Setupredux vars
  const dispatch = useDispatch()
  const createPlayer = player_data => dispatch(create_player(player_data))
  const playerState = useSelector(state => state.playerReducer);
  const positionState = useSelector(state => state.positionsReducer);
  const teamState = useSelector(state => state.teamReducer);
  const generalState = useSelector(state => state.generalReducer);
  const addPositionToPlayer = position_and_index => dispatch(add_position(position_and_index))
  const removePositionFromPlayer = position_and_index => dispatch(remove_position(position_and_index))
  const removePlayer = player_index => dispatch(remove_player(player_index))
  const updateName = index_and_name => dispatch(update_name(index_and_name))
  const updateSelectedPos = index_pos => dispatch(update_selected_pos(index_pos))
  const updatePlayerPositionsOpen = data => dispatch(update_player_positions_open(data))
  //This is the id of the current team in use
  const team_id = useSelector(state => state.generalReducer).current_team_index
  //This is the adjusted index to account for deletion of players
  const adjusted_team_index = teamState.team_data.findIndex(item => item.team_id == team_id)
 
  const current_player_index = teamState.team_data[adjusted_team_index].team_player_data.team_player_index
 
  const [canAddPlayer,setCanAddPlayer] = useState(false)
  

  //Get the position selection data depdent on what sport
  const sport = teamState.team_data[adjusted_team_index].team_sport
 
  let positionSelectionData = []
  switch(sport)
  {
    case '11H':
       positionSelectionData = [
     
        {label: 'Left Foward', value:'LF'},
        {label: 'Center Foward', value:'CF'},
        {label: 'Right Foward', value:'RF'},
        {label: 'Left Inner', value:'LI'},
        {label: 'Right Inner', value:'RI'},
        {label: 'Left Half', value:'LH'},
        {label: 'Center Half', value:'CH'},
        {label: 'Right Half', value:'RH'},
        {label: 'Left Back', value:'LB'},
        {label: 'Center Back', value:'CB'},
        {label: 'Right Back', value:'RB'},
        {label: 'Goal Keeper', value:'GK'}]
        break;
    case '7H':
      positionSelectionData = [
        {label: 'Striker', value:'ST'},
        {label: 'Left Foward', value:'LF'},
        {label: 'Center Foward', value:'CF'},
        {label: 'Right Foward', value:'RF'},
        
        {label: 'Midfield', value:'MF'},
        {label: 'Left Half', value:'LH'},
        {label: 'Right Half', value:'RH'},
        {label: 'Defender', value:'DF'},
        {label: 'Left Back', value:'LB'},
        {label: 'Center Back', value:'CB'},
        {label: 'Right Back', value:'RB'},
        {label: 'Goal Keeper', value:'GK'}]
        break;
    case 'T':
      positionSelectionData = [
        {label: 'Left Back', value: 'LB'}
      ]
      break;
    default:
      break;


  }

  const PlayerTab = ({item}) => {
  

 
    //Fetch the vars relavent to the player
    const playerId = item.id;
    const playerName = item.name;
    const playerPositions = item.positions;
    const playerSelectedPos = item.selectedPos;
    const playerOpen = item.open;
    //const [values,setValues] = useState(false)
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
            onPress: () => removePlayer([team_id,playerId])
           
          }
        ]
      )
    }
  
  
    //Render a position chip for each position in the list
    const renderPositionChips = ({ item }) => {
      console.log(item)
      return(

      <Chip 
        
        onPress = {() => {deletePosition(item)}} 
        onClose = {() => {}} >
          {item}
  
      </Chip>
      )
      
      };
    
  
    //Add a position to a player
    function addPosition(k) 
    {
      let data = []
      for(let i =0; i < k.length; i++)
      {
        data.push(k[i].value)
      }
      addPositionToPlayer([team_id,playerId,data])
  
    }
  
    //Delete the postion
    function deletePosition(chip) 
    {
      //Remove the chip from the player
      removePositionFromPlayer([team_id,playerId,chip])
    }
    
    
    return (
  
      
      <View style = {styles.playerBar}>
  
        {/*Text input for player name*/}
        <TextInput 
          style = {styles.playerTextInput}
          placeholder={playerName != '' ? playerName:'Player Name'}
          placeholderTextColor= {playerName != '' ? 'black':"grey"} 
          onEndEditing={(data)=>(updateName([team_id,playerId,data.nativeEvent.text]))}
        />
  
        {/*Select postion bar*/}
        <View style ={styles.playerPositionSelector}>
          
        <DropDownPicker
            items = {positionSelectionData}
            open={playerOpen}
            multiple={true}
            value = {playerPositions}
            max={20}
            placeholder='Select Positions'
            dropDownContainerStyle={{borderColor:'white'}}
            style = {{borderColor:'white',borderRadius:4}}
            setValue = {()=>{}}
            onSelectItem ={(item) => {addPosition(item)}}
            text
            textStyle={{fontSize:16}}
            placeholderStyle={{color:'grey'}}
            listMode={'MODAL'}
            modalContentContainerStyle={{margin:40,backgroundColor:'transparent'}}
            theme = {'LIGHT'}
            modalTitle='Select Positions'
            
            renderBadgeItem={(props) => <Chip style = {styles.positions} >{props.value}</Chip>}
            setOpen={()=>updatePlayerPositionsOpen([team_id,playerId])}
            dropDownStyle={{
              height: 500 // Or     minHeight: 500
          }}
          //extendableBadgeContainer={true}
          dropDownMaxHeight={500} // As     maxHeight: 500
         

          />
          {/* <RNPickerSelect 
            onValueChange={(value) => { updateSelectedPos([team_id,playerId,value])}}
            placeholder={{ label: 'Add positions', value: null }}
            style = {pickerSelectStyles}
            items = {positionSelectionData}
           
            useNativeAndroidPickerStyle={false}
          /> */}
  
        </View>
        
        {/*Add position chip button*/}
        <Pressable 
          style = {{marginHorizontal:10}}
          onPress = {() =>addPosition()}>
          
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

  
  

  useEffect(() => {
    
       // Your useEffect code here to be run on update
    if(canAddPlayer)

   { createPlayer([team_id,{
      id: current_player_index,
      name: '',
      positions: [],
      color: '#' + Math.floor(Math.random()*16777215).toString(16),
      selectedPos: null,
      intervalWidth: 0,
      open:false
    }])
    
    setCanAddPlayer(false)
  }
  
  },[canAddPlayer]);

  function addPlayer() {
    //Add new player object to player data then increment id counter
    //The color code generates a random color
   
    
    setCanAddPlayer(true)
    
  }
  

  
  

  return(
   <SafeAreaView style = {{marginHorizontal:20,flex:1}}>
     <View style={{flexDirection:'row'}}>
      <Text style = {{fontSize:40}}>Team Overview</Text>
      <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
        <Pressable 
       
          onPress = {addPlayer}
          >
            <Icon 
              name='plus' 
              size = {50} 
              color = '#0BD61F'
            />
        </Pressable>
       
      </View>
     </View>
    

    <View style = {{flex:1}}>
      <FlatList
     
        data={teamState.team_data[adjusted_team_index].team_player_data.team_players}
        renderItem={(item) => PlayerTab(item)}
        keyExtractor={item => item.id}
        style = {{flex:1}}
        contentContainerStyle={{paddingBottom:30,flexGrow:1}}
        ListEmptyComponent={()=><View style = {{justifyContent:'center',alignItems:'center',flex:1}}><Text style = {{fontSize:20}}>No players added yet press the '➕' to add players </Text></View>}
   
      />
      </View>
      
    
  </SafeAreaView>
    
    
    
  );
}

const styles = StyleSheet.create({
  body: {
    
    flex: 1,
    flexDirection: 'column',
    
  },
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
    
    backgroundColor:'white',
    borderColor:'black',
    borderWidth:1
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
export default (PlayerView);