import usersStore from '../../store/usersStore'
import { setUserDatas, setBoards } from './session.actions'
import { RootState } from '../app.store'
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'
import { TaskType, BoardType } from './session.reducers'

export function fetchUserById(
  userID: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function fetchUserByIdThunk(dispatch) {
    const boardsDatas = await boardsStore.getUserBoards(userID)

    if (boardsDatas) {
      // Au chargement, on ouvre le 1er projet de la liste
      const currentBoardID = boardsDatas[0].id
      const currentBoardcolumnsNames = boardsDatas[0].columns.map(
        (column) => column.name
      )

      const sessionDatas = {
        userID,
        boards: boardsDatas,
        currentBoardID,
        currentBoardcolumnsNames,
      }

      dispatch(setUserDatas(sessionDatas))
    }
  }
}

export function addTask(
  userID: string,
  boardID: number,
  task: TaskType
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function addTaskThunk(dispatch, getState) {
    const state = getState()

    const boards = JSON.parse(
      JSON.stringify(state.session.boards)
    ) as BoardType[]

    const taskBoardIndex = boards.findIndex(
      (board: BoardType) => board.id === boardID
    )
    const taskColumnIndex = boards[taskBoardIndex].columns.findIndex(
      (column) => column.name === task.status
    )

    console.log(taskBoardIndex)
    console.log(taskColumnIndex)

    boards[taskBoardIndex].columns[taskColumnIndex].datas?.push(task)

    dispatch(setBoards(boards))
  }
}
