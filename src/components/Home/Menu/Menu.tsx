import { useAppSelector, RootState } from '../../../features/app.store'
import { useEffect } from 'react'
import iconBoard from '../../../assets/icon-board.svg'

interface Props {
  menuIsOpen: boolean
}

function Menu({ menuIsOpen }: Props) {
  const session = useAppSelector((state: RootState) => state.session)

  const menuClassName = () => {
    return menuIsOpen ? 'menu menu--open' : 'menu menu--close'
  }

  const liClassName = (boardID: number) => {
    const base = 'menu__board-item'

    let name = base
    if (boardID === session.currentBoardID) name += ` ${base}--current`

    console.log(name)

    return name + ' btn--transparent heading-m'
  }

  const boardList = () => {
    return session.boards.map((board) => (
      <li key={board.uniqid}>
        <button className={liClassName(board.uniqid)}>
          <img src={iconBoard} alt="Board" />
          {board.name}
        </button>
      </li>
    ))
  }

  return (
    <nav className={menuClassName()}>
      <div className="menu__wrapper">
        <h2 className="menu__heading heading-s">
          All boards ({session.boards.length})
        </h2>
        <ul className="menu__board-list fs-400">
          {boardList()}
          <li>
            <button className="menu__board-item--btn-add menu__board-item btn--transparent">
              <img src={iconBoard} alt="Board" />+ Create New Board
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Menu
