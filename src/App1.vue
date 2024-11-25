<script setup lang="ts">
import ArtworkScroll from './components/artwork/artworks-scroll.vue'
import NewsScroll from './components/news/news-scroll.vue'
</script>

<template>
  <main class="flex gap-4 max-w-4xl w-full">
    <!-- please see this component for more information and core implementation -->
    <ArtworkScroll class="grow" />

    <!-- please see this component for more information and core implementation -->
    <NewsScroll />
  </main>
</template>
