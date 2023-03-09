import chevron from '../../../assets/icon-chevron-down.svg'
import plus from '../../../assets/icon-add-task-mobile.svg'
import Button from '../../atoms/Button/Button'

import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../features/app.store'

import MiscMenu from '../../../features/misc-menu/MiscMenu'
import { closeMenu, openMenu } from '../../../features/sidebar/sidebar.actions'
import ModalAddNewTask from '../../../features/add-new-task/ModalAddNewTask'
import { openAddNewTaskModal } from '../../../features/add-new-task/addNewTask.actions'

function Header() {
  const dispatch = useAppDispatch()

  const { menuIsOpen } = useAppSelector((state: RootState) => state.sidebar)
  const { addNewTaskModalIsOpen } = useAppSelector(
    (state: RootState) => state.addNewTask
  )

  const toogleModalMenu = () => {
    menuIsOpen ? dispatch(closeMenu()) : dispatch(openMenu())
  }

  return (
    <>
      {addNewTaskModalIsOpen && <ModalAddNewTask />}

      <div className="header">
        {/* Only mobile */}
        <button
          className="header__right hide-desktop btn--transparent"
          onClick={toogleModalMenu}
        >
          <div className="header__logo-container"></div>
          <h1 className="heading-xl">Platform Launch</h1>
          <img src={chevron} alt="Chevron" />
        </button>

        {/* Only NOT mobile */}
        <div className="header__right hide-mobile">
          <div
            className={
              menuIsOpen
                ? 'header__logo-container header__logo-container--menuOpen'
                : 'header__logo-container'
            }
          ></div>
          <h1 className="heading-xl">Platform Launch</h1>
        </div>

        <div className="header__left ">
          {/* Only mobile  */}
          <div className="hide-desktop">
            <Button
              imgRef={plus}
              className="header__add-task"
              text=""
              type="primary-s"
              onClick={() => dispatch(openAddNewTaskModal())}
            />
          </div>

          {/* Only NOT mobile  */}
          <div className="hide-mobile">
            <Button
              className="header__add-task"
              text="+ Add New Task"
              type="primary-l"
              onClick={() => dispatch(openAddNewTaskModal())}
            />
          </div>

          {/* All screen sizes */}
          <MiscMenu />
        </div>
      </div>
    </>
  )
}

export default Header
