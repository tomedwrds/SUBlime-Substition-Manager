// In App.js in a new project



import React from 'react';


import PlayerView from './src/PlayerView';
import PlayerSlider from './src/Sliders.js';
import InGame from './src/in_game/InGame';
import { Provider } from 'react-redux';
import { store } from './src/store.js';



import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';






const AppWrapper = () => {


  return (
    <Provider store={store}>
      <App /> 
    </Provider>
  )
}
const Stack = createNativeStackNavigator()

const App = () => {
  
  
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name= 'Selection' component={PlayerView}/>
        <Stack.Screen name= 'Sliders' component={PlayerSlider}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}




export default AppWrapper

