const localStore = {
  saveUser: (userId: string, isDemoUser = true) => {
    const user = {
      userId,
      isDemoUser,
    }
    localStorage.setItem('sessionUser', JSON.stringify(user))
  },
  getUser: () => {
    const user = localStorage.getItem('sessionUser')
    if (user) return JSON.parse(user)
    return null
  },
  removeUser: () => {
    localStorage.removeItem('sessionUser')
  },
}

export default localStore
