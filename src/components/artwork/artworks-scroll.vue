<script setup lang="ts">
import { useInfiniteScroll, useThrottleFn, useVirtualList } from '@vueuse/core'
import { computed } from 'vue'
import { useArtworksInfinite } from '../../api/artworks/hooks/use-artworks-infinite'
import Artwork from './artwork.vue'

const itemHeight = 90
const nextPageDistance = itemHeight * 2

/**
 * To implement infinite scroll, we need to use useInfiniteQuery hook from Vue Query.
 * This hook will provide us with data, error, status, fetchNextPage, and isFetching.
 *
 * !important isFetching we need to check if we are already fetching the next page to prevent multiple requests.
 *
 * The one caveat in virtual lists is that we need to know the height of each item.
 * This is because the virtual list needs to know how many items to render and how to calculate the height of the container.
 * In this example, we will assume that each item has a height of 90px.
 */
const { data, error, status, fetchNextPage, isFetching } = useArtworksInfinite()

const throttledFetchNextPage = useThrottleFn(() => {
  if (!isFetching.value)
    fetchNextPage()
}, 200)

const loadedArtworks = computed(() => {
  return data.value?.pages.flatMap(page => page.data) ?? []
})

/**
 * To implement virtual scrolling, we need to use useVirtualList hook from VueUse.
 * Virtual scrolling from VueUse will add elements of items that should be visible in the viewport.
 * Other items above (that are not visible) will be removed and will be emulated by margin-top.
 * This way, we can render a large list of items without performance issues.
 */
const { list: virtualList, containerProps, wrapperProps } = useVirtualList(loadedArtworks, {
  itemHeight,
  overscan: 3,
})

/**
 * To add behaviour of infinite scroll, we need to use useInfiniteScroll hook from VueUse.
 * That will allow us to fetch the next page when the user scrolls to the bottom of the list.
 */
useInfiniteScroll(containerProps.ref, throttledFetchNextPage, { distance: nextPageDistance })
</script>

<template>
  <section>
    <div v-if="status === 'pending'">
      Loading...
    </div>
    <div v-else-if="status === 'error'">
      Error: {{ error }}
    </div>

    <div
      v-else-if="status === 'success'"
      v-bind="containerProps"
      class="h-screen"
    >
      <div
        v-bind="wrapperProps"
        class="p-[10px]"
      >
        <Artwork
          v-for="{ index: pageIndex, data } in virtualList"
          :key="pageIndex"
          :artwork="data"
          class="h-[80px] mb-[10px]"
        />
      </div>
    </div>
  </section>
</template>
