import boardsJSON from '../__mock__/mockUser.json'
import { db } from './firebase'
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { Session, BoardShort } from '../features/session/session.reducers'
import {
  BoardsDatasType,
  BoardType,
  TaskType,
} from '../features/board/boards.reducer'

export const boardsStore = {
  createUserDetails: async (userID: string): Promise<Session | undefined> => {
    try {
      const detailsRef = doc(db, userID, 'details')
      await setDoc(detailsRef, { userID, boardsShort: [] })
    } catch (error) {
      console.error('Impossible to find the details for the given user', error)
    }
    return undefined
  },
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
  updateUserBoardsShort: async (
    userID: string,
    newBoardsShort: BoardShort[]
  ) => {
    try {
      const detailsRef = doc(db, userID, 'details')
      updateDoc(detailsRef, { boardsShort: newBoardsShort })
    } catch (error) {
      console.error(
        'Impossible to update the user details with a new boardsShort array',
        error
      )
    }
    return undefined
  },
  getUserBoards: async (
    userID: string,
    boardsShort: BoardShort[]
  ): Promise<BoardsDatasType | undefined> => {
    let boards: BoardsDatasType = {}
    try {
      const querySnapshot = await getDocs(collection(db, userID))

      querySnapshot.forEach((doc) => {
        if (doc.id !== 'details') {
          boards[doc.id] = doc.data() as BoardType
        }
      })

      return boards
    } catch (error) {
      console.error('Impossible to find the boards for the given user', error)
    }
    return undefined
  },
  updateTasks: async (
    userID: string,
    boardID: string,
    newTasks: TaskType[]
  ) => {
    try {
      const docRef = doc(db, userID, boardID)
      await updateDoc(docRef, { tasks: newTasks })
    } catch (error) {
      console.error(error)
    }
  },
  addBoard: async (userID: string, newBoard: BoardType) => {
    try {
      await setDoc(doc(db, userID, newBoard.id), newBoard)
    } catch (error) {
      console.error(error)
    }
  },
  updateBoard: async (userID: string, newBoard: BoardType) => {
    try {
      const docRef = doc(db, userID, newBoard.id)
      await updateDoc(docRef, { ...newBoard })
    } catch (error) {
      console.error(error)
    }
  },
  deleteBoard: async (userID: string, boardId: string) => {
    try {
      const docRef = doc(db, userID, boardId)
      await deleteDoc(docRef)
    } catch (error) {
      console.error(error)
    }
  },
  initMockDatas: async (userID: string) => {
    try {
      await runTransaction(db, async (transaction) => {
        const detailsRef = doc(db, userID, 'details')

        const detailsSnap = await transaction.get(detailsRef)
        if (!detailsSnap.exists()) {
          boardsJSON.userA.details.userID = userID
          await transaction.set(
            doc(db, userID, 'details'),
            boardsJSON.userA.details
          )

          boardsJSON.userA.details.boardsShort.forEach(async (board) => {
            const boards = boardsJSON.userA as Record<string, any>
            const boardDatas = boards[board.name]
            await transaction.set(doc(db, userID, board.id), boardDatas)
          })
        }
      })
    } catch (error) {
      console.error('Error adding mocked boards datas: ', error)
    }
    return undefined
  },
}
