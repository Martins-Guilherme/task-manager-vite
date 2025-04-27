import './AddTaskDialog.css'

import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import Button from './Button'
import Input from './Input'
import InputLabel from './InputLabel'

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const nodeRef = useRef(isOpen)

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
                  />

                  {/* <Input id="time" label="Horario" placeholder="horário" /> */}
                  <div className="flex flex-col gap-1 text-left">
                    <InputLabel htmlFor="time">Hoŕario</InputLabel>
                    <select
                      id="time"
                      className="rounded-lg border border-solid border-[#ececec] px-4 py-3 text-[#9a9c9f] placeholder:text-sm"
                    >
                      <option value="morning">Manhã</option>
                      <option value="afternoon">Tarde</option>
                      <option value="evening">Noite</option>
                    </select>
                  </div>

                  <Input
                    id="description"
                    label="Descrição"
                    placeholder="Descreva a tarefa"
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
                    <Button size="large" className="w-full">
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
