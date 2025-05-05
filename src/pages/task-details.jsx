import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })

      const data = await response.json()
      setTask(data)
    }

    fetchTask()
  }, [taskId])

  return (
    <div>
      <h1>Task Details Page</h1>
      <p>Task ID: {task?.id}</p>
      <p>Task Title: {task?.title}</p>
      <p>Task Description: {task?.description}</p>
      <p>Task Status: {task?.status}</p>
    </div>
  )
}

export default TaskDetailsPage
