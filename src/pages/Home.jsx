import { ListChecks, ListTasks, LoaderCircle, WaterIcon } from '../assets/icon'
import DashboardCard from '../components/DashboardCard'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { useGetTasks } from '../hooks/data/use-get-tasks'

function HomePage() {
  const { data: tasks } = useGetTasks()

  const inProgress = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length
  const completedTasks = tasks?.filter((task) => task.status === 'done').length

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Dashboard" title="Dashboard" />
        <div className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<ListTasks />}
            mainText={tasks?.length}
            secondaryText="Tarefas disponiveis"
          />
          <DashboardCard
            icon={<ListChecks />}
            mainText={completedTasks}
            secondaryText="Tarefas concluidas"
          />
          <DashboardCard
            icon={<LoaderCircle />}
            mainText={inProgress}
            secondaryText="Tarefas em andamento"
          />
          <DashboardCard
            icon={<WaterIcon />}
            mainText="40%"
            secondaryText="Água"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
