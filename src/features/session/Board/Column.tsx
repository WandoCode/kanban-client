import Task from './Task'
import { ColumnType, TaskType } from '../session.reducers'

interface Props {
  column: ColumnType
  handleOpenTask: (task: TaskType) => void
}

function Column({ column, handleOpenTask }: Props) {
  return (
    <div className="column">
      <div className="column__header">
        <div
          className="column__color"
          style={{ backgroundColor: column.color }}
        ></div>
        <h2 className="column__heading heading-s">
          {column.name} ({column.datas?.length})
        </h2>
      </div>
      {column.datas?.map((task) => (
        <Task task={task} key={task.title} openTask={handleOpenTask} />
      ))}
    </div>
  )
}

export default Column
