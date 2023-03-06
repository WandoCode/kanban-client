import { useAppSelector } from '../../../features/app.store'
import Button from '../../atoms/Button/Button'
function Board() {
  const { columnsNames } = useAppSelector((state) => state.board)
  const { menuIsOpen } = useAppSelector((state) => state.generalState)

  return (
    <div className={menuIsOpen ? 'board board--menu-open' : 'board'}>
      {columnsNames.length > 0 ? (
        <div className="">NOT EMPTY</div>
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
