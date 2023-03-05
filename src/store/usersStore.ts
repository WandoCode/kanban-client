import usersJSON from '../__mock__/mockUsers.json'

const usersStore = {
  getUser: async (userID: number) => {
    const users = await usersJSON.usersDatas

    return users.find((user) => user.userID === userID)
  },
}

export default usersStore
