import Button from './Button'
import AddIcon from '../assets/icon/add.svg?react'
import TrashIcon from '../assets/icon/trash.svg?react'
import SunIcon from '../assets/icon/sun.svg?react'
import MoonIcon from '../assets/icon/moon.svg?react'
import CloudSunIcon from '../assets/icon/cloud-sun.svg?react'
import TaskSeparator from './TasksSeparator'
import { useState } from 'react'
import TASKS from '../constants/tasks'
import TaskItem from './TaskItem'

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS)

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleTaskChekboxClick = (taskId) => {
    const newTask = tasks.map((task) => {
      if (task.id != taskId) {
        return task
      }
      if (task.status === 'not_started') {
        return { ...task, status: 'in_progress' }
      }
      if (task.status === 'in_progress') {
        return { ...task, status: 'done' }
      }
      if (task.status === 'done') {
        return { ...task, status: 'not_started' }
      }
      return task
    })
    setTasks(newTask)
  }

  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00adb5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
            <p>Adicionar tarefa</p>
            <AddIcon />
          </Button>
          <Button>
            <p>Limpar tarefas</p>
            <TrashIcon />
          </Button>
        </div>
      </div>

      {/* LISTA DE TAREFAS */}
      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator tittle="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskChekboxClick={handleTaskChekboxClick}
              />
            )
          })}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator tittle="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskChekboxClick={handleTaskChekboxClick}
              />
            )
          })}
        </div>

        <div className="space-y-3">
          <TaskSeparator tittle="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleTaskChekboxClick={handleTaskChekboxClick}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tasks
