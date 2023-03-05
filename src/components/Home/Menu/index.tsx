import { useSelector } from 'react-redux/es/exports'
import { RootState } from '../../../features/app.store'
import Menu from './Menu'

export default function () {
  const { menuIsOpen } = useSelector((state: RootState) => state.generalState)
  return <Menu menuIsOpen={menuIsOpen} />
}
