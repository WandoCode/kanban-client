import chevron from '../../../assets/icon-chevron-down.svg'
import plus from '../../../assets/icon-add-task-mobile.svg'
import ellipsis from '../../../assets/icon-vertical-ellipsis.svg'
import Button from '../../atoms/Button/Button'
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../features/app.store'
import {
  closeMenu,
  openMenu,
} from '../../../features/generalState/generalState.actions'

function Header() {
  const dispatch = useAppDispatch()
  const nbrColumns = useAppSelector((state) => state.board.columnsNames.length)

  const { menuIsOpen } = useAppSelector(
    (state: RootState) => state.generalState
  )

  const toogleModalMenu = () => {
    menuIsOpen ? dispatch(closeMenu()) : dispatch(openMenu())
  }

  return (
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
            onClick={() => {}}
          />
        </div>

        {/* Only NOT mobile  */}
        <div className="hide-mobile">
          <Button
            className="header__add-task"
            text="+ Add New Task"
            type="primary-l"
            onClick={() => {}}
          />
        </div>

        {/* All screen sizes */}
        <button className="header__misc-action btn--transparent">
          <img src={ellipsis} alt="Ellipsis" />
        </button>
      </div>
    </div>
  )
}

export default Header
