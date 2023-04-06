import { ThunkAction } from 'redux-thunk'
import { RootState } from '../app.store'
import { AnyAction } from 'redux'
import { boardsStore } from '../../store/boardsStore'
import {
  setBoards,
  applyChangeBoard,
  updateBoards,
  resetBoards,
} from './boards.actions'
import { BoardsDatasType, TaskType, BoardType } from './boards.reducer'
import { updateUserBoardsShortAndSave } from '../session/session.thunks'
import { getBoardsProperties } from '../../utils/object'
import { TaskFormDatas } from '../taskForm/taskForm.reducers'

export function fetchUserBoards(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function fetchUserBoardsThunk(dispatch, getState) {
    const state = getState()
    const { boardsShort, userID, isDemoUser } = state.session
    const { currentBoardId } = state.boards

    if (!boardsShort || !userID) return

    const boards = await boardsStore.getUserBoards(userID, boardsShort)

    if (boards && boardsShort.length !== 0) {
      // At the openning, the first board is displayed
      const boardId = currentBoardId ? currentBoardId : boardsShort[0].id

      const { columns, columnsNames, columnsArrayByStatus } =
        getBoardsProperties(boards, boardId)

      dispatch(
        setBoards(boards, boardId, columns, columnsNames, columnsArrayByStatus)
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

    const { columns, columnsNames, columnsArrayByStatus } = getBoardsProperties(
      boards,
      newBoardId
    )

    dispatch(
      applyChangeBoard(newBoardId, columns, columnsNames, columnsArrayByStatus)
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
    const { isDemoUser } = state.session

    if (!boards || !userID) return

    const copyBoards = JSON.parse(JSON.stringify(boards))

    copyBoards[currentBoardId].tasks.push(task)

    const { columns, columnsNames, columnsArrayByStatus } = getBoardsProperties(
      copyBoards,
      currentBoardId
    )

    dispatch(
      updateBoards(copyBoards, columns, columnsNames, columnsArrayByStatus)
    )

    if (!isDemoUser)
      await boardsStore.updateTasks(
        userID,
        currentBoardId,
        copyBoards[currentBoardId].tasks
      )
  }
}

export function updateTaskAndSave(
  fromEditing: boolean,
  updatedTask?: TaskFormDatas
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function updateTaskAndSaveThunk(dispatch, getState) {
    const state = getState()
    const task = state.taskDetails.task
    const { isDemoUser } = state.session

    const userID = state.session.userID
    const { boards, currentBoardId } = state.boards

    if (!boards || !userID) return

    const copyBoards = JSON.parse(JSON.stringify(boards)) as BoardsDatasType

    const newTask = fromEditing ? updatedTask : task

    if (!newTask) return

    const taskIndex = copyBoards[currentBoardId].tasks.findIndex((t) => {
      return t.taskId === newTask.taskId
    })

    copyBoards[currentBoardId].tasks[taskIndex] = newTask

    const { columns, columnsNames, columnsArrayByStatus } = getBoardsProperties(
      copyBoards,
      currentBoardId
    )

    dispatch(
      updateBoards(copyBoards, columns, columnsNames, columnsArrayByStatus)
    )

    if (!isDemoUser)
      await boardsStore.updateTasks(
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
    const { isDemoUser } = state.session

    if (!userID) return
    if (!boards) {
      const newBoards: BoardsDatasType = {}
      newBoards[newBoard.id] = newBoard
      const { columns, columnsNames, columnsArrayByStatus } =
        getBoardsProperties(newBoards, newBoard.id)

      dispatch(
        setBoards(
          newBoards,
          newBoard.id,
          columns,
          columnsNames,
          columnsArrayByStatus
        )
      )
      dispatch(updateUserBoardsShortAndSave(userID, newBoards))
    } else {
      const copyBoards = JSON.parse(JSON.stringify(boards)) as BoardsDatasType

      copyBoards[newBoard.id] = newBoard

      const { columns, columnsNames, columnsArrayByStatus } =
        getBoardsProperties(copyBoards, newBoard.id)

      dispatch(
        updateBoards(copyBoards, columns, columnsNames, columnsArrayByStatus)
      )
      dispatch(updateUserBoardsShortAndSave(userID, copyBoards))
    }

    if (!isDemoUser) await boardsStore.addBoard(userID, newBoard)
  }
}

export function updateBoardAndSave(
  updatedBoard: BoardType
): ThunkAction<void, RootState, unknown, AnyAction> {
  return async function updateBoardAndSaveThunk(dispatch, getState) {
    const state = getState()
    const { isDemoUser, userID } = state.session
    const { boards } = state.boards

    if (!boards || !userID) return

    const copyBoards = JSON.parse(JSON.stringify(boards)) as BoardsDatasType

    copyBoards[updatedBoard.id] = updatedBoard

    const { columns, columnsNames, columnsArrayByStatus } = getBoardsProperties(
      copyBoards,
      updatedBoard.id
    )

    dispatch(
      updateBoards(copyBoards, columns, columnsNames, columnsArrayByStatus)
    )

    dispatch(updateUserBoardsShortAndSave(userID, copyBoards))

    if (!isDemoUser) await boardsStore.updateBoard(userID, updatedBoard)
  }
}

export function deleteBoardAndSave(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function deleteBoardAndSaveThunk(dispatch, getState) {
    const state = getState()
    const { isDemoUser, userID } = state.session
    const { boards, currentBoardId } = state.boards

    if (!boards || !userID) return

    const deletedBoardId = currentBoardId
    const copyBoards = JSON.parse(JSON.stringify(boards)) as BoardsDatasType

    delete copyBoards[currentBoardId]

    const firstBoardId = Object.keys(copyBoards)[0]

    if (firstBoardId) {
      const { columns, columnsNames, columnsArrayByStatus } =
        getBoardsProperties(copyBoards, firstBoardId)

      dispatch(
        setBoards(
          copyBoards,
          firstBoardId,
          columns,
          columnsNames,
          columnsArrayByStatus
        )
      )
    } else {
      dispatch(resetBoards())
    }

    dispatch(updateUserBoardsShortAndSave(userID, copyBoards))

    if (!isDemoUser) await boardsStore.deleteBoard(userID, deletedBoardId)
  }
}

export function deleteTaskAndSave(): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> {
  return async function deleteTaskAndSaveThunk(dispatch, getState) {
    const state = getState()
    const task = state.taskDetails.task
    const { isDemoUser, userID } = state.session
    const { boards, currentBoardId } = state.boards

    if (!boards || !userID) return

    const copyBoards = JSON.parse(JSON.stringify(boards)) as BoardsDatasType

    const taskIndex = copyBoards[currentBoardId].tasks.findIndex((t) => {
      return t.taskId === task.taskId
    })

    copyBoards[currentBoardId].tasks.splice(taskIndex, 1)

    const { columns, columnsNames, columnsArrayByStatus } = getBoardsProperties(
      copyBoards,
      currentBoardId
    )

    dispatch(
      updateBoards(copyBoards, columns, columnsNames, columnsArrayByStatus)
    )

    if (!isDemoUser)
      await boardsStore.updateTasks(
        userID,
        currentBoardId,
        copyBoards[currentBoardId].tasks
      )
  }
}
