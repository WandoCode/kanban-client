import { ChangeEvent } from 'react'

interface Props {
  isChecked: boolean
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
}

function Switch({ isChecked, onChangeValue }: Props) {
  return (
    <form className="switch" aria-hidden={true}>
      <input
        className="visually-hidden switch__input"
        type="checkbox"
        name="theme"
        id="theme"
        onChange={onChangeValue}
        checked={isChecked}
        tabIndex={-1}
      />
      <label htmlFor="theme" className="switch__slider-container">
        <span className="switch__slider"></span>
      </label>
    </form>
  )
}

export default Switch
