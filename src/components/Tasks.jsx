import { useMemo } from 'react'

import { CloudSunIcon, MoonIcon, SunIcon } from '../assets/icon'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import Header from './Header'
import TaskItem from './TaskItem'
import TaskSeparator from './TasksSeparator'

const Tasks = () => {
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

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header title="Minhas Tarefas" subtitle="Tarefas" />
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
            return <TaskItem key={task.id} task={task} />
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
            return <TaskItem key={task.id} task={task} />
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
            return <TaskItem key={task.id} task={task} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Tasks
