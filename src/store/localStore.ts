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
  saveTheme: (theme: 'light' | 'dark') => {
    localStorage.setItem('theme', JSON.stringify({ theme }))
  },
  getTheme: () => {
    const theme = localStorage.getItem('theme')
    if (theme) return JSON.parse(theme)
    return null
  },
}

export default localStore
