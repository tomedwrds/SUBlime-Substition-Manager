import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl, FlatList, SectionList, TextInput, Pressable } from 'react-native';

export default function App() {
 
  const [num1, setNum1] = useState(undefined);
  const [num2, setNum2] = useState(undefined);
  const [summed, setSummed] = useState(false);
  const [total, setTotal] = useState(0);

  const onPressHandler = () => {
    if (!isNaN(num1) && !isNaN(num2))
    {
      setSummed(!summed);
      setTotal(num1 + num2);
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

      <Pressable
        onPress={onPressHandler}
      >
        <Text style={styles.text}>{summed ? 'Clear' : 'Add' }</Text> 
      </Pressable>

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
