import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from './firebase'
import { getAuth, signOut } from 'firebase/auth'

const authStore = {
  createNewUser: async (email: string, password: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredentials.user
      return user
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
      return user
    } catch (error) {
      console.error('An error happend when loggin in the user: ', error)
    }
  },
  logOutUser: async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
    } catch (error) {
      console.error('An error happend when loggout the user: ', error)
    }
  },

  initMockUser: async (email: string, password: string) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredentials.user
      return user
    } catch (error) {
      console.error('An error happend when creating the user: ', error)
    }
  },
}

export default authStore
