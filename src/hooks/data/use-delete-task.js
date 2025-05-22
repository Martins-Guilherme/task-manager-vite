import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutation'
import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useDeleteTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`)
      return deletedTask
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTask) => {
        return oldTask.filter((task) => {
          return task.id != taskId
        })
      })
    },
  })
}
