import React, { MouseEvent } from 'react'
import InputText from '../../components/atoms/Input/InputText'
import { useAppSelector, useAppDispatch } from '../app.store'
import Modal from '../modal/Modal'
import {
  updateInput,
  closeBoardFormModal,
  addColumn,
  setErrors,
} from './boardForm.actions'
import InputWithCancel from '../../components/molecules/InputWithCancel'
import {
  removeColumn,
  updateColumnName,
  updateColumncolor,
} from './boardForm.actions'
import Button from '../../components/atoms/Button/Button'
import { ColumnType, BoardType } from '../board/boards.reducer'
import { v4 as uuidv4 } from 'uuid'
import { addBoardAndSave } from '../board/boards.thunk'
import { useEffect } from 'react'

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
    const invalidFields = validateForm()

    if (invalidFields.length !== 0) return dispatch(setErrors(invalidFields))
    else {
      dispatch(setErrors([]))

      if (!isEditing) {
        const boardId = uuidv4()
        const newBoard: BoardType = {
          id: boardId,
          name: formDatas.boardName,
          columns: formDatas.columns,
          tasks: [],
        }
        dispatch(addBoardAndSave(newBoard))
      } else {
        // dispatch(updateBoardAndSave(true))
      }
      onCloseModal()
    }
  }

  const validateForm = () => {
    const errors: string[] = []

    for (const fieldName in formDatas) {
      const element = formDatas[fieldName]
      if (fieldName === 'boardName' && element.length === 0)
        errors.push('boardName')
      if (fieldName === 'columns') {
        element.forEach((column: ColumnType, i: number) => {
          if (column.name.length === 0) errors.push(`column-${i}`)
        })
      }
    }

    return errors
  }

  const onCloseModal = () => {
    dispatch(closeBoardFormModal())
  }

  return (
    <Modal closeModal={onCloseModal}>
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
