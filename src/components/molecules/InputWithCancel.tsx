import InputText from '../atoms/Input/InputText'
import IconCross from '../../assets/icon-cross.svg'
import { ChangeEvent, useState, useEffect } from 'react'
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
  const [colorPickerIsOpen, setColorPickerIsOpen] = useState(false)

  useEffect(() => {
    document.body.addEventListener('click', handleCloseColorPicker)

    return () =>
      document.body.removeEventListener('click', handleCloseColorPicker)
  }, [])

  const handleCloseColorPicker = (e: MouseEvent) => {
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
      {colorPickerIsOpen &&
        currentColor &&
        onChangeColor &&
        withColorPicker && (
          <div className="input-with-cancel__color-picker">
            <HexColorPicker color={currentColor} onChange={onChangeColor} />
          </div>
        )}
    </div>
  )
}

export default InputWithCancel
