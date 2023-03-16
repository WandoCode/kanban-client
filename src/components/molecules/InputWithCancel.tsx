import InputText from '../atoms/Input/InputText'
import IconCross from '../../assets/icon-cross.svg'
import { ChangeEvent, useState, useEffect, useRef } from 'react'
import { HexColorPicker } from 'react-colorful'

interface Props {
  hasError: boolean
  onChangeValue: (value: string) => void
  placeholder?: string
  handleRemove: () => void
  id: string
  currentValue: string
  withColorPicker?: boolean
  onChangeColor?: (value: string) => void
  currentColor?: string
}

const InputWithCancel = ({
  hasError,
  onChangeValue,
  placeholder,
  handleRemove,
  id,
  currentValue,
  currentColor,
  withColorPicker = false,
  onChangeColor,
}: Props) => {
  const colorpickerRef = useRef<HTMLDivElement>(null)
  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false)

  useEffect(() => {
    document.body.addEventListener('click', handleClickCloseColorPicker)
    document.body.addEventListener('keydown', handleKeyCloseColorPicker)

    return () => {
      document.body.removeEventListener('click', handleClickCloseColorPicker)
      document.body.removeEventListener('keydown', handleKeyCloseColorPicker)
    }
  }, [])

  useEffect(() => {
    if (colorPickerIsOpen) colorpickerRef.current?.focus()
  }, [colorPickerIsOpen])

  const handleKeyCloseColorPicker = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setColorPickerIsOpen(false)
  }

  const handleClickCloseColorPicker = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    const isReactColorfulElement = /^react-colorful/.test(target.className)
    const isColorpickerButton =
      target.className === 'input-with-cancel__color-btn'

    if (!isReactColorfulElement || isColorpickerButton) {
      setColorPickerIsOpen(false)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChangeValue(value)
  }

  const openColorPicker = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setColorPickerIsOpen((old) => !old)
  }

  const onRemove = (e: React.MouseEvent) => {
    e.preventDefault()

    handleRemove()
  }

  return (
    <div className="input-with-cancel">
      <InputText
        placeholder={placeholder ? placeholder : 'Write here'}
        label={id}
        showLabel={false}
        id={id}
        errorText="Incorrect value"
        hasError={hasError}
        onChange={handleInputChange}
        value={currentValue}
      />
      {colorPickerIsOpen &&
        currentColor &&
        onChangeColor &&
        withColorPicker && (
          <div
            ref={colorpickerRef}
            tabIndex={0}
            className="input-with-cancel__color-picker"
          >
            <HexColorPicker color={currentColor} onChange={onChangeColor} />
          </div>
        )}
      {withColorPicker && (
        <button
          className="input-with-cancel__color-btn"
          style={{ backgroundColor: currentColor }}
          onClick={openColorPicker}
        ></button>
      )}
      <button className="btn--transparent" onClick={onRemove}>
        <span className="visually-hidden">Remove input field</span>
        <img
          className={
            hasError
              ? 'input-with-cancel__img input-with-cancel__img--error'
              : 'input-with-cancel__img'
          }
          src={IconCross}
          alt="Cross"
        />
      </button>
    </div>
  )
}

export default InputWithCancel
