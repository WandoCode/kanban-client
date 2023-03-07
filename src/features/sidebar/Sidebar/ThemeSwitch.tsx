import Switch from '../../../components/atoms/Select/Switch'
import lightIcon from '../../../assets/icon-light-theme.svg'
import darkIcon from '../../../assets/icon-dark-theme.svg'

function ThemeSwitch() {
  return (
    <div className="theme-switch">
      <img src={lightIcon} alt="Light" />
      <Switch isChecked={false} onChangeValue={() => {}} />
      <img src={darkIcon} alt="Dark" />
    </div>
  )
}

export default ThemeSwitch
