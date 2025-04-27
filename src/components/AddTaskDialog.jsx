import './AddTaskDialog.css'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import Button from './Button'
import Input from './Input'
import TimeSelect from './TimeSelect'

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const nodeRef = useRef(isOpen)

  const [title, setTitle] = useState()
  const [time, setTime] = useState('morning')
  const [description, setDescription] = useState()

  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setTime('morning')
      setDescription('')
    }
  }, [isOpen])

  const handleSaveClick = () => {
    if (!title.trim() || !description.trim())
      return alert('Preencha todos os campos')

    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: 'not_started',
    })
    handleClose()
  }

  return (
    <>
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
              <div className="rounded-xl bg-white p-5 text-center shadow">
                <h2 className="font-semibold text-[#35383E]">Nova tarefa</h2>
                <p className="my-1 mb-4 text-sm text-[#949c9f]">
                  Insira as informações abaixo
                </p>
                <div className="flex w-[336px] flex-col space-y-4">
                  <Input
                    id="title"
                    label="Titulo"
                    placeholder="Insira o título da tarefa"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value)
                    }}
                  />

                  {/* <Input id="time" label="Horario" placeholder="horário" /> */}
                  <TimeSelect
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />

                  <Input
                    id="description"
                    label="Descrição"
                    placeholder="Descreva a tarefa"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value)
                    }}
                  />
                  <div className="flex gap-3">
                    <Button
                      size="small"
                      className="w-full"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      Cancelar
                    </Button>
                    <Button
                      size="large"
                      className="w-full"
                      onClick={handleSaveClick}
                    >
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
    </>
  )
}

export default AddTaskDialog
