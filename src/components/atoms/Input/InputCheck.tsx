interface Props {
  text: string
  id: string
  isChecked: boolean
  onChange: () => void
}

function InputCheck({ text, id, isChecked, onChange }: Props) {
  return (
    <div className="input-check">
      <input
        type="checkbox"
        name={id}
        id={id}
        className="visually-hidden"
        onChange={onChange}
        checked={isChecked}
      />
      <label className="input-check__label" htmlFor={id}>
        <div className="input-check__check"></div>
        <div className="input-check__text">{text}</div>
      </label>
    </div>
  )
}

export default InputCheck
