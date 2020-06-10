import * as React from 'react';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Loader,
  ShineOverlay
} from 'rn-placeholder'

import { Platform, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'

import { createDbInstance } from './db'

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

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

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export default function App() {
  const db = createDbInstance()


  // start a new react native JS process
  const thread = new Thread('./worker.thread.js');

  const [users, setUsers] = React.useState([]);

  async function onClick() {
    console.warn('DBBB:', JSON.stringify(db.collections, getCircularReplacer()))
    const orderItemsCollection = db.collections.get('order_item')
  
    console.log('orderItemsCollection', orderItemsCollection)

    try {
      await db.action(async () => {
        const newOrderItem = await orderItemsCollection.create(oi => {
          oi.name = 'New post' + new Date().getTime()
          oi.barCode = 1232
          oi.quantity = Math.random() * 1000
        })
        console.warn('newOrderItem', newOrderItem)
      })
    } catch (error) {
      console.log('orderItemsCollection', error)
    }

    const allItems = await orderItemsCollection.query().fetch()
    console.log('onClick', allItems)
    setUsers(allItems)

    thread.postMessage(JSON.stringify({type: 'ADD_EMP', name: 'Valera ' + new Date().toLocaleDateString()}));
    thread.onmessage = (message) => console.log(message);
  }

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
      {/* <Placeholder
        Animation={ShineOverlay}
        Left={PlaceholderMedia}
        Right={PlaceholderMedia}
      >
        <PlaceholderLine width={180} />
        <PlaceholderLine />
        <PlaceholderLine width={180} />
      </Placeholder> */}

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
