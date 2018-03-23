import store from 'react-native-simple-store';

const keynameStorageKey = '@GenkanMobile:username'

export function getKeyname () {
  return store.get(keynameStorageKey)
}

export function setKeyname (keyname) {
  return store.save(keynameStorageKey, {
    keyname: keyname
  })
}
export default {
  getKeyname,
  setKeyname
}
