import { MouseEvent } from 'react'

interface Props {
  choices: string[]
  handleClick: (e: MouseEvent<HTMLLIElement>) => void
}

function Options({ choices, handleClick }: Props) {
  return (
    <ul className="options">
      {choices.map((choice) => (
        <li
          key={choice}
          className="options__option fc-neutral-400"
          data-value={choice}
          onClick={handleClick}
        >
          {choice}
        </li>
      ))}
    </ul>
  )
}

export default Options
