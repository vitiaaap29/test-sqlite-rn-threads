import * as React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

import SQLite from 'react-native-sqlite-storage'

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


  function onClick() {
    console.log('addd')
    db.transaction((tx) => {
      tx.executeSql('INSERT INTO Employees (name, desc) VALUES ("Sylvester Stallone", "sfdsfdsfa");')
    })

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick}>

      <Text style={styles.instructions}>To get started, edit App.js</Text>

      </TouchableOpacity>
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
