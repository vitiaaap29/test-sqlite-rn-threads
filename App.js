import * as React from 'react';
import { Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Loader,
  ShineOverlay,
  Fade } from 'rn-placeholder'
import { Platform, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

import SQLite from 'react-native-sqlite-storage'
import { Thread } from 'react-native-threads'

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    backgroundColor: 'green',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    color: 'red'
  },
  title: {
    fontSize: 16,
    width: '100%',
  },
});

function Item({name, id}) {
  return (
    <View style={styles2.item}>
      <Text style={styles2.title}>{id + '   ' + name}</Text>
    </View>
  );
}

export default function App() {
  const db = SQLite.openDatabase({
    name: 'TestDB.db',
    location: 'default',
    createFromLocation: '~www/test-v.db',
  }, (s) => {
    console.log('ddd', s)
  }, (er) => {
    console.warn('ddd ----',er)
  })
  db.executeSql('PRAGMA journal_mode=WAL;')

  // start a new react native JS process
  const thread = new Thread('./worker.thread.js');

  const [users, setUsers] = React.useState([]);

  function onClick() {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Employee', [], (txx, results) => {
        const usersList = []
        const len = results.rows.length
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          usersList.push(row)
        }
        setUsers(usersList)
      }, err => {
        console.log('eee', err)
      })
    })

    thread.postMessage(JSON.stringify({type: 'ADD_EMP', name: 'Valera ' + new Date().toLocaleDateString()}));
    thread.onmessage = (message) => console.log(message);
  }

  // console.log('USERS => ', JSON.stringify(users))
  console.disableYellowBox = true

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick}>

      <Text style={styles.instructions}>To get started, edit App.js Count {users.length}</Text>

      </TouchableOpacity>
      <Placeholder Animation={Loader} />

        <FlatList data={users}
          renderItem={({item}) => <Item name={item.name} id={item.id}/>}
          keyExtractor={item => item.id}
        />
      <Placeholder
        Animation={ShineOverlay}
        Left={PlaceholderMedia}
        Right={PlaceholderMedia}
      >
        <PlaceholderLine width={180} />
        <PlaceholderLine />
        <PlaceholderLine width={180} />
      </Placeholder>

      <Text style={styles.instructions}>{instructions}</Text>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
