import { useInfiniteQuery } from '@tanstack/vue-query'
import { artworksFetch } from '../artworks-fetch'
import { artworksFetchOptions } from '../artworks-fetch-options'

export function useArtworksInfinite() {
  return useInfiniteQuery({
    queryKey: artworksFetchOptions.queryKey,
    initialPageParam: artworksFetchOptions.initialPageParam,

    queryFn: artworksFetch,
    refetchOnWindowFocus: false,

    getPreviousPageParam: (_, __, lastPageParam) => lastPageParam - 1,
    getNextPageParam: (_, __, lastPageParam) => lastPageParam + 1,
  })
}
