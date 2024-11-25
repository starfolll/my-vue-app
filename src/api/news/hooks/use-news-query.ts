import { useQuery } from '@tanstack/vue-query'
import { newsFetch } from '../news-fetch'
import { newsFetchOptions } from '../news-fetch-options'

export function useNewsQuery() {
  return useQuery({
    queryKey: newsFetchOptions.queryKey,
    queryFn: newsFetch,

    refetchOnWindowFocus: false,
  })
}
