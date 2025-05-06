import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderCircle,
  TrashIcon,
} from '../assets/icon'
import Button from '../components/Button'
import Input from '../components/Input'
import Sidebar from '../components/Sidebar'
import TimeSelect from '../components/TimeSelect'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleBackPage = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })

      const data = await response.json()
      setTask(data)
      reset(data)
    }

    fetchTask()
  }, [taskId, reset])

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      }),
    })
    if (!response.ok) {
      return toast.error('Erro ao salvar a alteração da tarefa!')
    }
    const newTask = await response.json()
    setTask(newTask)
    toast.success('Tarefa salva com sucesso!')
  }

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      return toast.error('Erro ao deletar a tarefa!')
    }
    toast.success('Tarefa deletada com sucesso!')
    navigate('/')
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* Barra do topo da tela de detalhes da tarefa */}
        <div className="flex w-full justify-between">
          {/* lado esquerdo da tela de detalhes da tarefa */}
          <div>
            <button
              onClick={handleBackPage}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link to="/" className="text-brand-text-gray">
                Minhas tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* lado direito da tela de detalhes da tarefa */}
          <Button
            onClick={handleDeleteClick}
            className="h-fit self-end"
            color="danger"
            disabled={isSubmitting}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          {/* Conteúdo da tela de detalhes da tarefa */}
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título da tarefa"
                {...register('title', {
                  required: 'O título é obrigatório!',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode estar vazio!'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                id="time"
                {...register('time', {
                  required: 'O horário é obrigatório!',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O time não pode estar vazio!'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição da tarefa"
                {...register('description', {
                  required: 'A descrição é obrigatória!',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode estar vazia!'
                    }
                    return true
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          {/* Botão de salvar alterações */}
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting && (
                <LoaderCircle className="animate-spin text-brand-dark-blue" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
