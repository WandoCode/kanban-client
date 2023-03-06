import { MouseEvent } from 'react'
import { Session } from '../../../features/session/session.reducers'
import BoardsList from './BoardsList'

import ThemeSwitch from './ThemeSwitch'

interface Props {
  menuIsOpen: boolean
  session: Session
  onClick: (e: MouseEvent<HTMLDivElement>) => void
}

function Menu({ menuIsOpen, session, onClick }: Props) {
  const menuClassName = () => {
    return menuIsOpen ? 'menu menu--open' : 'menu menu--close'
  }

  return (
    <nav className={menuClassName()}>
      <div className="menu__event-close" onClick={onClick}>
        <div className="menu__wrapper">
          <div className="menu__sup">
            <h2 className="menu__heading heading-s">
              All boards ({session.boards.length})
            </h2>
            <BoardsList session={session} />
          </div>
          <div className="menu__inf">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu
