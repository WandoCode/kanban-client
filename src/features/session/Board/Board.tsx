import { useAppSelector, useAppDispatch } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import Column from './Column'
import { useEffect } from 'react'
import Modal from '../../../components/utils/Modal'
import {
  openModalTaskDetails,
  setTaskDetails,
} from '../../task-details/taskDetails.actions'
import TaskDetailsModal from '../../task-details/TaskDetailsModal'
import { TaskType } from '../session.reducers'

function Board() {
  const dispatch = useAppDispatch()
  const { menuIsOpen } = useAppSelector((state) => state.sidebar)
  const { taskDetailsModalIsOpen } = useAppSelector(
    (state) => state.taskDetails
  )
  const { currentBoardcolumnsNames, boards, currentBoardID } = useAppSelector(
    (state) => state.session
  )

  const handleOpenTask = (task: TaskType) => {
    dispatch(setTaskDetails(task))
    dispatch(openModalTaskDetails())
  }

  const columnsDOM = () => {
    const currentBoard = boards.find((board) => board.id === currentBoardID)

    return currentBoard?.columns.map((column) => (
      <Column
        column={column}
        key={column.name}
        handleOpenTask={handleOpenTask}
      />
    ))
  }

  return (
    <>
      {taskDetailsModalIsOpen && (
        <Modal>
          <TaskDetailsModal />
        </Modal>
      )}
      <div className={menuIsOpen ? 'board board--menu-open' : 'board'}>
        {currentBoardcolumnsNames.length > 0 ? (
          <div className="board__columns">
            {columnsDOM()}
            <button className="board__column-add">
              <div className="heading-xl">+ New Column</div>
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
              onClick={() => {}}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Board
