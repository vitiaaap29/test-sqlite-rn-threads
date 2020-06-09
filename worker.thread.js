import { self } from 'react-native-threads'

self.onmessage = messageStr => {
  let message = {}
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
      break
    default:
      console.warn(message)
      break
  }
}
