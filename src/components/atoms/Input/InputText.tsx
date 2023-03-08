import { ChangeEvent } from 'react'

interface Props {
  value: string
  placeholder: string
  label?: string
  showLabel?: boolean
  id: string
  errorText: string
  hasError: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function InputText({
  value,
  label,
  showLabel = true,
  placeholder,
  hasError,
  id,
  errorText,
  onChange,
}: Props) {
  const labelClassName = () => {
    const base = 'input-text__label text-bold fc-neutral-450'
    return showLabel ? base : `${base} visually-hidden`
  }

  const inputClassName = () => {
    const base = 'input-text__input box'
    return hasError ? `${base} ${base}--error` : base
  }

  return (
    <div className="input-text">
      <label htmlFor={id} className={labelClassName()}>
        {label}
      </label>
      <div className="input-text__input-wrapper">
        <input
          type="text"
          value={value}
          name={id}
          id={id}
          className={inputClassName()}
          placeholder={placeholder}
          onChange={onChange}
        />
        {hasError && <div className="input-text__error">{errorText}</div>}
      </div>
    </div>
  )
}

export default InputText
