import Task from './Task'
import { ColumnType, TaskType } from '../boards.reducer'

interface Props {
  tasks: TaskType[]
  columnDetails: ColumnType
  handleOpenTask: (task: TaskType, taskIndex: number) => void
}

function Column({ tasks, columnDetails, handleOpenTask }: Props) {
  return (
    <div className="column">
      <div className="column__header">
        <div
          className="column__color"
          style={{ backgroundColor: columnDetails.color }}
        ></div>
        <h2 className="column__heading heading-s">
          {columnDetails.name} ({tasks?.length || 0})
        </h2>
      </div>
      {tasks?.map((task, i) => (
        <Task
          taskIndex={i}
          task={task}
          key={task.title}
          openTask={handleOpenTask}
        />
      ))}
    </div>
  )
}

export default Column
