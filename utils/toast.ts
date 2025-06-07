import Toast, {ToastType} from 'react-native-toast-message';

export const errorToast = (message: string, title: string|null = null) => {
  return toast('error', message, title)
}

export const successToast = (message: string, title: string|null = null) => {
  return toast('success', message, title)
}

const toast = (type: ToastType, message: string, title: string|null = null) => {
  return Toast.show({
    type: type,
    text1: title ?? message,
    text2: title ? message : undefined,
    position: 'bottom',
    onPress() {
      Toast.hide()
    },
  })
}
