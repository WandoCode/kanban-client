import boardsJSON from '../__mock__/mockBoards.json'
import { BoardType } from '../features/session/session.reducers'
import axios from 'axios'

export const boardsStore = {
  getUserBoards: async (userID: number): Promise<BoardType[] | undefined> => {
    try {
      const rep = await axios.get('http://localhost:3000/boards')

      if (rep.data.userID === userID) return boardsJSON.boards.boards
      else throw new Error('The given userid does not match any mocked boards')
    } catch (error) {
      console.error('Error loading moched boards datas: ', error)
    }
    return undefined
  },
}
