import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from './firebase'

const authStore = {
  createNewUser: async (email: string, password: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredentials.user
      return user.uid
    } catch (error) {
      console.error('An error happend when creating the user: ', error)
    }
  },
  logginUser: async (email: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredentials.user
      return user.uid
    } catch (error) {
      console.error('An error happend when loggin in the user: ', error)
    }
  },
}

export default authStore
