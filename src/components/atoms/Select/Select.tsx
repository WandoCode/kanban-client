import { MouseEvent, useState } from 'react'
import chevron from '../../../assets/icon-chevron-down.svg'

interface Choice {
  value: string
  text: string
}

interface Props {
  currValue: string
  label: string
  choices: Choice[]
  onChoice: (newValue: string) => void
}

function Select({ onChoice, currValue, label, choices }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const elem = e.target as HTMLLIElement

    const newValue = elem.getAttribute('data-value')
    if (newValue) onChoice(newValue)
  }

  const options = () => {
    return choices.map((choice) => (
      <li
        key={choice.value}
        className="select__option fc-neutral-400"
        data-value={choice.value}
        onClick={handleClick}
      >
        {choice.text}
      </li>
    ))
  }

  const toogleMenu = () => {
    setIsOpen((old) => !old)
  }

  const getText = () => {
    const currChoice = choices.find((choice) => choice.value === currValue)
    if (currChoice) return currChoice.text
    else return 'NaN'
  }

  const btnClassName = () => {
    const base = 'box select__btn'

    return isOpen ? `${base} select__btn--open` : base
  }

  return (
    <div className="select">
      <label
        htmlFor="select-btn"
        className="select__label text-bold fc-neutral-450"
      >
        {label}
      </label>
      <button className={btnClassName()} id="select-btn" onClick={toogleMenu}>
        <span>{getText()}</span>
        <img src={chevron} alt="chevron" />
      </button>
      {isOpen && <ul className="select__options"> {options()}</ul>}
    </div>
  )
}

export default Select
