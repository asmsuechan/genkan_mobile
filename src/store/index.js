import store from 'react-native-simple-store';

const keynameStorageKey = '@GenkanMobile:keyname'
const keyIconStorageKey = '@GenkanMobile:keiIcon'

export function getKeyname () {
  return store.get(keynameStorageKey)
}

export function setKeyname (keyname) {
  return store.save(keynameStorageKey, {
    keyname: keyname
  })
}

export function getKeyIcon () {
  return store.get(keyIconStorageKey)
}

export function setKeyIcon (keyIcon) {
  return store.save(keyIconStorageKey, {
    keyIcon: keyIcon
  })
}

export default {
  getKeyname,
  setKeyname,
  getKeyIcon,
  setKeyIcon
}
