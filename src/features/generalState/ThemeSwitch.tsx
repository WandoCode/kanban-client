import Switch from '../../components/atoms/Select/Switch'
import lightIcon from '../../assets/icon-light-theme.svg'
import darkIcon from '../../assets/icon-dark-theme.svg'
import { useAppDispatch, useAppSelector } from '../app.store'
import { setTheme } from './generalState.actions'
import { useEffect } from 'react'
import localStore from '../../store/localStore'

function ThemeSwitch() {
  const dispatch = useAppDispatch()
  const { theme } = useAppSelector((s) => s.generalState)

  useEffect(() => {
    const theme = localStore.getTheme()
    console.log(theme)

    if (theme) dispatch(setTheme(theme.theme))
  }, [])

  const toogleValue = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    localStore.saveTheme(newTheme)
    dispatch(setTheme(newTheme))
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
