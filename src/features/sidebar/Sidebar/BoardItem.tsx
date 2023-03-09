import iconBoard from '../../../assets/icon-board.svg'
import Button from '../../../components/atoms/Button/Button'
import { BoardType } from '../../session/session.reducers'

interface Props {
  board: BoardType
  currentBoardID: number | null
  onClick: (boardID: number) => void
}

function BoardItem({ board, onClick, currentBoardID }: Props) {
  const liClassName = (boardID: number) => {
    const base = 'board-btn'
    let name = base

    if (boardID === currentBoardID) name += ` ${base}--current`

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
