import { useAppSelector, useAppDispatch } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import Column from './Column'
import Modal from '../../../components/utils/Modal'
import {
  openModalTaskDetails,
  setTaskDetails,
} from '../../task-details/taskDetails.actions'
import TaskDetailsModal from '../../task-details/TaskDetailsModal'
import { TaskType, ColumnType } from '../boards.reducer'

function Board() {
  const dispatch = useAppDispatch()
  const { menuIsOpen } = useAppSelector((state) => state.sidebar)
  const { taskDetailsModalIsOpen } = useAppSelector(
    (state) => state.taskDetails
  )

  const { columnsArrayByStatus, currentColumnsNames, currentColumns } =
    useAppSelector((state) => state.boards)

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

  return (
    <>
      {taskDetailsModalIsOpen && (
        <Modal>
          <TaskDetailsModal />
        </Modal>
      )}
      <div className={menuIsOpen ? 'board board--menu-open' : 'board'}>
        {currentColumnsNames.length > 0 ? (
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
