import { useAppSelector } from '../../../features/app.store'
import Button from '../../atoms/Button/Button'
import { useEffect } from 'react'

function Board() {
  const { columnsNames, columnsDatas } = useAppSelector((state) => state.board)
  const { menuIsOpen } = useAppSelector((state) => state.generalState)
  const { currentBoardID, currentColumns } = useAppSelector(
    (state) => state.session
  )

  useEffect(() => {
    console.log(columnsDatas)
  }, [columnsDatas])

  const columnsDOM = () => {
    return columnsDatas.map((column) => {
      return (
        <div className="column" key={column.name}>
          <div
            className="column__color"
            style={{ backgroundColor: column.color }}
          ></div>
          <h2>{column.name}</h2>
          <div className="column__task-container">
            <div className="task"></div>
          </div>
        </div>
      )
    })
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
