import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl, FlatList } from 'react-native';

export default function App() {
 

  const [Items, setItems] = useState([
    {name: 'Item 1' },
    {name: 'Item 2' },
    {name: 'Item 3' },
    {name: 'Item 4' },
    {name: 'Item 5' },
    {name: 'Item 6' },
    {name: 'Item 7' },
    {name: 'Item 8' },
    {name: 'Item 9' },
    {name: 'Item 27' },
    {name: 'Item 78' },
  ]);

  const [Refreshing, setRefreshing] = useState(false);
  const [currentKey, setCurrentKey] = useState(12)

  const onRefresh = () => {
    setRefreshing(true);
    setItems([...Items, {name: `Item ${currentKey}`}]);
    setCurrentKey(currentKey + 1);
    setRefreshing(false);
  }

  return (
      <FlatList
      //Gets data to use for rendering
      data ={Items}
      //Render each item using data
      renderItem = {({item}) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item.name}</Text>
        </View>
      )}

      //Give each item a key
      keyExtractor = {(item,index) => index.toString()}

      //Refreshing
      refreshing={Refreshing}
      onRefresh = {onRefresh}

      />
      // <ScrollView
      //   style={styles.body}
      //   refreshControl={
      //     <RefreshControl
      //       refreshing={Refreshing}
      //       onRefresh={onRefresh}
      //       colors={['#ff00ff']}
      //     />
      //   }
      // >
      //   {
      //     Items.map((object) => {
      //       return (
      //         <View style={styles.item} key={object.key}>
      //           <Text style={styles.text}>{object.item}</Text>
      //         </View>
      //       )
      //     })
      //   }
      // </ScrollView>
   

    
    
  );
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
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
    fontSize: 45,
    fontStyle: 'italic',
    margin: 10,
  },
  
});
