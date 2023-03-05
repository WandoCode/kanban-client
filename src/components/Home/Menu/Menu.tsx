import { Session } from '../../../features/session/session.reducers'
import BoardsList from './BoardsList'

interface Props {
  menuIsOpen: boolean
  session: Session
}

function Menu({ menuIsOpen, session }: Props) {
  const menuClassName = () => {
    return menuIsOpen ? 'menu menu--open' : 'menu menu--close'
  }

  return (
    <nav className={menuClassName()}>
      <div className="menu__wrapper">
        <h2 className="menu__heading heading-s">
          All boards ({session.boards.length})
        </h2>
        <BoardsList session={session} />
      </div>
    </nav>
  )
}

export default Menu
