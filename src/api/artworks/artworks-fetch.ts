import type { TArtworksPage } from '../../types/types-artwork'
import { artworksFetchOptions } from './artworks-fetch-options'

export async function artworksFetch({ pageParam }: {
  pageParam: number
}): Promise<TArtworksPage> {
  const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${pageParam}&limit=${artworksFetchOptions.itemsPerPage}&fields=id,title,description,image_id,thumbnail`)
  const data = await response.json()

  return data
}
