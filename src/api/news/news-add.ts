import { sleep } from '../../utils/sleept'
import { newsFetchOptions } from './news-fetch-options'
import { newsMock } from './news-mock'
import { newsGenerateFake } from './utils/news-generate-fake'

export async function newsAdd() {
  await sleep(newsFetchOptions.fakeDelay)

  const randomNew = newsGenerateFake()

  // emulate server-side creation
  sleep(300).then(() => newsMock.push(randomNew))

  return randomNew
}
