import { ThunkAction } from 'redux-thunk'
import { RootState } from '../app.store'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'
import { setBoards, applyChangeBoard, updateBoards } from './boards.actions'
import { BoardsDatasType, TaskType, BoardType } from './boards.reducer'
import { updateUserBoardsAndSave } from '../session/session.thunks'

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
      const currentBoardId = boardsShort[0].id

      const newBoardDatas = boards[currentBoardId]

      const newColumnsArrayByStatus = getColumnsArrayByStatus(
        newBoardDatas.tasks
      )
      const newColumns = newBoardDatas.columns
      const newColumnsNames = newColumns.map((col) => col.name)

      dispatch(
        setBoards(
          { boards },
          currentBoardId,
          newColumns,
          newColumnsNames,
          newColumnsArrayByStatus
        )
      )
    }
  }
}

export function changeBoard(
  newBoardId: string
): ThunkAction<void, RootState, unknown, AnyAction> {
  return function fetchUserBoardsThunk(dispatch, getState) {
    const state = getState()
    const { boards } = state.boards

    if (!boards || !newBoardId) return

    const newBoardDatas = boards[newBoardId]

    const newColumnsArrayByStatus = getColumnsArrayByStatus(newBoardDatas.tasks)
    const newColumns = newBoardDatas.columns
    const newColumnsNames = newColumns.map((col) => col.name)

    dispatch(
      applyChangeBoard(
        newBoardId,
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

    dispatch(updateBoards(copyBoards))
    await boardsStore.updateTask(
      userID,
      currentBoardId,
      copyBoards[currentBoardId].tasks
    )
  }
}

export function updateTaskAndSave(
  fromEditing: boolean
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function updateTaskAndSaveThunk(dispatch, getState) {
    const state = getState()
    const task = state.taskDetails.task
    const formDatas = state.taskForm.formDatas
    const userID = state.session.userID
    const { boards, currentBoardId } = state.boards

    if (!boards || !userID) return

    const copyBoards = JSON.parse(JSON.stringify(boards)) as BoardsDatasType

    const newTask = fromEditing ? formDatas : task

    const taskIndex = copyBoards[currentBoardId].tasks.findIndex((t) => {
      return t.taskId === newTask.taskId
    })

    copyBoards[currentBoardId].tasks[taskIndex] = newTask

    dispatch(updateBoards(copyBoards))

    await boardsStore.updateTask(
      userID,
      currentBoardId,
      copyBoards[currentBoardId].tasks
    )
  }
}

export function addBoardAndSave(
  newBoard: BoardType
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function addBoardAndSaveThunk(dispatch, getState) {
    const state = getState()
    const userID = state.session.userID
    const { boards } = state.boards

    if (!boards || !userID) return

    const copyBoards = JSON.parse(JSON.stringify(boards)) as BoardsDatasType

    copyBoards[newBoard.id] = newBoard

    dispatch(updateBoards(copyBoards))
    dispatch(updateUserBoardsAndSave(userID, copyBoards))

    await boardsStore.addBoard(userID, newBoard)
  }
}

export function updateBoardAndSave(
  updatedBoard: BoardType
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function updateBoardAndSaveThunk(dispatch, getState) {
    const state = getState()
    const userID = state.session.userID
    const { boards } = state.boards

    if (!boards || !userID) return

    const copyBoards = JSON.parse(JSON.stringify(boards)) as BoardsDatasType

    copyBoards[updatedBoard.id] = updatedBoard

    dispatch(updateBoards(copyBoards))
    dispatch(updateUserBoardsAndSave(userID, copyBoards))

    await boardsStore.updateBoard(userID, updatedBoard)
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
