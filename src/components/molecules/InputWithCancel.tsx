import InputText from '../atoms/Input/InputText'
import { SubtaskType } from '../../features/board/boards.reducer'
import IconCross from '../../assets/icon-cross.svg'
import { ChangeEvent, MouseEvent } from 'react'

interface Props {
  hasError: boolean
  subtaskIndex: number
  onChangeHandler: (value: string) => void
  placeholder?: string
  handleRemoveSubtask: (subtaskIndex: number) => void
  id: string
  currentValue: string
}

const InputWithCancel = ({
  hasError,
  subtaskIndex,
  onChangeHandler,
  placeholder,
  handleRemoveSubtask,
  id,
  currentValue,
}: Props) => {
  const handleBtnClick = (e: MouseEvent) => {
    e.preventDefault()

    handleRemoveSubtask(subtaskIndex)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    onChangeHandler(value)
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
      <button className="btn--transparent" onClick={handleBtnClick}>
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
// TODO: La croix pour retirer une subtask doit devenir rouge si la subtask est en erreur lors de la validation du formulaire
// TODO: transformer en Atom pour utiliser pour l'ajout/suppression de column lors de l'edition d'un board
