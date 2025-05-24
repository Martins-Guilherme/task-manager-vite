import DashboardCards from '../components/DashboardCards'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import TaskItem from '../components/TaskItem'
import { useGetTasks } from '../hooks/data/use-get-tasks'

function HomePage() {
  const { data: tasks } = useGetTasks()

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-3 px-8 py-8">
        <Header subtitle="Dashboard" title="Dashboard" />
        <DashboardCards />

        <div className="grid grid-cols-[2.5fr,2fr] gap-6">
          <div className="rounded-[10] bg-brand-white p-3">
            <div>
              <h3>Tarefas</h3>
              <span className="text-sm text-brand-dark-gray">
                Resumo das tarefas disponiveis
              </span>
            </div>

            <div className="mt-2 space-y-2">
              {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center space-y-6 rounded-[10] bg-brand-white p-6">
            <p className="text-center text-brand-dark-gray">
              Acredite em si mesmo e em tudo que você é. Saiba que existe algo
              dentro de você que é maior do que qualquer obstáculo.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
