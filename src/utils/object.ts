import { BoardsDatasType, TaskType } from '../features/board/boards.reducer'
export const getBoardsProperties = (
  boards: BoardsDatasType,
  currenBoardId: string
) => {
  const currentBoard = boards[currenBoardId]

  const columns = currentBoard.columns
  const columnsNames = columns.map((col) => col.name)
  const columnsArrayByStatus = getColumnsArrayByStatus(currentBoard.tasks)

  return { columns, columnsNames, columnsArrayByStatus }
}

export const getColumnsArrayByStatus = (tasks: TaskType[]) => {
  let rep: Record<string, TaskType[]> = {}

  tasks.forEach((task) => {
    const column = task.status

    if (!rep[column]) rep[column] = []
    rep[column].push(task)
  })

  return rep
}
