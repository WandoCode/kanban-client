import usersJSON from '../__mock__/mockUsers.json'

const usersStore = {
  getUserDatas: async (userID: number) => {
    const users = await usersJSON.users

    return users.find((user) => user.userID === userID)
  },
}

export default usersStore
