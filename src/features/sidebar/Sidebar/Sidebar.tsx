import { MouseEvent } from 'react'
import BoardsList from './BoardsList'
import iconEyeHide from '../../../assets/icon-hide-sidebar.svg'
import iconExit from '../../../assets/icon-exit.svg'
import ThemeSwitch from './ThemeSwitch'
import { getAuth, signOut } from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '../../app.store'
import Button from '../../../components/atoms/Button/Button'
import { closeMenu } from '../sidebar.actions'
import { changeBoard } from '../../board/boards.thunk'
import { openBoardFormModal } from '../../board-form/boardForm.actions'
import { disconnectUser } from '../../session/session.actions'
import { resetBoards } from '../../board/boards.actions'

export default function Sidebar() {
  const dispatch = useAppDispatch()
  const { currentBoardId } = useAppSelector((s) => s.boards)
  const { boardsShort } = useAppSelector((s) => s.session)
  const { menuIsOpen } = useAppSelector((s) => s.sidebar)

  const menuClassName = () => {
    return menuIsOpen ? 'menu menu--open' : 'menu menu--close'
  }

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('menu__event-close')) dispatch(closeMenu())
  }
  const onClickOpenBoard = (newBoardID: string) => {
    dispatch(changeBoard(newBoardID))
  }

  const signOutUser = () => {
    const auth = getAuth()
    signOut(auth)
    dispatch(disconnectUser())
    dispatch(resetBoards())
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
                onClick={() => signOutUser()}
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
                  className="board-btn btn--transparent"
                  text="Sign Out"
                  type="primary-l"
                  imgRef={iconExit}
                  onClick={() => signOutUser()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
