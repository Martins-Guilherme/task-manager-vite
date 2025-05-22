import { useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { toast } from 'sonner'

import { CloudSunIcon, MoonIcon, SunIcon } from '../assets/icon'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import Header from './Header'
import TaskItem from './TaskItem'
import TaskSeparator from './TasksSeparator'

const Tasks = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTasks()

  const morningTasks = useMemo(
    () => tasks?.filter((task) => task.time === 'morning') || [],
    [tasks]
  )
  const afternoonTasks = useMemo(
    () => tasks?.filter((task) => task.time === 'afternoon') || [],
    [tasks]
  )
  const eveningTasks = useMemo(
    () => tasks?.filter((task) => task.time === 'evening') || [],
    [tasks]
  )

  const handleTaskChekboxClick = useCallback(
    (taskId) => {
      // Usar a query key correta (provavelmente um array) e a forma funcional de setQueryData
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        if (!oldTasks) return [] // Lidar com o caso de cache vazio

        return oldTasks.map((task) => {
          if (task.id !== taskId) {
            // Usar igualdade estrita
            return task
          }

          let newStatus = task.status
          let toastMessage = ''

          switch (task.status) {
            case 'not_started':
              newStatus = 'in_progress'
              toastMessage = 'Tarefa iniciada com sucesso!'
              break
            case 'in_progress':
              newStatus = 'done'
              toastMessage = 'Tarefa finalizada com sucesso!'
              break
            case 'done':
              newStatus = 'not_started'
              toastMessage = 'Tarefa reaberta com sucesso!'
              break
            default:
              // Status desconhecido, não fazer nada ou logar um erro
              console.warn(
                `Status de tarefa desconhecido: ${task.status} para a tarefa ${task.id}`
              )
              return task // Retornar a tarefa original
          }

          toast.success(toastMessage)
          return { ...task, status: newStatus }
        })
      })
    },
    [queryClient]
  )

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas tarefas" title="Minhas tarefas" />

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
