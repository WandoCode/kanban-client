import { useAppSelector } from './app.store'

const useGetAppState = () => {
  const state = useAppSelector((state) => state)

  return {
    // Sidebar states
    menuIsOpen: state.sidebar.menuIsOpen,

    // taskDetails states
    taskDetailsModalIsOpen: state.taskDetails.taskDetailsModalIsOpen,
    task: state.taskDetails.task,

    // TaskForm states
    taskFormDatas: state.taskForm.taskFormDatas,
    isEditingTaskForm: state.taskForm.isEditingTaskForm,
    taskFormErrors: state.taskForm.taskFormErrors,
    taskFormModalIsOpen: state.taskForm.taskFormModalIsOpen,

    // Menus states
    miscMenuIsOpen: state.menus.miscMenuIsOpen,
    taskMenuIsOpen: state.menus.taskMenuIsOpen,

    // Boards states
    boards: state.boards.boards,
    currentBoardId: state.boards.currentBoardId,
    columnsArrayByStatus: state.boards.columnsArrayByStatus,
    currentColumnsNames: state.boards.currentColumnsNames,
    currentColumns: state.boards.currentColumns,

    //BoardForm states
    isEditing: state.boardForm.isEditing,
    formDatas: state.boardForm.formDatas,
    formErrors: state.boardForm.formErrors,
    boardFormModalIsOpen: state.boardForm.boardFormModalIsOpen,

    // Sessions states
    boardsShort: state.session.boardsShort,
    userID: state.session.userID,

    // ConfirmDelete states
    confirmDeleteIsOpen: state.confirmDelete.confirmDeleteIsOpen,
    type: state.confirmDelete.type,
  }
}

export default useGetAppState
