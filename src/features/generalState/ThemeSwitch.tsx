import Switch from '../../components/atoms/Select/Switch'
import lightIcon from '../../assets/icon-light-theme.svg'
import darkIcon from '../../assets/icon-dark-theme.svg'
import { useAppDispatch, useAppSelector } from '../app.store'
import { setTheme } from './generalState.actions'

function ThemeSwitch() {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector((s) => s.generalState)

  const toogleValue = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="theme-switch">
      <img src={lightIcon} alt="Light" />
      <Switch isChecked={theme === 'dark'} onChangeValue={toogleValue} />
      <img src={darkIcon} alt="Dark" />
    </div>
  )
}

export default ThemeSwitch
