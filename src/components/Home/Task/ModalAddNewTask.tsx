import Button from '../../atoms/Button/Button'
import Select from '../../atoms/Select/Select'
import Modal from '../../utils/Modal'
import { useAppSelector } from '../../../features/app.store'
import InputText from '../../atoms/Input/InputText'

function ModalAddNewTask() {
  const { columnsNames } = useAppSelector((state) => state.board)

  const statusChoices = () => {
    return columnsNames.map((name) => {
      return { text: name, value: name.toLowerCase() }
    })
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
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="e.g. Take coffee break"
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little."
        />
        <fieldset>
          <legend>Subtasks</legend>
          <label htmlFor="subtask-1"></label>
          <input
            type="text"
            name="subtask-1"
            id="subtask-1"
            placeholder="e.g. Make coffee"
          />
          <label htmlFor="subtask-2"></label>
          <input
            type="text"
            name="subtask-2"
            id="subtask-2"
            placeholder="e.g. Drink coffee & smile"
          />
        </fieldset>
        <Button
          text="+ Add New Subtask"
          type="secondary"
          onClick={(e) => {
            e.preventDefault()
          }}
        />
        <Select
          currValue="todo"
          label="Status"
          choices={statusChoices()}
          onChoice={() => {}}
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
