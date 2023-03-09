import { ChangeEvent } from 'react'

interface Props {
  value: string
  placeholder: string
  label?: string
  showLabel?: boolean
  id: string
  errorText: string
  hasError: boolean
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

function Textarea({
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
    const base = 'input-text__input input-text__input--textarea box'
    return hasError ? `${base} ${base}--error` : base
  }

  return (
    <div className="input-text">
      <label htmlFor={id} className={labelClassName()}>
        {label}
      </label>
      <div className="input-text__wrapper">
        <textarea
          className={inputClassName()}
          name={id}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {hasError && <div className="input-text__error">{errorText}</div>}
      </div>
    </div>
  )
}

export default Textarea
