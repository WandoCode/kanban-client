import { useAppDispatch } from '../app.store'
import { toggleMiscMenu } from './menus.actions'
import EllipsisMenu from '../../components/molecules/EllipsisMenu'
import { openBoardFormModal } from '../board-form/boardForm.actions'
import useGetAppState from '../useGetAppState'

function MiscMenu() {
  const dispatch = useAppDispatch()

  const { miscMenuIsOpen, boards, currentBoardId } = useGetAppState()

  const menuItemsWithHandler = [
    {
      text: 'Edit Board',
      handler: () => {
        dispatch(
          openBoardFormModal(true, {
            boardName: boards[currentBoardId].name,
            columns: boards[currentBoardId].columns,
          })
        )
      },
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
