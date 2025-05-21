import { HomeIcon, ListChecks } from '../assets/icon/'
import SidebarButton from './SidebarButton'

function Sidebar() {
  return (
    <>
      <div className="bg-white h-screen w-72 min-w-72 bg-brand-white">
        <div className="space-y-6 px-8 py-6">
          <h1 className="text-xl font-semibold text-brand-primary">
            Task manager
          </h1>
          <p>
            Um Simples{' '}
            <span className="text-brand-primary">organizador de tarefas</span>
          </p>
        </div>

        <div className="ml-8 flex flex-col p-2">
          <SidebarButton to="/">
            <HomeIcon />
            Início
          </SidebarButton>
          <SidebarButton to="/tasks">
            <ListChecks />
            Minhas tarefas
          </SidebarButton>
        </div>
      </div>
    </>
  )
}

export default Sidebar
