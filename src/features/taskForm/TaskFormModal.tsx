import Button from '../../components/atoms/Button/Button'
import Select from '../../components/atoms/Select/Select'
import Modal from '../modal/Modal'
import { useAppDispatch, useAppSelector } from '../app.store'
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
import { TaskFormDatas } from './taskForm.reducers'

function TaskFormModal() {
  const dispatch = useAppDispatch()
  const { taskFormDatas, isEditingTaskForm, taskFormErrors } = useAppSelector(
    (s) => s.taskForm
  )
  const { currentColumnsNames } = useAppSelector((s) => s.boards)

  useEffect(() => {
    if (isEditingTaskForm) return
    dispatch(updateInput('status', currentColumnsNames[0]))
  }, [])

  const cleanEmptySubtasks = () => {
    const formCopy: TaskFormDatas = JSON.parse(JSON.stringify(taskFormDatas))

    const emptySubtasksIndex: number[] = []
    formCopy.subtasks.forEach((subtask, i) => {
      if (subtask.title.length === 0) emptySubtasksIndex.push(i)
    })

    if (emptySubtasksIndex.length > 0) {
      emptySubtasksIndex.sort((a, b) => b - a)

      emptySubtasksIndex.forEach((colInd) => {
        formCopy.subtasks.splice(colInd, 1)
      })
    }

    return formCopy
  }

  const handleSubmit = () => {
    const invalidFields = validateNewTaskForm()

    if (invalidFields.length !== 0) {
      dispatch(setErrors(invalidFields))
    } else {
      dispatch(setErrors([]))

      const cleanTask = cleanEmptySubtasks()

      if (isEditingTaskForm) {
        dispatch(updateTaskAndSave(true, cleanTask))
      } else {
        const task = { ...cleanTask, taskId: uuidv4() }
        dispatch(addTaskAndSave(task))
      }
      dispatch(closeTaskFormModal())
    }
  }

  const validateNewTaskForm = () => {
    const invalidFields: string[] = []
    for (const fieldName in taskFormDatas) {
      const input = taskFormDatas[fieldName]

      if (fieldName === 'title' && input.length === 0) {
        invalidFields.push(fieldName)
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
          {isEditingTaskForm ? 'Edit Task' : 'Add New Task'}
        </h2>
        <InputText
          placeholder="e.g. Take coffee break"
          label="Title"
          id="title"
          errorText="Incorrect value"
          hasError={taskFormErrors.includes('title')}
          onChange={(e) => dispatch(updateInput('title', e.target.value))}
          value={taskFormDatas.title}
        />

        <Textarea
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          label="Description"
          id="description"
          errorText="Incorrect value"
          hasError={taskFormErrors.includes('description')}
          onChange={(e) => dispatch(updateInput('description', e.target.value))}
          value={taskFormDatas.description}
        />

        <fieldset>
          <legend className="modal-add-task__subtasks-title text-bold fc-neutral-450">
            Subtasks
          </legend>

          {taskFormDatas.subtasks.map((subtask, i) => (
            <InputWithCancel
              key={`subtask-${i}`}
              hasError={taskFormErrors.includes(`subtask-${i}`)}
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
          currValue={taskFormDatas.status}
          label="Status"
          choices={currentColumnsNames}
          onChoice={(choice) => dispatch(updateInput('status', choice))}
        />
        <Button
          text={isEditingTaskForm ? 'Save Changes' : 'Create Task'}
          type="primary-s"
          onClick={handleSubmit}
        />
      </form>
    </Modal>
  )
}

export default TaskFormModal
