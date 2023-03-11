import { useAppDispatch, useAppSelector, RootState } from '../app.store'
import { toggleMiscMenu } from './menus.actions'
import EllipsisMenu from '../../components/molecules/EllipsisMenu'

function MiscMenu() {
  const dispatch = useAppDispatch()

  const { miscMenuIsOpen } = useAppSelector((state: RootState) => state.menus)

  const menuItemsWithHandler = [
    {
      text: 'Edit Board',
      handler: () => {},
    },
    {
      text: 'Delete Board',
      handler: () => {},
    },
  ]

  return (
    <EllipsisMenu
      name="misc"
      menuIsOpen={miscMenuIsOpen}
      toogleMenu={() => dispatch(toggleMiscMenu())}
      menuItemsWithHandler={menuItemsWithHandler}
    />
  )
}

export default MiscMenu
