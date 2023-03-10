import { ThunkAction } from 'redux-thunk'
import { RootState } from '../app.store'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'
import { setBoards, applyChangeBoard } from './boards.actions'
import { BoardsDatasType, BoardsType, TaskType } from './boards.reducer'

export function fetchUserBoards(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function fetchUserBoardsThunk(dispatch, getState) {
    const state = getState()
    const { boardsShort, userID } = state.session

    if (!boardsShort || !userID) return

    const boards = await boardsStore.getUserBoards(userID, boardsShort)

    if (boards) {
      // At the openning, the first board is displayed
      const currentBoardName = boardsShort[0].id

      dispatch(changeBoard(currentBoardName))
      dispatch(setBoards({ boards }))
    }
  }
}

export function changeBoard(
  newBoardName: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return function fetchUserBoardsThunk(dispatch, getState) {
    const state = getState()
    const { boards } = state.boards

    if (!boards || !newBoardName) return

    const newBoardDatas = boards[newBoardName]

    const newColumnsArrayByStatus = getColumnsArrayByStatus(newBoardDatas.tasks)
    const newColumns = newBoardDatas.columns
    const newColumnsNames = newColumns.map((col) => col.name)

    dispatch(
      applyChangeBoard(
        newBoardName,
        newColumns,
        newColumnsNames,
        newColumnsArrayByStatus
      )
    )
  }
}

const getColumnsArrayByStatus = (tasks: TaskType[]) => {
  let rep: Record<string, TaskType[]> = {}

  tasks.forEach((task) => {
    const column = task.status
    console.log(column)

    if (!rep[column]) rep[column] = []
    rep[column].push(task)
  })
  console.log(rep)

  return rep
}
