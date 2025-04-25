import CheckIcon from '../assets/icon/check.svg?react'
import LoaderCircle from '../assets/icon/loader-circle.svg?react'
import DetailsIcon from '../assets/icon/detailsIcon.svg?react'

const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00adb5] text-[#00adb5]'
    }
    if (task.status === 'in_progress') {
      return 'bg-[#ffaa04] text-[#ffaa04]'
    }
    if (task.status === 'not_started') {
      return 'bg-[#35383e] bg-opacity-10 text-[#35383e]'
    }
    return 'bg-[#35383e]'
  }
  return (
    <div
      className={`item-center rounde-lg flex justify-between gap-2 bg-opacity-10 px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />

          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderCircle className="animate-spin" />
          )}
        </label>
        {task.title}
      </div>
      <a
        href="#"
        className="flex items-center gap-2 transition-opacity hover:opacity-75"
      >
        <DetailsIcon />
      </a>
    </div>
  )
}

export default TaskItem
