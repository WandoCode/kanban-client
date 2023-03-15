import chevron from '../../../assets/icon-chevron-down.svg'
import plus from '../../../assets/icon-add-task-mobile.svg'
import Button from '../../atoms/Button/Button'
import { useAppDispatch } from '../../../features/app.store'
import MiscMenu from '../../../features/menus/MiscMenu'
import { closeMenu, openMenu } from '../../../features/sidebar/sidebar.actions'
import ModalTaskForm from '../../../features/taskForm/ModalTaskForm'
import { openTaskFormModal } from '../../../features/taskForm/taskForm.actions'
import useGetAppState from '../../../features/useGetAppState'

function Header() {
  const dispatch = useAppDispatch()

  const { menuIsOpen, taskFormModalIsOpen } = useGetAppState()

  const toogleModalMenu = () => {
    menuIsOpen ? dispatch(closeMenu()) : dispatch(openMenu())
  }

  return (
    <>
      {taskFormModalIsOpen && <ModalTaskForm />}

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
              onClick={() => dispatch(openTaskFormModal(false))}
            />
          </div>

          {/* Only NOT mobile  */}
          <div className="hide-mobile">
            <Button
              className="header__add-task"
              text="+ Add New Task"
              type="primary-l"
              onClick={() => dispatch(openTaskFormModal(false))}
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
