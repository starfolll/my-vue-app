import type { QueryClient } from '@tanstack/vue-query'
import type { TNews } from '../../../types/types-news'
import { useMutation } from '@tanstack/vue-query'
import { newsAdd } from '../news-add'
import { newsFetchOptions } from '../news-fetch-options'

export function useGenerateNewsMutation(queryClient: QueryClient) {
  return useMutation({
    mutationFn: newsAdd,

    onMutate: async (newNews: TNews) => {
      await queryClient.cancelQueries({ queryKey: newsFetchOptions.queryKey })

      const previousNews = queryClient.getQueryData(newsFetchOptions.queryKey)

      queryClient.setQueryData(newsFetchOptions.queryKey, (old: TNews[]) => [...old, newNews])

      return { previousNews }
    },

    onError: (err, _, context) => {
      console.error(err)
      queryClient.setQueryData(newsFetchOptions.queryKey, context?.previousNews)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: newsFetchOptions.queryKey })
    },
  })
}
