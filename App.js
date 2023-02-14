import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';
import { Alert, Image } from 'react-native';

import { useState } from 'react';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repo, setRepo] = useState([]);
  const [msg, setMsg] = useState('');

  const getRepo = () => { // ASYNC
    const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=' + keyword;
    setMsg(url);
    console.log("url: " + url);
    fetch(url)
    .then( response => response.json()) // myös ASYNC
    .then( data => setRepo(data.meals) )
    .catch( error => {
      // Lupaus ei täyttynyt
      Alert('Error', error);
    });
  };

  const ItemSeparator = () => {
    return(
    <View
      style={{
        height: 1,
        backgroundColor: 'gray',
      }}
    />);
  };

  return (
    <View style={ styles.container }>
      <View style={ styleTop.container } />
      
      <View style={ styleMiddle.container }>
        <FlatList
          keyExtractor={ item => item.idMeal }
          data={ repo }
          renderItem={ ({ item }) =>
            <View>
              <Text style={ styleMiddle.text }>{ item.strMeal }</Text>
              <Image style={ styleMiddle.logo }
                source={{uri: item.strMealThumb }} />
            </View> }
          ItemSeparatorComponent={ ItemSeparator }
        />
      </View>

      <View style={ styleBottom.container }>
        <TextInput 
          style={{ fontWeight: 'bold', width: 300 }}
          placeholder='keyword'
          onChangeText={ text => setKeyword(text) }
          />
          

        <Button title="Find" onPress={ getRepo }></Button>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// Sopii paremmin iPhonelle.
const styleBottom = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const styleMiddle = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: '#fff',
    //alignItems: 'flex-start',
    //justifyContent: 'flex-start',
    width: '100%',
  },
  logo: {
    width: 50,
    height: 50,
  },
  text: {
    paddingTop: 5,
    fontWeight: '800',
  }
});

// Näyttää muuten hassulta iPhonessa.
const styleTop = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});