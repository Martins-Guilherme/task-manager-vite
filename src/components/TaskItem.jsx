const TaskItem = ({ task }) => {
  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-[#00adb5] bg-opacity-10 text-[#00adb5]'
    }
    if (task.status === 'in_progress') {
      return 'bg-[#ffaa04] bg-opacity-10 text-[#ffaa04]'
    }
    if (task.status === 'not_started') {
      return 'bg-[#35383e] bg-opacity-10 text-[#35383e]'
    }
    return 'bg-[#35383e] bg-opacity-10'
  }
  return (
    <div
      className={`item-center rounde-lg flex gap-3 px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      {task.title}
    </div>
  )
}

export default TaskItem
