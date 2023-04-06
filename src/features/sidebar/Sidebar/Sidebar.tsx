import { MouseEvent } from 'react'
import BoardsList from './BoardsList'
import iconEyeHide from '../../../assets/icon-hide-sidebar.svg'
import iconExit from '../../../assets/icon-exit.svg'
import ThemeSwitch from '../../generalState/ThemeSwitch'
import { useAppDispatch, useAppSelector } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import { closeMenu } from '../sidebar.actions'
import { changeBoard } from '../../board/boards.thunk'
import { openBoardFormModal } from '../../board-form/boardForm.actions'
import { signOutUser } from '../../session/session.thunks'

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const { currentBoardId } = useAppSelector((s) => s.boards)
  const { boardsShort } = useAppSelector((s) => s.session)
  const { sidebarIsOpen } = useAppSelector((s) => s.sidebar)

  const menuClassName = () => {
    return sidebarIsOpen ? 'menu menu--open' : 'menu menu--close'
  }

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('menu__event-close')) dispatch(closeMenu())
  }
  const onClickOpenBoard = (newBoardID: string) => {
    dispatch(changeBoard(newBoardID))
  }

  const signOut = () => {
    dispatch(signOutUser())
  }

  return (
    <nav className={menuClassName()}>
      <div className="menu__event-close" onClick={handleClose}>
        <div className="menu__wrapper">
          <div className="menu__sup">
            <h2 className="menu__heading heading-s">
              All boards ({boardsShort.length})
            </h2>
            <BoardsList
              boards={boardsShort}
              onClickOpenBoard={onClickOpenBoard}
              currentBoard={currentBoardId}
              onOpenBoardFormModal={() => dispatch(openBoardFormModal())}
            />
          </div>
          <div className="menu__inf">
            <div className="hide-desktop">
              <Button
                className="board-btn btn--transparent "
                text="Sign Out"
                type="primary-l"
                imgRef={iconExit}
                onClick={() => signOut()}
              />
            </div>
            <ThemeSwitch />
            <div>
              <div className="hide-mobile">
                <Button
                  className="board-btn btn--transparent"
                  text="Hide Sidebar"
                  type="primary-l"
                  imgRef={iconEyeHide}
                  onClick={() => dispatch(closeMenu())}
                />
              </div>
              <div className="hide-mobile">
                <Button
                  className="board-btn board-btn--destructive btn--transparent"
                  text="Sign Out"
                  type="destructive"
                  imgRef={iconExit}
                  onClick={() => signOut()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
