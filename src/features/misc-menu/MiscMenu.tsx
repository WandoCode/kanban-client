import { useAppDispatch, useAppSelector, RootState } from '../app.store'
import { toggleMiscMenu } from './miscMenu.actions'
import ellipsis from '../../assets/icon-vertical-ellipsis.svg'

function MiscMenu() {
  const dispatch = useAppDispatch()

  const { miscMenuIsOpen } = useAppSelector(
    (state: RootState) => state.miscMenu
  )
  return (
    <>
      <button
        className="misc-menu__action btn--transparent"
        onClick={() => dispatch(toggleMiscMenu())}
      >
        <img src={ellipsis} alt="Ellipsis" />
      </button>
      <div
        className={`misc-menu__menu misc-menu__menu--${
          miscMenuIsOpen ? 'open' : 'close'
        } options`}
      >
        <button className="options__option btn--transparent">Edit Board</button>
        <button className="options__option btn--transparent">
          Delete Board
        </button>
      </div>
    </>
  )
}

export default MiscMenu
