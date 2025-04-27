import { createPortal } from 'react-dom'

import Button from './Button'
import Input from './Input'

const AddTaskDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null
  return createPortal(
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur">
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
          <Input id="time" label="Horario" placeholder="horário" />
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
  )
}

export default AddTaskDialog
