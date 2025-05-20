import './AddTaskDialog.css'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { LoaderCircle } from '../assets/icon/index'
import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationKey: 'addTask',
    mutationFn: async (task) => {
      const response = await fetch('http://localhost:3000/tasks/', {
        method: 'POST',
        body: JSON.stringify(task),
      })
      if (!response.ok) {
        throw new Error('Erro ao adicionar a tarefa')
      }
      return response.json()
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  })

  const nodeRef = useRef(isOpen)

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: data?.status || 'not_started',
    }

    mutate(task, {
      onSuccess: () => {
        queryClient.setQueryData('tasks', (oldTask) => {
          return [...oldTask, task]
        })
        handleClose()
        reset({
          title: '',
          time: 'morning',
          description: '',
        })
      },
      onError: () => {
        toast.error('Error ao adicionar a tarefa!')
      },
    })
  }

  const handleCancelClick = () => {
    reset({
      title: '',
      time: 'morning',
      description: '',
    })
    handleClose()
  }

  return (
    <CSSTransition
      in={isOpen}
      timeout={500}
      classNames={'add-task-dialog'}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            {/* Dialog */}
            <div className="bg-white rounded-xl p-5 text-center shadow">
              <h2 className="font-semibold text-brand-dark-gray">
                Nova tarefa
              </h2>
              <p className="my-1 mb-4 text-sm text-[#949c9f]">
                Insira as informações abaixo
              </p>
              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Titulo"
                  placeholder="Insira o título da tarefa"
                  disabled={isSubmitting}
                  errorMessage={errors?.title?.message}
                  {...register('title', {
                    required: 'O titulo é obrigatorio!',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O titulo não pode ser vazio!'
                      }
                      return true
                    },
                  })}
                />

                <TimeSelect
                  disabled={isSubmitting}
                  errorMessage={errors?.time?.message}
                  {...register('time', {
                    required: true,
                  })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  disabled={isSubmitting}
                  errorMessage={errors?.description?.message}
                  {...register('description', {
                    required: 'A descrição é obrigatoria!',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'A descrição não pode ser vazia!'
                      }
                      return true
                    },
                  })}
                />
                <div className="flex gap-3">
                  <Button
                    size="small"
                    className="w-full"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <LoaderCircle className="animate-spin text-brand-dark-blue" />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.protoTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default AddTaskDialog
