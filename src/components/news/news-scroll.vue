<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import { useGenerateNewsMutation } from '../../api/news/hooks/use-generate-news-mutation'
import { useNewsQuery } from '../../api/news/hooks/use-news-query'
import { newsFetchOptions } from '../../api/news/news-fetch-options'
import { newsGenerateFake } from '../../api/news/utils/news-generate-fake'
import News from './news.vue'

const queryClient = useQueryClient()

const { data, error, status, refetch: refetchNews } = useNewsQuery()

const { mutate } = useGenerateNewsMutation(queryClient)

function reloadNews() {
  queryClient.removeQueries({ queryKey: newsFetchOptions.queryKey })
  refetchNews()
}

function addNewNews() {
  mutate(newsGenerateFake())
}
</script>

<template>
  <section class="flex flex-col py-4 gap-4">
    <button
      :disabled="status === 'pending'"
      class="bg-primary-500 disabled:opacity-25 bg-neutral-900 text-white rounded-md p-2"
      @click="reloadNews"
    >
      Reload news
    </button>

    <div v-if="status === 'pending'">
      Loading...
    </div>
    <div v-else-if="status === 'error'">
      Error: {{ error }}
    </div>

    <div
      v-else-if="status === 'success'"
      class="flex flex-col gap-4"
    >
      <News
        v-for="news in data"
        :key="news.id"
        class="bg-neutral-100 flex rounded-md gap-2 p-1 shadow"
        :news="news"
      />
    </div>

    <button
      :disabled="status === 'pending'"
      class="bg-primary-500 disabled:opacity-25 bg-neutral-900 text-white rounded-md p-2"
      @click="addNewNews"
    >
      Add news
    </button>
  </section>
</template>
