import { useAppSelector } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import Column from './Column'

function Board() {
  const { columnsNames, columnsDatas } = useAppSelector((state) => state.board)
  const { menuIsOpen } = useAppSelector((state) => state.sidebar)
  const { currentBoardID, currentColumns } = useAppSelector(
    (state) => state.session
  )

  const handleOpenTask = () => {}

  const columnsDOM = () => {
    return columnsDatas.map((column) => (
      <Column
        column={column}
        key={column.name}
        handleOpenTask={handleOpenTask}
      />
    ))
  }

  return (
    <div className={menuIsOpen ? 'board board--menu-open' : 'board'}>
      {columnsNames.length > 0 ? (
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
          <Button text="+ Add New Column" type="primary-l" onClick={() => {}} />
        </div>
      )}
    </div>
  )
}

export default Board