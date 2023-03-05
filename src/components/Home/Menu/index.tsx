import { RootState, useAppSelector } from '../../../features/app.store'
import Menu from './Menu'

export default function () {
  const { menuIsOpen } = useAppSelector(
    (state: RootState) => state.generalState
  )
  const session = useAppSelector((state: RootState) => state.session)

  return <Menu menuIsOpen={menuIsOpen} session={session} />
}
