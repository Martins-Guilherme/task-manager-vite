const TaskSeparator = ({ tittle, icon }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-[#F4F4F5] pb-1">
      {icon}
      <p className="text-sm text-[#9a9c9f]"> {tittle} </p>
    </div>
  )
}

export default TaskSeparator
