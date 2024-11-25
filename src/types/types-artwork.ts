export type TArtworkThumbnail = {
  lqip: string
  width: number
  height: number
  alt_text: string
}

export type TArtwork = {
  id: number

  title?: string
  description?: string | null

  image_id?: string | null
  thumbnail?: TArtworkThumbnail | null
}

export type TArtworksPage = {
  pagination: {
    current_page: number
  }

  data: TArtwork[]
}
