import { MouseEvent } from 'react'
import {
  RootState,
  useAppSelector,
  useAppDispatch,
} from '../../../features/app.store'
import { closeMenu } from '../../../features/generalState/generalState.actions'
import Menu from './Menu'

export default function () {
  const dispatch = useAppDispatch()
  const { menuIsOpen } = useAppSelector(
    (state: RootState) => state.generalState
  )
  const session = useAppSelector((state: RootState) => state.session)
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('menu__event-close')) dispatch(closeMenu())
  }

  return (
    <Menu menuIsOpen={menuIsOpen} session={session} onClick={handleClick} />
  )
}
