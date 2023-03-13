import InputText from '../../components/atoms/Input/InputText'
import { SubtaskType } from '../board/boards.reducer'
import IconCross from '../../assets/icon-cross.svg'
import { MouseEvent } from 'react'

interface Props {
  formErrors: string[]
  subtaskIndex: number
  onChangeHandler: (
    subtaskIndex: number,
    value: string,
    subtaskIsCompleted: boolean
  ) => void
  placeholder?: string
  subtask: SubtaskType
  handleRemoveSubtask: (subtaskIndex: number) => void
}

const SubtaskInput = ({
  formErrors,
  subtaskIndex,
  onChangeHandler,
  subtask,
  placeholder,
  handleRemoveSubtask,
}: Props) => {
  const handleBtnClick = (e: MouseEvent) => {
    e.preventDefault()

    handleRemoveSubtask(subtaskIndex)
  }

  return (
    <div className="subtask-input">
      <InputText
        key={`subtask-${subtaskIndex}`}
        placeholder={placeholder ? placeholder : 'e.g. Make coffee'}
        label={`subtask-${subtaskIndex}`}
        showLabel={false}
        id={`subtask-${subtaskIndex}`}
        errorText="Incorrect value"
        hasError={formErrors.includes(`subtask-${subtaskIndex}`)}
        onChange={(e) =>
          onChangeHandler(subtaskIndex, e.target.value, subtask.isCompleted)
        }
        value={subtask.title}
      />
      <button className="btn--transparent" onClick={handleBtnClick}>
        <span className="visually-hidden">Remove subtask</span>
        <img src={IconCross} alt="Cross" />
      </button>
    </div>
  )
}

export default SubtaskInput
