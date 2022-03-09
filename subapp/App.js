import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl } from 'react-native';

export default function App() {
 

  const [Items, setItems] = useState([
    { key: 1, item: 'Item 1' },
    { key: 2, item: 'Item 2' },
    { key: 3, item: 'Item 3' },
    { key: 4, item: 'Item 4' },
    { key: 5, item: 'Item 5' },
    { key: 6, item: 'Item 6' },
    { key: 7, item: 'Item 7' },
    { key: 8, item: 'Item 8' },
    { key: 9, item: 'Item 9' },
    { key: 10, item: 'Item 27' },
    { key: 11, item: 'Item 78' },
  ]);

  const [Refreshing, setRefreshing] = useState(false);
  const [currentKey, setCurrentKey] = useState(12)

  const onRefresh = () => {
    setRefreshing(true);
    setItems([...Items, { key: currentKey, item: `Item ${currentKey}`}]);
    setCurrentKey(currentKey + 1);
    setRefreshing(false);
  }

  return (
    
      <ScrollView
        style={styles.body}
        refreshControl={
          <RefreshControl
            refreshing={Refreshing}
            onRefresh={onRefresh}
            colors={['#ff00ff']}
          />
        }
      >
        {
          Items.map((object) => {
            return (
              <View style={styles.item} key={object.key}>
                <Text style={styles.text}>{object.item}</Text>
              </View>
            )
          })
        }
      </ScrollView>
   

    
    
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
