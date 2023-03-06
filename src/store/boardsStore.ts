import boardA from '../__mock__/mockBoardA.json'
import boardB from '../__mock__/mockBoardB.json'
import { BoardRawDatas } from '../features/board/board.reducers'

export const boardsStore = {
  getBoard: async (boardId: number): Promise<BoardRawDatas | undefined> => {
    if (boardId === boardA.uniqid) return boardA
    if (boardId === boardB.uniqid) return boardB
    return undefined
  },
}
