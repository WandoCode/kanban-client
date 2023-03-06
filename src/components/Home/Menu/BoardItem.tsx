import iconBoard from '../../../assets/icon-board.svg'
import { BoardShort } from '../../../features/session/session.reducers'
import Button from '../../atoms/Button/Button'

interface Props {
  board: BoardShort
  currentBoardID: number | null
}

function BoardItem({ board, currentBoardID }: Props) {
  const liClassName = (boardID: number) => {
    const base = 'board-btn'
    let name = base

    if (boardID === currentBoardID) name += ` ${base}--current`

    return name + ' btn--transparent heading-m'
  }

  return (
    <li key={board.uniqid}>
      <Button
        className={liClassName(board.uniqid)}
        text={board.name}
        type="primary-l"
        imgRef={iconBoard}
        onClick={() => {}}
      />
    </li>
  )
}

export default BoardItem
