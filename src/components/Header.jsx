import PropTypes from 'prop-types'
import { useState } from 'react'

import { AddIcon, TrashIcon } from '../assets/icon'
import AddTaskDialog from './AddTaskDialog'
import Button from './Button'

function Header({ title, subtitle }) {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState()

  return (
    <>
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            {subtitle}
          </span>
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            <p>Limpar tarefas</p>
            <TrashIcon />
          </Button>

          {/* Temos duas formas de setar um estado, uma por função e outra diretamente na linha de código. */}
          <Button color="primary" onClick={() => setAddTaskDialogIsOpen(true)}>
            <p>Adicionar tarefa</p>
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </div>
    </>
  )
}
// title, subtitle
Header.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node.isRequired,
}

export default Header
