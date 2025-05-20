import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderCircle, TrashIcon } from '../assets/icon'
import Button from './Button'

const TaskItem = ({ task, handleChekboxClick }) => {
  const queryClient = useQueryClient()
  const { mutate, isPending: deleteIsLoading } = useMutation({
    mutationKey: ['deleteTask', task.id],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: 'DELETE',
      })
      return response.json()
    },
  })

  const handleDeleteClick = async () => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.setQueryData('tasks', (currentTasks) => {
          return currentTasks.filter((oldTasks) => {
            return oldTasks.id != task.id
          })
        })
        toast.success('Tarefa deletada com sucesso!')
      },
      onError: () => {
        toast.error('Error ao deletar a tarefa!')
      },
    })
  }

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary text-brand-primary'
    }
    if (task.status === 'in_progress') {
      return 'bg-brand-process text-brand-process'
    }
    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue'
    }
    return 'bg-brand-dark-blue'
  }
  return (
    <div
      className={`item-center rounde-lg flex justify-between gap-2 bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleChekboxClick(task.id)}
          />

          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderCircle className="animate-spin text-brand-light-gray" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderCircle className="animate-spin text-brand-dark-blue" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>

        <Link to={`/task/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleChekboxClick: PropTypes.func.isRequired,
}
export default TaskItem
