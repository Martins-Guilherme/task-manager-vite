import './AddTaskDialog.css'

import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import { LoaderCircle } from '../assets/icon/index'
import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const nodeRef = useRef(isOpen)
  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveClick = async () => {
    setIsLoading(true)

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
      return setIsLoading(false)
    }

    const task = { id: v4(), title, time, description, status: 'not_started' }
    const response = await fetch('http://localhost:3000/tasks/', {
      method: 'POST',
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      setIsLoading(false)
      return onSubmitError()
    }
    onSubmitSuccess(task)
    setIsLoading(false)
    handleClose()
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const timeError = errors.find((error) => error.inputName === 'time')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )

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
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Titulo"
                  placeholder="Insira o título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                />

                <TimeSelect ref={timeRef} errorMessage={timeError?.message} />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                />
                <div className="flex gap-3">
                  <Button size="small" className="w-full" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    color="primary"
                    className="w-full"
                    onClick={handleSaveClick}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <LoaderCircle className="animate-spin text-brand-dark-blue" />
                    )}
                    Salvar
                  </Button>
                </div>
              </div>
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
