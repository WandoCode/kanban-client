import { MouseEvent } from 'react'
import BoardsList from './BoardsList'
import iconEyeHide from '../../../assets/icon-hide-sidebar.svg'
import ThemeSwitch from './ThemeSwitch'
import { closeMenu } from '../../../features/generalState/generalState.actions'
import {
  useAppDispatch,
  useAppSelector,
  RootState,
} from '../../../features/app.store'

export default function () {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state: RootState) => state.session)
  const { menuIsOpen } = useAppSelector(
    (state: RootState) => state.generalState
  )

  const menuClassName = () => {
    return menuIsOpen ? 'menu menu--open' : 'menu menu--close'
  }

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('menu__event-close')) dispatch(closeMenu())
  }

  return (
    <nav className={menuClassName()}>
      <div className="menu__event-close" onClick={handleClose}>
        <div className="menu__wrapper">
          <div className="menu__sup">
            <h2 className="menu__heading heading-s">
              All boards ({session.boards.length})
            </h2>
            <BoardsList session={session} />
          </div>
          <div className="menu__inf">
            <ThemeSwitch />
            <div className="hide-mobile">
              <button
                className="board-btn  btn btn--primary-l btn--transparent"
                onClick={() => dispatch(closeMenu())}
              >
                <img src={iconEyeHide} alt="Board" />
                Hide Sidebar
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
