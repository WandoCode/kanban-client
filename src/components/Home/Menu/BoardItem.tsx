import iconBoard from '../../../assets/icon-board.svg'
import { Board } from '../../../features/session/session.reducers'

interface Props {
  board: Board
  currentBoardID: number | null
}

function BoardItem({ board, currentBoardID }: Props) {
  const liClassName = (boardID: number) => {
    const base = 'board-btn'
    let name = base

    if (boardID === currentBoardID) name += ` ${base}--current`

    return name + ' btn btn--primary-l btn--transparent heading-m'
  }

  return (
    <li key={board.uniqid}>
      <button className={liClassName(board.uniqid)}>
        <img src={iconBoard} alt="Board" />
        {board.name}
      </button>
    </li>
  )
}

export default BoardItem
