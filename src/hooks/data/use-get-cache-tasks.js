import { useQuery } from '@tanstack/react-query'

export const useGetCacheTasks = (reset, taskId) => {
  return useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      reset(data)
    },
  })
}
