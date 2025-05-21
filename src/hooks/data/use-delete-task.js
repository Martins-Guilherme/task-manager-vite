import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      const deletedTask = await response.json()
      return deletedTask
    },
    onSuccess: (deletedTask) => {
      queryClient.setQueryData('tasks', (currentTasks) => {
        return currentTasks.filter((oldTasks) => {
          return oldTasks.id != deletedTask.id
        })
      })
    },
  })
}
