import { MouseEvent, useState } from 'react'
import chevron from '../../../assets/icon-chevron-down.svg'
import Options from './Options'

interface Props {
  currValue: string
  label: string
  choices: string[]
  onChoice: (newValue: string) => void
}

function Select({ onChoice, currValue, label, choices }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault()
    const elem = e.target as HTMLLIElement

    const newValue = elem.getAttribute('data-value')

    if (newValue) {
      onChoice(newValue)
      setIsOpen(false)
    }
  }

  const toogleMenu = (e: MouseEvent) => {
    e.preventDefault()

    setIsOpen((old) => !old)
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
        <span>{currValue}</span>
        <img src={chevron} alt="chevron" />
      </button>
      {isOpen && <Options choices={choices} handleClick={handleClick} />}
    </div>
  )
}

export default Select
