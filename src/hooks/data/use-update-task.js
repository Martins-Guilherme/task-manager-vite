import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutation'
import { taskQueryKeys } from '../../keys/queries'
import { api } from '../../lib/axios'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.update(taskId),
    mutationFn: async (newTask) => {
      const { data: updatedTask } = api.patch(`/tasks/${taskId}`, {
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        time: newTask.time,
      })

      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        if (!Array.isArray(oldTasks)) {
          return [updatedTask]
        }
      })
      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updatedTask)
      return updatedTask
    },
    onSuccess: () => {
      queryClient.invalidateQueries(taskQueryKeys.getAll())
      queryClient.invalidateQueries(taskQueryKeys.getOne(taskId))
    },
  })
}
