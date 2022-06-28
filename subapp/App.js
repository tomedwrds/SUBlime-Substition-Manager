// In App.js in a new project



import React from 'react';

import { Text } from 'react-native-paper';
import PlayerView from './src/PlayerView';
import PlayerSlider from './src/Sliders.js';

import { Provider } from 'react-redux';
import { store,persistor } from './src/store.js';

import FormationSelection from './src/FormationSelection';
import InGame from './src/in_game/InGame';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import HomeScreen from './src/HomeScreen';
import LoadSave from './src/LoadSave';




const AppWrapper = () => {

 
  return (
    <Provider store={store}>
      <PersistGate loading = {null} persistor = {persistor}>
        <App /> 
        </PersistGate>
    </Provider>
  )
}
const Stack = createNativeStackNavigator()

const App = () => {
  
  
  return(
    
    //<InGame></InGame>
    <NavigationContainer>
      <Stack.Navigator
      
      >
        <Stack.Screen name= 'HomeScreen' component={HomeScreen} options={({ navigation, route }) => ({
          headerTitle: props => <Text>asfsg</Text>,
        })}/>
        <Stack.Screen name= 'LoadSave' component={LoadSave}/>
        <Stack.Screen name= 'Formation' component={FormationSelection}/>
        <Stack.Screen name= 'Selection' component={PlayerView}/>
        <Stack.Screen name= 'Sliders' component={PlayerSlider}/>
        <Stack.Screen name= 'Game' component={InGame}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}




export default AppWrapper

