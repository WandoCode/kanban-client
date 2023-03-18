import { useAppDispatch, useAppSelector } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import Column from './Column'
import {
  openModalTaskDetails,
  setTaskDetails,
} from '../../task-details/taskDetails.actions'
import { TaskType } from '../boards.reducer'

import { openBoardFormModal } from '../../board-form/boardForm.actions'

function Board() {
  const dispatch = useAppDispatch()

  const { menuIsOpen } = useAppSelector((s) => s.sidebar)
  const {
    columnsArrayByStatus,
    currentColumnsNames,
    currentColumns,
    boards,
    currentBoardId,
  } = useAppSelector((s) => s.boards)

  const handleOpenTask = (task: TaskType) => {
    dispatch(setTaskDetails(task))
    dispatch(openModalTaskDetails())
  }

  const columnsDOM = () => {
    if (!columnsArrayByStatus) return null
    return currentColumnsNames.map((columnName, index) => {
      const columnDetails = currentColumns.find(
        (col) => col.name === columnName
      )
      if (!columnDetails) return null

      return (
        <Column
          tasks={columnsArrayByStatus[columnName]}
          columnDetails={columnDetails}
          key={columnName + index}
          handleOpenTask={handleOpenTask}
        />
      )
    })
  }

  const onOpenEditBoard = () => {
    if (!boards) return
    dispatch(
      openBoardFormModal(true, {
        boardName: boards[currentBoardId].name,
        columns: boards[currentBoardId].columns,
      })
    )
  }

  return (
    <div className={menuIsOpen ? 'board board--menu-open' : 'board'}>
      {currentColumnsNames.length > 0 ? (
        <div className="board__columns">
          {columnsDOM()}

          <button className="board__column-add" onClick={onOpenEditBoard}>
            <span className="heading-xl">+ New Column</span>
          </button>
        </div>
      ) : (
        <div className="board__empty">
          <h2 className="heading-l fc-neutral-400">
            This board is empty. Create a new column to get started.
          </h2>
          <Button
            text="+ Add New Column"
            type="primary-l"
            onClick={() => dispatch(openBoardFormModal())}
          />
        </div>
      )}
    </div>
  )
}

export default Board
