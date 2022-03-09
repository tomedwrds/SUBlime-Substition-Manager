import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Linking, ScrollView, RefreshControl, FlatList, SectionList } from 'react-native';

export default function App() {
 

  const [Items, setItems] = useState([
    {title: 'Item 1', data: ['Item 1-1', 'Item 1-2'], },
 

  ]);

  const [Refreshing, setRefreshing] = useState(false);
  const [currentKey, setCurrentKey] = useState(2)

  const onRefresh = () => {
    setRefreshing(true);
    setItems([...Items, {title: `Item ${currentKey}`, data: [`Item ${currentKey}-1`, `Item ${currentKey}-2`]}]);
    setCurrentKey(currentKey + 1);
    setRefreshing(false);
  }

  return (
      <SectionList
        //Gets data to use for rendering
        sections ={Items}
        //Render each item using data
        renderItem = {({item}) => (
          
            <Text style={styles.text}>{item}</Text>
          
        )}

        renderSectionHeader = {({section})=>(
        <View style={styles.item}>
          <Text style={styles.text}>{section.title}</Text>
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
