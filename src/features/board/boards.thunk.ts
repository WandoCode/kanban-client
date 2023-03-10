import { ThunkAction } from 'redux-thunk'
import { RootState } from '../app.store'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'
import { setBoards, applyChangeBoard, updateBoards } from './boards.actions'
import { BoardsDatasType, BoardsType, TaskType } from './boards.reducer'
import { addTask } from '../session/session.thunks'

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

export function addTaskAndSave(
  task: TaskType
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function addTaskAndSaveThunk(dispatch, getState) {
    const state = getState()
    const userID = state.session.userID
    const { boards, currentBoardId } = state.boards

    if (!boards || !userID) return

    const copyBoards = JSON.parse(JSON.stringify(boards))

    copyBoards[currentBoardId].tasks.push(task)

    try {
      await boardsStore.updateTask(
        userID,
        currentBoardId,
        copyBoards[currentBoardId].tasks
      )
      dispatch(updateBoards(copyBoards, currentBoardId))
    } catch (err) {
      console.error(err)
    }
  }
}

export function updateTaskAndSave(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function updateTaskAndSaveThunk(dispatch, getState) {
    const state = getState()
    const task = state.taskDetails.task
    const userID = state.session.userID
    const { boards, currentBoardId } = state.boards

    if (!boards || !userID) return

    const copyBoards = JSON.parse(JSON.stringify(boards)) as BoardsDatasType

    const taskIndex = copyBoards[currentBoardId].tasks.findIndex((t) => {
      console.log(task.taskId)

      return t.taskId === task.taskId
    })

    copyBoards[currentBoardId].tasks[taskIndex] = task
    console.log(taskIndex)

    try {
      await boardsStore.updateTask(
        userID,
        currentBoardId,
        copyBoards[currentBoardId].tasks
      )
      dispatch(updateBoards(copyBoards, currentBoardId))
    } catch (err) {
      console.error(err)
    }
  }
}

const getColumnsArrayByStatus = (tasks: TaskType[]) => {
  let rep: Record<string, TaskType[]> = {}

  tasks.forEach((task) => {
    const column = task.status

    if (!rep[column]) rep[column] = []
    rep[column].push(task)
  })

  return rep
}
