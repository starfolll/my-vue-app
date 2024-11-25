import type { TArtwork } from '../../../types/types-artwork'

export function artworkGetImageUrl(artwork: TArtwork['image_id']) {
  return `https://www.artic.edu/iiif/2/${artwork}/full/200,/0/default.jpg`
}
