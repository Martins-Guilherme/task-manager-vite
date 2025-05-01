import PropTypes from 'prop-types'

const TaskSeparator = ({ tittle, icon }) => {
  return (
    <div className="flex gap-2 border-b border-solid border-[#F4F4F5] pb-1">
      {icon}
      <p className="text-sm text-brand-text-gray"> {tittle} </p>
    </div>
  )
}

TaskSeparator.propsTypes = {
  tittle: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
}

export default TaskSeparator
