import { ColumnType } from '../../../features/board/board.reducers'
import Task from './Task'

interface Props {
  column: ColumnType
}

function Column({ column }: Props) {
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
        <Task task={task} key={task.position} />
      ))}
    </div>
  )
}

export default Column
