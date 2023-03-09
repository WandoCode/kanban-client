import Button from '../../components/atoms/Button/Button'
import Select from '../../components/atoms/Select/Select'
import Modal from '../../components/utils/Modal'
import { useAppSelector, useAppDispatch } from '../app.store'
import InputText from '../../components/atoms/Input/InputText'
import { updateInput, updateSubtask, setErrors } from './addNewTask.actions'
import Textarea from '../../components/atoms/Input/Textarea'
import { useEffect } from 'react'
import { closeAddNewTaskModal } from './addNewTask.actions'
import { addTask } from '../session/session.thunks'

function ModalAddNewTask() {
  const dispatch = useAppDispatch()
  const { formDatas } = useAppSelector((state) => state.addNewTask)
  const { currentBoardcolumnsNames } = useAppSelector((state) => state.session)

  useEffect(() => {
    document.body.addEventListener('click', handleCloseModal)

    return () => document.body.removeEventListener('click', handleCloseModal)
  }, [])

  useEffect(() => {
    dispatch(updateInput('status', currentBoardcolumnsNames[0]))
  }, [currentBoardcolumnsNames])

  const handleCloseModal = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('modal')) dispatch(closeAddNewTaskModal())
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()

    const invalidFields = validateNewTaskForm()

    if (invalidFields.length !== 0) {
      dispatch(setErrors(invalidFields))
    } else {
      const task = { ...formDatas, position: 1 }
      dispatch(addTask('userA', 120, task))
      dispatch(closeAddNewTaskModal())
    }
  }

  const validateNewTaskForm = () => {
    const invalidFields: string[] = []
    for (const fieldName in formDatas) {
      const input = formDatas[fieldName]

      if (input !== 'subtasks' && input.length === 0) {
        invalidFields.push(fieldName)
      }
    }
    return invalidFields
  }

  return (
    <Modal>
      <form className="modal-add-task">
        <h2 className="heading-l">Add New Task</h2>
        <InputText
          placeholder="e.g. Take coffee break"
          label="Title"
          id="title"
          errorText="Incorrect value"
          hasError={false}
          onChange={(e) => dispatch(updateInput('title', e.target.value))}
          value={formDatas.title}
        />

        <Textarea
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          label="Description"
          id="description"
          errorText="Incorrect value"
          hasError={false}
          onChange={(e) => dispatch(updateInput('description', e.target.value))}
          value={formDatas.description}
        />

        <fieldset>
          <legend className="text-bold fc-neutral-450">Subtasks</legend>

          <InputText
            placeholder="e.g. Make coffee"
            label="subtask-0"
            showLabel={false}
            id="subtask-0"
            errorText="Incorrect value"
            hasError={false}
            onChange={(e) => dispatch(updateSubtask(0, e.target.value, false))}
            value={formDatas.subtasks[0].title}
          />
          <InputText
            placeholder="e.g. Drink coffee & smile"
            label="subtask-1"
            showLabel={false}
            id="subtask-1"
            errorText="Incorrect value"
            hasError={false}
            onChange={(e) => dispatch(updateSubtask(1, e.target.value, false))}
            value={formDatas.subtasks[1].title}
          />
          <Button
            text="+ Add New Subtask"
            type="secondary"
            onClick={(e) => {
              e.preventDefault()
            }}
          />
        </fieldset>
        <Select
          currValue={formDatas.status}
          label="Status"
          choices={currentBoardcolumnsNames}
          onChoice={(choice) => dispatch(updateInput('status', choice))}
        />
        <Button text="Create Task" type="primary-s" onClick={handleSubmit} />
      </form>
    </Modal>
  )
}

export default ModalAddNewTask
