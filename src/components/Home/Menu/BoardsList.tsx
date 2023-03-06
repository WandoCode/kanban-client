import BoardItem from './BoardItem'
import { Session } from '../../../features/session/session.reducers'
import iconBoard from '../../../assets/icon-board.svg'

interface Props {
  session: Session
}

function BoardsList({ session }: Props) {
  const boardList = () => {
    return session.boards.map((board) => (
      <BoardItem
        key={board.uniqid}
        board={board}
        currentBoardID={session.currentBoardID}
      />
    ))
  }

  return (
    // <ul className="menu__board-list fs-400">
    <ul className="boards-list fs-400">
      {boardList()}
      <li>
        <button className="boards-list__item--btn-add boards-list__item btn btn--primary-l btn--transparent">
          <img src={iconBoard} alt="Board" />+ Create New Board
        </button>
      </li>
    </ul>
  )
}

export default BoardsList
