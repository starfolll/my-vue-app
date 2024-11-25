import type { TNews } from '../../../types/types-news'

const randomNewsNames = [
  'Breaking',
  'Local',
  'World',
  'Sports',
  'Weather',
  'Entertainment',
  'Politics',
  'Tech',
  'Science',
]
const getRadomNewsName = () => randomNewsNames[Math.floor(Math.random() * randomNewsNames.length)]

export function newsGenerateFake(): TNews {
  return {
    id: crypto.randomUUID(),
    title: getRadomNewsName(),
  }
}
