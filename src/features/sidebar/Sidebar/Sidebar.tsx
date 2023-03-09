import { MouseEvent } from 'react'
import BoardsList from './BoardsList'
import iconEyeHide from '../../../assets/icon-hide-sidebar.svg'
import ThemeSwitch from './ThemeSwitch'

import { useAppDispatch, useAppSelector, RootState } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import { closeMenu } from '../sidebar.actions'
import { setCurrentBoard } from '../../session/session.actions'

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state: RootState) => state.session)
  const { menuIsOpen } = useAppSelector((state: RootState) => state.sidebar)

  const menuClassName = () => {
    return menuIsOpen ? 'menu menu--open' : 'menu menu--close'
  }

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('menu__event-close')) dispatch(closeMenu())
  }
  const onClickOpenBoard = (boardID: number) => {
    dispatch(setCurrentBoard(boardID))
  }

  return (
    <nav className={menuClassName()}>
      <div className="menu__event-close" onClick={handleClose}>
        <div className="menu__wrapper">
          <div className="menu__sup">
            <h2 className="menu__heading heading-s">
              All boards ({session.boards.length})
            </h2>
            <BoardsList session={session} onClickOpenBoard={onClickOpenBoard} />
          </div>
          <div className="menu__inf">
            <ThemeSwitch />
            <div className="hide-mobile">
              <Button
                className="board-btn btn--transparent"
                text="Hide Sidebar"
                type="primary-l"
                imgRef={iconEyeHide}
                onClick={() => dispatch(closeMenu())}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
