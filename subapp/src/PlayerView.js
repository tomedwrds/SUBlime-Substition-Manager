// In App.js in a new project




import React, { useEffect, useState, useRef} from 'react';
import { Chip } from 'react-native-paper';
import { View, Pressable, TextInput, Button,StyleSheet, Alert, FlatList,Text,Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

import { useSelector, useDispatch } from 'react-redux'
import {add,create_player,add_position, remove_position, remove_player, update_name, update_selected_pos, increment_player_index,update_player_positions_open,update_team_tutorial} from './actions.js';
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
  const updateTeamTutorial = data => dispatch(update_team_tutorial(data))
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
          {label: 'Left Back', value:'LB'},
          {label: 'Centre Back', value:'CB'},
          {label: 'Right Back', value:'RB'},
          {label: 'Goal Keeper', value:'GK'}]
          
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
        addPositionToPlayer([team_id,playerId,playerSelectedPos])
      }
  
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
    
        {/* <DropDownPicker
            items = {positionSelectionData}
            open={playerOpen}
            multiple={true}
            max={20}
            placeholder='Select Positions'
            dropDownContainerStyle={{borderColor:'white'}}
            style = {{borderColor:'white',borderRadius:4}}
            
            textStyle={{fontSize:20}}
            placeholderStyle={{color:'grey'}}
            listMode={'MODAL'}
            modalContentContainerStyle={{margin:40,backgroundColor:'transparent'}}
            theme = {'LIGHT'}
            modalTitle='Select Positions'
            scroll
            setOpen={()=>updatePlayerPositionsOpen([team_id,playerId])}
            dropDownStyle={{
              height: 500 // Or     minHeight: 500
          }}
          dropDownMaxHeight={500} // As     maxHeight: 500
         

          /> */}
          
          {/* <RNPickerSelect 
            onValueChange={(value) => {}}
            placeholder={{ label: 'Add positions', value: null }}
            style = {pickerSelectStyles}
            items = {positionSelectionData}
           
            useNativeAndroidPickerStyle={false}
          /> */}
          
       

<SelectDropdown
                        data={positionSelectionData}
                        onSelect={(selectedItem) => {
                          updateSelectedPos([team_id,playerId,selectedItem.value])
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem.label
                        }}
                        rowTextForSelection={(item) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item.label
                        }}
                        defaultButtonText={'Add positions'}
                       buttonStyle = {styles.dropDown}
                       buttonTextStyle={styles.dropDownText}
                       rowTextStyle={styles.dropDownText}
                       dropdownStyle={{borderRadius:9,width:260}}
                    
                       
                    />
  
        </View>
        
        {/*Add position chip button*/}
        <Pressable 
          style = {{marginHorizontal:15}}
          onPress = {() =>addPosition()}>
          <Icon 
              name='plus' 
              size = {40} 
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

  
  

  useEffect(() => {
    
       // Your useEffect code here to be run on update
    if(canAddPlayer)

   { 
    let position = []
    if(sport == 'N') position = ['A','C','D']
    createPlayer([team_id,{
      id: current_player_index,
      name: '',
      positions: position,
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
    <Modal
          animationType="slide"
          transparent={true}
          visible={teamState.team_data[adjusted_team_index].team_tutorial[1]} 
          supportedOrientations={['landscape']}
      >
          <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={{fontSize:32,marginBottom:20}}>Welcome to SUBlime – Team Overview</Text>
                  <Text style = {{textAlign:'center'}}>{'A team would be nothing without its player. On this page you can add players to your team by pressing the ‘+’ button. After that be sure to assign positions to your players.\n '}</Text>
                 
                  <View style = {{flexDirection:'row'}}>
                  <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {updateTeamTutorial([team_id,1])}}
                  >
                  <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                  </View>
              </View>
          </View>
      </Modal>
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
        ListEmptyComponent={()=><View style = {{justifyContent:'center',alignItems:'center',flex:1}}><Text style = {{fontSize:20,textAlign:'center'}}>{'No players exist\n Press the "➕" to create a player'}</Text></View>}
   
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
    paddingLeft:10
  },
  playerPositionSelector : {
    flex: 1,  
    height: '90%',
   
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  
  button: {
    borderRadius: 9,
    padding: 10,
    elevation: 2,
    borderWidth:2,
    marginHorizontal:10,
    backgroundColor:'white'
  },
  dropDown:
  {
    fontSize: 16,
    color: 'black',
    fontSize: 20,
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 4,
    width:'100%'
  },
  dropDownText:{
    fontSize:20,
    color: 'grey',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    textAlign:'left',
    padding:0
  }
  
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