<script setup lang="ts">
import type { TNews } from '../../types/types-news'

defineProps<{
  news: TNews
}>()
</script>

<template>
  <div class="bg-neutral-100 flex rounded-md gap-2 p-1 shadow">
    <p class="text-ellipsis text-nowrap text-2xl grow text-neutral-700 font-bold">
      {{ news.title }}
    </p>
  </div>
</template>
