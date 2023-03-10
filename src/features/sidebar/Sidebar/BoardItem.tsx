import iconBoard from '../../../assets/icon-board.svg'
import Button from '../../../components/atoms/Button/Button'
import { BoardShort } from '../../session/session.reducers'

interface Props {
  board: BoardShort
  currentBoard: string
  onClick: (newBoardID: string) => void
}

function BoardItem({ board, onClick, currentBoard }: Props) {
  const liClassName = (newBoardID: string) => {
    const base = 'board-btn'
    let name = base

    if (newBoardID === currentBoard) name += ` ${base}--current`

    return name + ' btn--transparent heading-m'
  }

  const handleClick = () => {
    onClick(board.id)
  }
  return (
    <li key={board.id}>
      <Button
        className={liClassName(board.id)}
        text={board.name}
        type="primary-l"
        imgRef={iconBoard}
        onClick={handleClick}
      />
    </li>
  )
}

export default BoardItem
