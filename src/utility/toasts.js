import { Notyf } from 'notyf'
import 'notyf/notyf.min.css'

const noty = new Notyf({
  duration: 3000,
  ripple: true,
  position: {
    x: 'right',
    y: 'top'
  },
  dismissible: true,
  types: [
    {
      type: 'warning',
      background: 'orange',
      icon: {
        className: 'notyf__icon--error'
      }
    }
  ]
})

export default {
  success (message = 'Success!', options) {
    const config = {
      type: 'success',
      message,
      ...options
    }
    return noty.open(config)
  },
  warning (message = 'Warning!', options) {
    const config = {
      type: 'warning',
      message,
      ...options
    }
    return noty.open(config)
  },
  error (message = 'Error', options) {
    const config = {
      type: 'error',
      message,
      ...options
    }
    return noty.open(config)
  }
}
