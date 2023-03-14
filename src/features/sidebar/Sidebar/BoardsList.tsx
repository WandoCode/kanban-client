import BoardItem from './BoardItem'
import { BoardShort } from '../../session/session.reducers'
import iconBoard from '../../../assets/icon-board.svg'
import Button from '../../../components/atoms/Button/Button'
import { useEffect } from 'react'

interface Props {
  boards: BoardShort[]
  onClickOpenBoard: (boardID: string) => void
  currentBoard: string
  onOpenBoardFormModal: () => void
}

function BoardsList({
  boards,
  onClickOpenBoard,
  currentBoard,
  onOpenBoardFormModal,
}: Props) {
  const boardList = () => {
    return boards.map((board) => (
      <BoardItem
        key={board.id}
        board={board}
        currentBoard={currentBoard}
        onClick={onClickOpenBoard}
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
          onClick={onOpenBoardFormModal}
        />
      </li>
    </ul>
  )
}

export default BoardsList
