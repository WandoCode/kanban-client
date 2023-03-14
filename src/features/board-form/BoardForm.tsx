import React, { MouseEvent } from 'react'
import InputText from '../../components/atoms/Input/InputText'
import { useAppSelector, useAppDispatch } from '../app.store'
import Modal from '../modal/Modal'
import {
  updateInput,
  closeBoardFormModal,
  addColumn,
} from './boardForm.actions'
import InputWithCancel from '../../components/molecules/InputWithCancel'
import {
  removeColumn,
  updateColumnName,
  updateColumncolor,
} from './boardForm.actions'
import Button from '../../components/atoms/Button/Button'

const BoardForm = () => {
  const dispatch = useAppDispatch()
  const { isEditing, formDatas, formErrors } = useAppSelector(
    (state) => state.boardForm
  )

  const onChangeValue = (elIndex: number, name: string) => {
    dispatch(updateColumnName(elIndex, name))
  }

  const onChangeColor = (elIndex: number, color: string) => {
    dispatch(updateColumncolor(elIndex, color))
  }

  const handleRemoveColumn = (index: number) => {
    dispatch(removeColumn(index))
  }

  const handleAddColumn = () => {
    dispatch(addColumn())
  }

  const handleSubmit = () => {
    console.log(1)
  }
  return (
    <Modal closeModal={() => dispatch(closeBoardFormModal())}>
      <form className="board-form modal-add-task">
        <h2 className="heading-l">
          {isEditing ? 'Edit Board' : 'Add New Board'}
        </h2>
        <InputText
          placeholder="e.g. Web Design"
          label="Name"
          id="boardName"
          errorText="Incorrect value"
          hasError={formErrors.includes('boardName')}
          onChange={(e) => dispatch(updateInput('boardName', e.target.value))}
          value={formDatas.name}
        />
        <fieldset>
          <legend className="modal-add-task__subtasks-title text-bold fc-neutral-450">
            Board Columns
          </legend>

          {formDatas.columns.map((column, i) => (
            <InputWithCancel
              key={`column-${i}`}
              hasError={formErrors.includes(`column-${i}`)}
              onChangeValue={(name) => onChangeValue(i, name)}
              handleRemove={() => handleRemoveColumn(i)}
              placeholder={'e.g. Todo'}
              id={`subtask-${i}`}
              currentValue={column.name}
              withColorPicker={true}
              onChangeColor={(color) => onChangeColor(i, color)}
              currentColor={column.color}
            />
          ))}

          <Button
            text="+ Add New Column"
            type="secondary"
            onClick={handleAddColumn}
          />
        </fieldset>
        <Button
          text={isEditing ? 'Save Changes' : 'Create New Board'}
          type="primary-s"
          onClick={handleSubmit}
        />
      </form>
    </Modal>
  )
}

export default BoardForm
