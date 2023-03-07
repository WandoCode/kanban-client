import { useAppSelector } from '../../../features/app.store'
import Button from '../../atoms/Button/Button'
import { useEffect } from 'react'
import Column from './Column'

function Board() {
  const { columnsNames, columnsDatas } = useAppSelector((state) => state.board)
  const { menuIsOpen } = useAppSelector((state) => state.generalState)
  const { currentBoardID, currentColumns } = useAppSelector(
    (state) => state.session
  )

  const columnsDOM = () => {
    return columnsDatas.map((column) => (
      <Column column={column} key={column.name} />
    ))
  }

  return (
    <div className={menuIsOpen ? 'board board--menu-open' : 'board'}>
      {columnsNames.length > 0 ? (
        <div className="board__columns">{columnsDOM()}</div>
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
