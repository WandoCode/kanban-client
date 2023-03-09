import Button from '../../atoms/Button/Button'
import Select from '../../atoms/Select/Select'
import Modal from '../../utils/Modal'
import { useAppSelector, useAppDispatch } from '../../../features/app.store'
import InputText from '../../atoms/Input/InputText'
import {
  updateInput,
  updateSubtask,
} from '../../../features/add-new-task/addNewTask.actions'
import Textarea from '../../atoms/Input/Textarea'
import { useEffect } from 'react'
import {
  setChoices,
  closeAddNewTaskModal,
} from '../../../features/add-new-task/addNewTask.actions'

function ModalAddNewTask() {
  const dispatch = useAppDispatch()
  const { formDatas, choices } = useAppSelector((state) => state.addNewTask)
  const { columnsNames } = useAppSelector((state) => state.board)

  useEffect(() => {
    document.body.addEventListener('click', handleCloseModal)

    return () => document.body.removeEventListener('click', handleCloseModal)
  }, [])

  useEffect(() => {
    const choices = columnsNames.map((name) => {
      return {
        text: name,
        value: name.toLowerCase(),
      }
    })

    dispatch(setChoices(choices))
  }, [columnsNames])

  const handleCloseModal = (e: MouseEvent) => {
    const target = e.target as HTMLElement

    if (target.classList.contains('modal')) dispatch(closeAddNewTaskModal())
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
          <legend>Subtasks</legend>

          <InputText
            placeholder="e.g. Make coffee"
            label="subtask-0"
            showLabel={false}
            id="subtask-0"
            errorText="Incorrect value"
            hasError={false}
            onChange={(e) => dispatch(updateSubtask(0, e.target.value))}
            value={formDatas.subtasks[0]}
          />
          <InputText
            placeholder="e.g. Drink coffee & smile"
            label="subtask-1"
            showLabel={false}
            id="subtask-1"
            errorText="Incorrect value"
            hasError={false}
            onChange={(e) => dispatch(updateSubtask(1, e.target.value))}
            value={formDatas.subtasks[1]}
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
          choices={choices}
          onChoice={(choice) => dispatch(updateInput('status', choice))}
        />
        <Button
          text="Create Task"
          type="primary-s"
          onClick={(e) => {
            e.preventDefault()
          }}
        />
      </form>
    </Modal>
  )
}

export default ModalAddNewTask
