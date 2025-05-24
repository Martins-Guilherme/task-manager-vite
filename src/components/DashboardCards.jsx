import { ListChecks, ListTasks, LoaderCircle, WaterIcon } from '../assets/icon'
import { useGetTasks } from '../hooks/data/use-get-tasks'
import DashboardCard from './DashboardCard'

const DashboardCards = () => {
  const { data: tasks } = useGetTasks()

  const notStartedTasks = tasks?.filter(
    (task) => task.status === 'not_started'
  ).length
  const inProgress = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length
  const completedTasks = tasks?.filter((task) => task.status === 'done').length

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="grid grid-cols-4 gap-9">
        <DashboardCard
          icon={<ListTasks />}
          mainText={tasks?.length}
          secondaryText="Tarefas totais"
        />
        <DashboardCard
          icon={<ListTasks />}
          mainText={notStartedTasks}
          secondaryText="Tarefas não iniciadas"
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
      </div>
    </div>
  )
}

export default DashboardCards
