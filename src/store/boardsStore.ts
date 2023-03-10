import boardsJSON from '../__mock__/mockUser.json'
import db from './firebase'
import { collection, doc, getDoc, runTransaction } from 'firebase/firestore'
import { Session, BoardShort } from '../features/session/session.reducers'
import { BoardsDatasType, BoardType } from '../features/board/boards.reducer'

export const boardsStore = {
  getUserDetails: async (userID: string): Promise<Session | undefined> => {
    try {
      const detailsRef = doc(db, userID, 'details')
      const detailsSnap = await getDoc(detailsRef)

      if (detailsSnap.exists()) {
        return detailsSnap.data() as Session
      } else {
        console.error('Impossible to find the details for the given user')
      }
    } catch (error) {
      console.error('Impossible to find the details for the given user', error)
    }
    return undefined
  },
  getUserBoards: async (
    userID: string,
    boardsShort: BoardShort[]
  ): Promise<BoardsDatasType | undefined> => {
    let boards: BoardsDatasType = {}
    try {
      for (let i = 0; i < boardsShort.length; i++) {
        const boardShort = boardsShort[i]
        const boardRef = doc(db, userID, boardShort.id)
        const boardSnap = await getDoc(boardRef)

        if (boardSnap.exists()) {
          const board = boardSnap.data() as BoardType
          boards[boardShort.name] = board
        } else {
          console.error(
            'Impossible to find the board for the given user. Board: ',
            boardShort.name
          )
        }
      }

      return boards
    } catch (error) {
      console.error('Impossible to find the boards for the given user', error)
    }
    return undefined
  },
  // updateBoards: async (userID: string, newBoards: BoardType[]) => {
  //   try {
  //     const docRef = doc(db, 'boards', userID)
  //     updateDoc(docRef, { boards: newBoards })
  //   } catch (error) {
  //     console.error(error)
  //   }
  // },
  initMockDatas: async () => {
    try {
      await runTransaction(db, async (transaction) => {
        const detailsRef = doc(db, 'userA', 'details')

        const detailsSnap = await transaction.get(detailsRef)
        if (!detailsSnap.exists()) {
          await transaction.set(
            doc(db, 'userA', 'details'),
            boardsJSON.userA.details
          )

          boardsJSON.userA.details.boardsShort.forEach(async (board) => {
            const boards = boardsJSON.userA as Record<string, any>
            const boardDatas = boards[board.id]
            await transaction.set(doc(db, 'userA', board.name), boardDatas)
          })
        }
      })
    } catch (error) {
      console.error('Error adding mocked boards datas: ', error)
    }
    return undefined
  },
}
