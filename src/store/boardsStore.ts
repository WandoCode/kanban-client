import boardsJSON from '../__mock__/mockBoards.json'
import { BoardType } from '../features/session/session.reducers'
import db from './firebase'
import { doc, getDoc, runTransaction, updateDoc } from 'firebase/firestore'

export const boardsStore = {
  getUserBoards: async (userID: string): Promise<BoardType[] | undefined> => {
    try {
      const docRef = doc(db, 'boards', userID)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data().boards
      } else {
        console.error("The document doesn't exist")
      }
    } catch (error) {
      console.error(
        'Error loading boards for the given user from Firestore: ',
        error
      )
    }
    return undefined
  },
  addTask: async (userID: string, newBoards: BoardType[]) => {
    try {
      const docRef = doc(db, 'boards', userID)
      updateDoc(docRef, { boards: newBoards })
    } catch (error) {
      console.error(error)
    }
  },
  initMockDatas: async () => {
    try {
      await runTransaction(db, async (transaction) => {
        const docRef = doc(db, 'boards', 'userA')

        const boardsSnap = await transaction.get(docRef)
        if (!boardsSnap.exists()) {
          await transaction.set(doc(db, 'boards', 'userA'), boardsJSON)
        }
      })
    } catch (error) {
      console.error('Error adding mocked boards datas: ', error)
    }
    return undefined
  },
}
