import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icon'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'
import TaskItem from './TaskItem'
import TaskSeparator from './TasksSeparator'

const Tasks = () => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // Pegando os dados da API, e atualizar o state tasks em modo asincrono, porem não pode ser
    // feito dentro do metodo useEffect, por isso é criado uma nova função sendo a função assincrona.
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      })
      const tasks = await response.json()
      // Apos pegar os dados é atualizado o estado setTasks.
      setTasks(tasks)
    }
    // Executando a função assincrona
    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks.filter((task) => task.time === 'evening')

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(false)
  }

  const handleTaskDeleteClick = async (taskId) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      return toast.error('Erro ao remover a tarefa, tente novamente.')
    }
    const newTasks = tasks.filter((task) => {
      return task.id != taskId
    })
    setTasks(newTasks)
    toast.success('Tarefa removida com sucesso!!!')
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
    setTasks(newTask)
  }

  const handleAddTaskSubmit = async (task) => {
    // Chamar a  API para atualizar os dados de acordo com o que foi adicionado na tarefa.
    const response = await fetch('http://localhost:3000/tasks/', {
      method: 'POST',
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      return toast.error(
        'Erro ao adicionar a tarefa. Por favor, tente novamente.'
      )
    }

    setTasks([...tasks, task])
    toast.success('Tarefa adicionada com sucesso!')
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

          {/* Temos duas formas de setar um estado, uma por função e outrra diretamente na kinha di código. */}
          <Button color="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
            <p>Adicionar tarefa</p>
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={handleDialogClose}
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      {/* LISTA DE TAREFAS */}
      <div className="bg-white rounded-xl p-6">
        <div className="space-y-3">
          <TaskSeparator tittle="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => {
            return (
              <TaskItem
                key={task.id}
                task={task}
                handleChekboxClick={handleTaskChekboxClick}
                handleDeleteClick={handleTaskDeleteClick}
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
                handleChekboxClick={handleTaskChekboxClick}
                handleDeleteClick={handleTaskDeleteClick}
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
                handleChekboxClick={handleTaskChekboxClick}
                handleDeleteClick={handleTaskDeleteClick}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tasks
