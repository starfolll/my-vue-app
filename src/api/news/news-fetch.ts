import type { TNews } from '../../types/types-news'
import { sleep } from '../../utils/sleept'
import { newsFetchOptions } from './news-fetch-options'
import { newsMock } from './news-mock'

export async function newsFetch(): Promise<TNews[]> {
  await sleep(newsFetchOptions.fakeDelay)

  return newsMock
}
