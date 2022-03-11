import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl, FlatList, SectionList, TextInput, Pressable, Alert } from 'react-native';

import Operator from './Operator';

export default function App() {
 
  const [num1, setNum1] = useState(undefined);
  const [num2, setNum2] = useState(undefined);
  const [summed, setSummed] = useState(false);
  const [total, setTotal] = useState(0);

  const onPressHandle = (isAdd) => {
    if (!isNaN(num1) && !isNaN(num2))
    {
      
      setSummed(!summed);
      if (isAdd)
      {
        setTotal(num1 + num2);
      }
      else
      {
        setTotal(num1 - num2);

      }
    }
      
    else
    {
      Alert.alert('Warning', 'Please enter valid numbers', [{text: 'Ok'}])

    }
  }

  return (
    
    <View style ={styles.body}>
      <Text style = {styles.text}>Please write your name</Text>
      <TextInput 
        style= {styles.input}
        placeholder = "Number 1"
        onChangeText={(k) =>setNum1(parseInt(k))}
        />
      <TextInput 
        style= {styles.input}
        placeholder = "Number 2"
        onChangeText={(k) =>setNum2(parseInt(k))}
        />

    <Operator 
      
      onPressFunction = {() => onPressHandle(true)}
      text = 'Add'
      style = {[styles.text, styles.item, {padding: 10, margin: 0}]}

    
    ></Operator>  
    <Operator 
      
      onPressFunction = {() => onPressHandle(false)}
      text = 'Minus'
      style = {[styles.text, styles.item, {padding: 10, margin: 0}]}

    
    ></Operator>
    
      <Text style = {styles.text} >{summed ? (total).toString() : null }</Text>
    </View>

    
    
  );
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  item: {
    margin: 10,
    backgroundColor: '#4ae1fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontStyle: 'italic',
    margin: 30,
  },
  input: {
    borderWidth: 1,
    width: 300,
    borderRadius: 5,
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
  }
  
});
