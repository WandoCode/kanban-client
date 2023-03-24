import { useAppDispatch, useAppSelector } from '../app.store'
import { toggleMiscMenu } from './menus.actions'
import EllipsisMenu from '../../components/molecules/EllipsisMenu'
import { openBoardFormModal } from '../board-form/boardForm.actions'

import { openConfirmDelete } from '../confirm-delete/confirmDelete.actions'

function MiscMenu() {
  const dispatch = useAppDispatch()
  const { miscMenuIsOpen } = useAppSelector((s) => s.menus)
  const { boards, currentBoardId } = useAppSelector((s) => s.boards)

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

// TODO: impossible de supprimer un board quand c'est le dernier!
