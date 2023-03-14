import { useAppDispatch, useAppSelector } from '../app.store'
import { toggleMiscMenu } from './menus.actions'
import EllipsisMenu from '../../components/molecules/EllipsisMenu'
import { openBoardFormModal } from '../board-form/boardForm.actions'

function MiscMenu() {
  const dispatch = useAppDispatch()

  const { miscMenuIsOpen } = useAppSelector((state) => state.menus)
  const { boards, currentBoardId } = useAppSelector((state) => state.boards)

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
