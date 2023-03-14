import Button from '../../components/atoms/Button/Button'
import Select from '../../components/atoms/Select/Select'
import Modal from '../modal/Modal'
import { useAppSelector, useAppDispatch } from '../app.store'
import InputText from '../../components/atoms/Input/InputText'
import {
  updateInput,
  updateSubtask,
  setErrors,
  closeTaskFormModal,
} from './taskForm.actions'
import Textarea from '../../components/atoms/Input/Textarea'
import { useEffect } from 'react'
import { addTaskAndSave, updateTaskAndSave } from '../board/boards.thunk'
import { v4 as uuidv4 } from 'uuid'
import { SubtaskType } from '../board/boards.reducer'
import InputWithCancel from '../../components/molecules/InputWithCancel'
import { removeSubtask, addSubtask } from './taskForm.actions'

function ModalTaskForm() {
  const dispatch = useAppDispatch()
  const { formDatas, isEditing, formErrors } = useAppSelector(
    (state) => state.taskForm
  )
  const { currentColumnsNames } = useAppSelector((state) => state.boards)

  useEffect(() => {
    if (isEditing) return
    dispatch(updateInput('status', currentColumnsNames[0]))
  }, [])

  const handleSubmit = () => {
    const invalidFields = validateNewTaskForm()

    if (invalidFields.length !== 0) {
      dispatch(setErrors(invalidFields))
      //TODO: show errors
    } else {
      if (isEditing) {
        dispatch(updateTaskAndSave(true))
      } else {
        const task = { ...formDatas, taskId: uuidv4() }
        dispatch(addTaskAndSave(task))
      }
      dispatch(closeTaskFormModal())
    }
  }

  const validateNewTaskForm = () => {
    const invalidFields: string[] = []
    for (const fieldName in formDatas) {
      const input = formDatas[fieldName]

      if (fieldName === 'title' && input.length === 0) {
        invalidFields.push(fieldName)
      }

      if (fieldName === 'subtasks') {
        input.forEach((el: SubtaskType, i: number) => {
          if (el.title.length === 0) invalidFields.push(`subtask-${i}`)
        })
      }
    }

    return invalidFields
  }

  const onChangeHandler = (
    subtaskIndex: number,
    value: string,
    subtaskIsCompleted: boolean
  ) => {
    dispatch(updateSubtask(subtaskIndex, value, subtaskIsCompleted))
  }

  const handleRemoveSubtask = (subtaskIndex: number) => {
    dispatch(removeSubtask(subtaskIndex))
  }

  const getSubtaskPlaceholder = (i: number) => {
    if (i === 0) return 'e.g. Make coffee'
    if (i === 1) return 'e.g. Drink coffee & smile'
  }

  return (
    <Modal closeModal={() => dispatch(closeTaskFormModal())}>
      <form className="modal-add-task">
        <h2 className="heading-l">
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </h2>
        <InputText
          placeholder="e.g. Take coffee break"
          label="Title"
          id="title"
          errorText="Incorrect value"
          hasError={formErrors.includes('title')}
          onChange={(e) => dispatch(updateInput('title', e.target.value))}
          value={formDatas.title}
        />

        <Textarea
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          label="Description"
          id="description"
          errorText="Incorrect value"
          hasError={formErrors.includes('description')}
          onChange={(e) => dispatch(updateInput('description', e.target.value))}
          value={formDatas.description}
        />

        <fieldset>
          <legend className="modal-add-task__subtasks-title text-bold fc-neutral-450">
            Subtasks
          </legend>

          {formDatas.subtasks.map((subtask, i) => (
            <InputWithCancel
              key={`subtask-${i}`}
              hasError={formErrors.includes(`subtask-${i}`)}
              onChangeValue={(value) =>
                onChangeHandler(i, value, subtask.isCompleted)
              }
              handleRemove={() => handleRemoveSubtask(i)}
              placeholder={getSubtaskPlaceholder(i)}
              id={`subtask-${i}`}
              currentValue={subtask.title}
            />
          ))}

          <Button
            text="+ Add New Subtask"
            type="secondary"
            onClick={() => dispatch(addSubtask())}
          />
        </fieldset>
        <Select
          currValue={formDatas.status}
          label="Status"
          choices={currentColumnsNames}
          onChoice={(choice) => dispatch(updateInput('status', choice))}
        />
        <Button
          text={isEditing ? 'Save Changes' : 'Create Task'}
          type="primary-s"
          onClick={handleSubmit}
        />
      </form>
    </Modal>
  )
}

export default ModalTaskForm
