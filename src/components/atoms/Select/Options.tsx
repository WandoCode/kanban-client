import { MouseEvent } from 'react'
import { Choice } from './Select'

interface Props {
  choices: Choice[]
  handleClick: (e: MouseEvent<HTMLLIElement>) => void
}

function Options({ choices, handleClick }: Props) {
  return (
    <ul className="options">
      {choices.map((choice) => (
        <li
          key={choice.value}
          className="options__option fc-neutral-400"
          data-value={choice.value}
          onClick={handleClick}
        >
          {choice.text}
        </li>
      ))}
    </ul>
  )
}

export default Options
