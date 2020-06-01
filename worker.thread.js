import { self } from 'react-native-threads'
import SQLite from 'react-native-sqlite-storage'

let db = null

function getUniqDbInst() {

  if(!db) {
    db = SQLite.openDatabase({
      name: 'TestDB.db',
      location: 'default',
      createFromLocation: '~www/test-v.db',
    }, (s) => {
      console.log('BACKGROUND THREAD CONNECT SUCESS', s)
    }, (er) => {
      console.warn('BACKGROUND THREAD EROORORO----',er)
    })
    db.executeSql('PRAGMA journal_mode=WAL;')
  }

  return db
}

self.onmessage = messageStr => {
  let message = {}
  // JSON.parse fails sometimes without a reason
  try {
    message = JSON.parse(messageStr)
  } catch (error) {
    if (!message.type) {
      throw error
    }
  }
  console.log('BACKGROUND THREAD', 'Message Type => ', message.type, 'All message => ', messageStr)
  switch (message.type) {
    case 'ADD_EMP':
      console.warn('BACKGROUND THREAD', message.type, 'PROCESSING')
      const dbI = getUniqDbInst()
      dbI.transaction((tx) => {
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN Rd ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN R ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
        tx.executeSql(`INSERT INTO Employee (name, desc) VALUES ("IVAN Rddd------ ${new Date().toLocaleDateString()}", "sfdsfdsfa");`)
      })
      break
    default:
      console.warn(message)
      break
  }
}
