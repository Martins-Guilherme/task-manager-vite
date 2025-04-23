import SidebarButton from './SidebarButton'

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
          <SidebarButton variant="unselected">Início</SidebarButton>
          <SidebarButton variant="selected">Minhas tarefas</SidebarButton>
        </div>
      </div>
    </>
  )
}

export default Sidebar
