import Button from './Button'
import AddIcon from '../assets/icon/add.svg?react'
import TrashIcon from '../assets/icon/trash.svg?react'
import SunIcon from '../assets/icon/sun.svg?react'
import MoonIcon from '../assets/icon/moon.svg?react'
import CloudSunIcon from '../assets/icon/cloud-sun.svg?react'
import TaskSeparator from './TasksSeparator'

const Tasks = () => {
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
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator tittle="Tarde" icon={<CloudSunIcon />} />
        </div>

        <div className="space-y-3">
          <TaskSeparator tittle="Noite" icon={<MoonIcon />} />
        </div>
      </div>
    </div>
  )
}

export default Tasks
