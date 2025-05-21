import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icon'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'
import TaskItem from './TaskItem'
import TaskSeparator from './TasksSeparator'

const Tasks = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState()

  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(false)
  }

  const handleTaskChekboxClick = (taskId) => {
    const newTask = tasks.map((task) => {
      if (task.id != taskId) {
        return task
      }
      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!')
        return { ...task, status: 'in_progress' }
      }
      if (task.status === 'in_progress') {
        toast.success('Tarefa finalizada com sucesso!')
        return { ...task, status: 'done' }
      }
      if (task.status === 'done') {
        toast.success('Tarefa reaberta com sucesso!')
        return { ...task, status: 'not_started' }
      }
      return task
    })
    queryClient.setQueryData('tasks', newTask)
  }
  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            <p>Limpar tarefas</p>
            <TrashIcon />
          </Button>

          {/* Temos duas formas de setar um estado, uma por função e outra diretamente na linha de código. */}
          <Button color="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
            <p>Adicionar tarefa</p>
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={handleDialogClose}
          />
        </div>
      </div>

      {/* LISTA DE TAREFAS */}
      <div className="bg-white rounded-xl p-6">
        <div className="space-y-3">
          <TaskSeparator tittle="Manhã" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da manhã.
            </p>
          )}
          {morningTasks?.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleChekboxClick={handleTaskChekboxClick}
              />
            )
          })}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator tittle="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da tarde.
            </p>
          )}
          {afternoonTasks?.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleChekboxClick={handleTaskChekboxClick}
              />
            )
          })}
        </div>

        <div className="space-y-3">
          <TaskSeparator tittle="Noite" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o período da noite.
            </p>
          )}
          {eveningTasks?.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleChekboxClick={handleTaskChekboxClick}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tasks
