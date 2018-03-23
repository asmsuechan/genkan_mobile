import store from 'react-native-simple-store';

const usernameStorageKey = '@GenkanMobile:username'

export function getUsername () {
  return store.get(usernameStorageKey)
}

export function setUsername (username) {
  return store.save(usernameStorageKey, {
  	username: username
  })
}
export default {
  getUsername,
  setUsername
}
