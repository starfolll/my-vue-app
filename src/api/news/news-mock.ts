import { newsGenerateFake } from './utils/news-generate-fake'

export const newsMock = Array.from({ length: 6 }, () => newsGenerateFake())
