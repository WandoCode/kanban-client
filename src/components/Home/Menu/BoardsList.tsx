import BoardItem from './BoardItem'
import { Session } from '../../../features/session/session.reducers'
import iconBoard from '../../../assets/icon-board.svg'
import Button from '../../atoms/Button/Button'

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
    <ul className="boards-list fs-400">
      {boardList()}
      <li>
        <Button
          className="board-btn board-btn--btn-add btn--transparent"
          text="+ Create New Board"
          type="primary-l"
          imgRef={iconBoard}
          onClick={() => {}}
        />
      </li>
    </ul>
  )
}

export default BoardsList
