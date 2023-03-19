import { User } from 'firebase/auth'

const localStore = {
  saveUser: (user: User) => {
    localStorage.setItem('sessionUser', JSON.stringify(user))
  },
  getUser: () => {
    const userStr = localStorage.getItem('sessionUser')
    if (userStr) return JSON.parse(userStr)
    return null
  },
  removeUser: () => {
    localStorage.removeItem('sessionUser')
  },
}

export default localStore
