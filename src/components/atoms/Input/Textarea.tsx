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
    const base = 'textarea__label text-bold fc-neutral-450'
    return showLabel ? base : `${base} visually-hidden`
  }

  const inputClassName = () => {
    const base = 'textarea__input box'
    return hasError ? `${base} ${base}--error` : base
  }

  return (
    <div className="textarea">
      <label htmlFor={id} className={labelClassName()}>
        {label}
      </label>
      <div className="textarea__wrapper">
        <textarea
          className={inputClassName()}
          name={id}
          id={id}
          placeholder={placeholder}
          onChange={onChange}
        >
          {value}
        </textarea>
        {hasError && <div className="textarea__error">{errorText}</div>}
      </div>
    </div>
  )
}

export default Textarea
