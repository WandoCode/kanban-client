const localStore = {
  saveUser: (userId: string) => {
    localStorage.setItem('sessionUser', JSON.stringify(userId))
  },
  getUser: () => {
    const userId = localStorage.getItem('sessionUser')
    if (userId) return JSON.parse(userId)
    return null
  },
  removeUser: () => {
    localStorage.removeItem('sessionUser')
  },
}

export default localStore
