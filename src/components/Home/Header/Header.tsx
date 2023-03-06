import chevron from '../../../assets/icon-chevron-down.svg'
import plus from '../../../assets/icon-add-task-mobile.svg'
import ellipsis from '../../../assets/icon-vertical-ellipsis.svg'
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
          <button className="header__add-task btn btn--primary-s ">
            <img src={plus} alt="More" />
          </button>
        </div>

        {/* Only NOT mobile  */}
        <div className="hide-mobile">
          <button className="header__add-task btn btn--primary-l ">
            <div>+ Add New Task</div>
          </button>
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
