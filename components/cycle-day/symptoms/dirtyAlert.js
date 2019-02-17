import { Alert } from 'react-native'

export const dirtyAlert = (dirty, callback) => {
  if (dirty) {
    Alert.alert('You have unsaved data',
      'If you leave now, your data will not be saved',
      [
        {text: 'Leave anyway', onPress: callback},
        {text: 'Stay', style: 'cancel' },
      ],
      {cancelable: false},
    )
  } else {
    callback()
  }
}