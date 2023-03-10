import { RootState } from '../app.store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'
import { setUserDatas } from './session.actions'

export function fetchUserDetails(
  userID: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function fetchUserDetailsThunk(dispatch) {
    const userDetails = await boardsStore.getUserDetails(userID)
    if (userDetails) {
      dispatch(setUserDatas(userDetails))
    }
  }
}

export function addTask(
  userID: string | null,
  boardID: number | null
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function addTaskThunk(dispatch, getState) {
    // const state = getState()
    // const boards = JSON.parse(
    //   JSON.stringify(state.session.boards)
    // ) as BoardType[]
    // if (!userID || !boardID) return
    // const taskBoardIndex = boards.findIndex(
    //   (board: BoardType) => board.id === boardID
    // )
    // const taskColumnIndex = boards[taskBoardIndex].columns.findIndex(
    //   (column) => column.name === task.status
    // )
    // boards[taskBoardIndex].columns[taskColumnIndex].datas.push(task)
    // dispatch(setBoards(boards))
  }
}

export function removeTask(
  userID: string | null,
  boardID: number | null
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function addTaskThunk(dispatch, getState) {
    // if (!userID || !boardID) return
    // const state = getState()
    // const boards = JSON.parse(
    //   JSON.stringify(state.session.boards)
    // ) as BoardType[]
    // const taskBoardIndex = boards.findIndex(
    //   (board: BoardType) => board.id === boardID
    // )
    // const taskColumnIndex = boards[taskBoardIndex].columns.findIndex(
    //   (column) => column.name === task.status
    // )
    // const taskIndex = boards[taskBoardIndex].columns[
    //   taskColumnIndex
    // ].datas.findIndex((localTask) => localTask.title === task.title)
    // boards[taskBoardIndex].columns[taskColumnIndex].datas.splice(taskIndex, 1)
    // dispatch(setBoards(boards))
  }
}
