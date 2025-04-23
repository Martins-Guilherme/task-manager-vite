import SidebarButton from './SidebarButton'
import HomeIcon from '../assets/icon/home.svg?react'
import ListChecks from '../assets/icon/list-checks.svg?react'

function Sidebar() {
  return (
    <>
      <div className="h-screen w-64 bg-white">
        <div className="space-y-6 px-8 py-6">
          <h1 className="text-xl font-semibold text-[#00adb5]">Task manager</h1>
          <p>
            Simples{' '}
            <span className="text-[#00adb5]">organizador de tarefas</span>
          </p>
        </div>

        <div className="flex flex-col p-2">
          <SidebarButton variant="unselected">
            <HomeIcon className="text-red-400" />
            Início
          </SidebarButton>
          <SidebarButton variant="selected">
            <ListChecks className="text-red-400" />
            Minhas tarefas
          </SidebarButton>
        </div>
      </div>
    </>
  )
}

export default Sidebar
