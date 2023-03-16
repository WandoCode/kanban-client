import { useAppDispatch } from '../app.store'
import { toggleMiscMenu } from './menus.actions'
import EllipsisMenu from '../../components/molecules/EllipsisMenu'
import {
  openBoardFormModal,
  closeBoardFormModal,
} from '../board-form/boardForm.actions'
import useGetAppState from '../useGetAppState'
import { openConfirmDelete } from '../confirm-delete/confirmDelete.actions'

function MiscMenu() {
  const dispatch = useAppDispatch()

  const { miscMenuIsOpen, boards, currentBoardId } = useGetAppState()

  const onOpenEditBoard = () => {
    if (!boards) return
    dispatch(
      openBoardFormModal(true, {
        boardName: boards[currentBoardId].name,
        columns: boards[currentBoardId].columns,
      })
    )
  }

  const onDeleteBoard = () => {
    dispatch(openConfirmDelete('board'))
  }

  const menuItemsWithHandler = [
    {
      text: 'Edit Board',
      handler: onOpenEditBoard,
    },

    {
      text: 'Delete Board',
      handler: onDeleteBoard,
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
