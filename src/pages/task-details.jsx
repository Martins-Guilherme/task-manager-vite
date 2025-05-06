import { useEffect, useRef, useState } from 'react'
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
  const [task, setTask] = useState()

  const navigate = useNavigate()

  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

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
    }

    fetchTask()
  }, [taskId])

  const handleSaveClick = async () => {
    setSaveIsLoading(true)
    console.log(task)

    const newErrors = []
    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatorio!',
      })
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatorio!',
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatoria!',
      })
    }
    setErrors(newErrors)
    if (newErrors.length > 0) {
      return setSaveIsLoading(false)
    }
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    })
    if (!response.ok) {
      toast.error('Erro ao salvar a alteração da tarefa!')
      return setSaveIsLoading(false)
    }
    const newTask = await response.json()
    setTask(newTask)
    setSaveIsLoading(false)
    toast.success('Tarefa salva com sucesso!')
  }
  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>
        {/* Conteúdo da tela de detalhes da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título da tarefa"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>
          <div>
            <TimeSelect
              id="time"
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição da tarefa"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>
        {/* Botão de salvar alterações */}
        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && (
              <LoaderCircle className="animate-spin text-brand-dark-blue" />
            )}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
