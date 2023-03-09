import boardsJSON from '../__mock__/mockBoards.json'
import { BoardType, TaskType } from '../features/session/session.reducers'
import db from './firebase'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  runTransaction,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

export const boardsStore = {
  getUserBoards: async (userID: string): Promise<BoardType[] | undefined> => {
    try {
      const docRef = doc(db, 'boards', userID)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data().boards
      } else {
        console.log('No such document!')
      }
    } catch (error) {
      console.error(
        'Error loading boards for the given user from Firestore: ',
        error
      )
    }
    return undefined
  },
  addTask: async (userID: string, boardID: number, taskDatas: TaskType) => {
    try {
      await runTransaction(db, async (transaction) => {
        const docRef = doc(db, 'boards', userID)

        const boardsSnap = await transaction.get(docRef)
        if (!boardsSnap.exists()) {
          throw 'Document does not exist!'
        }

        const boards = boardsSnap.data().boards as BoardType[]

        const taskBoardIndex = boards.findIndex(
          (board: BoardType) => board.id === boardID
        )
        const taskColumnIndex = boards[taskBoardIndex].columns.findIndex(
          (column) => column.name === taskDatas.status
        )

        boards[taskBoardIndex].columns[taskColumnIndex].datas?.push(taskDatas)

        transaction.update(docRef, { boards })
      })
    } catch (error) {
      console.error(error)
    }
  },
  initMockDatas: async () => {
    try {
      await setDoc(doc(db, 'boards', 'userA'), boardsJSON)
    } catch (error) {
      console.error('Error adding mocked boards datas: ', error)
    }
    return undefined
  },
}
