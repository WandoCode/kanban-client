import { useAppDispatch, useAppSelector, RootState } from '../app.store'
import { toggleMiscMenu } from './miscMenu.actions'
import ellipsis from '../../assets/icon-vertical-ellipsis.svg'
import { useEffect } from 'react'

function MiscMenu() {
  const dispatch = useAppDispatch()

  const { miscMenuIsOpen } = useAppSelector(
    (state: RootState) => state.miscMenu
  )

  useEffect(() => {
    if (miscMenuIsOpen) document.body.addEventListener('click', handleClickBody)

    return () => document.body.removeEventListener('click', handleClickBody)
  }, [miscMenuIsOpen])

  const handleClickBody = (e: MouseEvent) => {
    const htmlElement = e.target as HTMLElement
    if (!htmlElement.hasAttribute('data-no-close')) dispatch(toggleMiscMenu())
  }

  return (
    <>
      <button
        className="misc-menu__action btn--transparent"
        onClick={() => dispatch(toggleMiscMenu())}
      >
        <img src={ellipsis} alt="Ellipsis" data-no-close={true} />
      </button>
      <div
        className={`misc-menu__menu misc-menu__menu--${
          miscMenuIsOpen ? 'open' : 'close'
        } options`}
        data-no-close={true}
      >
        <button
          className="options__option btn--transparent"
          data-no-close={true}
        >
          Edit Board
        </button>

        <button
          className="options__option btn--transparent"
          data-no-close={true}
        >
          Delete Board
        </button>
      </div>
    </>
  )
}

export default MiscMenu
