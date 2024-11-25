<script setup lang="ts">
import type { TArtwork } from '../../types/types-artwork'
import { onMounted, ref } from 'vue'
import { artworkGetImageUrl } from '../../api/artworks/utils/artworks-get-image-url'

defineProps<{
  artwork: TArtwork
}>()

const isImageLoaded = ref(false)
const imageRef = ref<HTMLImageElement>()

function addImageLoadedListener() {
  imageRef.value?.addEventListener('load', () => isImageLoaded.value = true)
}

onMounted(() => {
  addImageLoadedListener()
})
</script>

<template>
  <div class="bg-neutral-100 flex rounded-md gap-2 p-2 shadow">
    <img
      v-if="!isImageLoaded && artwork.thumbnail"
      :src="artwork.thumbnail.lqip"
      :alt="artwork.thumbnail.alt_text"
      class="size-16 min-w-16 object-cover rounded"
    >
    <img
      ref="imageRef"
      :src="artworkGetImageUrl(artwork.image_id)"
      alt=""
      class="size-16 min-w-16 object-cover rounded"
      :class="{ hidden: !isImageLoaded }"
    >

    <p class="text-ellipsis text-2xl grow text-neutral-700 font-bold">
      {{ artwork.title }}
    </p>
  </div>
</template>
