<script setup lang="ts">
import { useWindowFocus } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'

type TButton = {
  id: string

  // The styles are used to animate the buttons
  animationStyles: {
    '--initial-position-x': string
    '--initial-position-y': string
  }
}

/**
 * The optimization to bulk add buttons when the window is focused
 * is done by using a buffer to store the buttons when the window is not focused.
 * When the window is focused, the buttons from the buffer are added to the main buttons array.
 * This way, the buttons are not added to the DOM when the window is not focused.
 *
 * This is a simple example to demonstrate the concept.
 *
 * Also for some cases, this approach might not be suitable.
 * For example when the buttons should be added like comments in youtube in real-time.
 * (the comments there are added one by one, not in bulk)
 * In such cases, the buttons should be added directly to the main array, not using a buffer.
 * The optimization there should be done using requestAnimationFrame function.
 */
const windowFocused = useWindowFocus()
const buttons = ref<TButton[]>([])
const buttonsBuffer = ref<TButton[]>([])

function generateNewButton() {
  return {
    id: crypto.randomUUID() as string,
    animationStyles: {
      '--initial-position-x': Math.random().toFixed(2),
      '--initial-position-y': Math.random().toFixed(2),
    },
  } satisfies TButton
}

function addButton(button: TButton) {
  if (windowFocused.value)
    buttons.value.push(button)
  else
    buttonsBuffer.value.push(button)
}

/**
 * To avoid running dedicated server for this example,
 * we will emulate the server by adding buttons every 200ms.
 * This is just for demonstration purposes.
 *
 * In real-world applications, the buttons should be added when the server sends them.
 *
 * One thing that will be different here from the real server example is that
 * setInterval function are usually throttled by the browser when the window is not focused.
 * If will work just fine if clicking not on the other tab, but on the screen taskbar
 * (or some other approach to lose focus, but still see the window with the App).
 */
function startEmulatingWsServer() {
  setInterval(() => addButton(generateNewButton()), 200)
}

/**
 * The log will show the amount of triggered rerenders by the buttons.
 * When adding buttons in bulk, the rerenders will be triggered only once.
 */
watch(() => buttons.value.length, () => {
  // eslint-disable-next-line no-console
  console.log('Buttons count:', buttons.value.length)
})

/**
 * When the window is focused, the buttons from the buffer are added to the main buttons array.
 */
watch(windowFocused, () => {
  if (!windowFocused.value)
    return

  buttons.value.push(...buttonsBuffer.value)
  buttonsBuffer.value = []
})

onMounted(() => {
  startEmulatingWsServer()
})
</script>

<template>
  <main class="flex flex-col gap-4 max-w-4xl w-full p-10">
    <p class="text-center text-2xl font-mono">
      <span>{{ windowFocused ? 'Focused' : 'Not focused' }}</span>
      |
      Count: <span>{{ buttons.length }}</span>
      |
      Buffer: <span>{{ buttonsBuffer.length }}</span>
    </p>

    <button
      class="bg-primary-500 bg-neutral-900 text-white rounded-md p-2"
      @click="windowFocused = !windowFocused"
    >
      {{ windowFocused ? 'Lose focus' : 'Gain focus' }}
    </button>

    <!-- To optimize the rerenders we can avoid adding TransitionGroup here, because it will use the js thread -->

    <!-- Heavy animations is better to be added with css keyframes and transforms to unlock the js thread -->
    <!-- To add some variation to animations css variables can be used -->
    <div
      tag="div"
      name="list"
      class="flex flex-wrap gap-1"
    >
      <div
        v-for="(button, i) in buttons"
        :key="button.id"
        class="appearing-thing rounded flex items-center justify-center h-6 min-w-6 px-1 bg-lime-400"
        :style="button.animationStyles"
      >
        {{ i }}
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@keyframes appear {
  from {
    opacity: 0;
    transform: translateX(var(--modified-initial-position-x))
      translateY(var(--modified-initial-position-y));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.appearing-thing {
  --animation-acceleration: 300px;
  --modified-initial-position-x: calc((var(--initial-position-x) - 0.5) * var(--animation-acceleration));
  --modified-initial-position-y: calc((var(--initial-position-y) - 0.5) * var(--animation-acceleration));

  animation-name: appear;
  animation-fill-mode: forwards;
  animation-duration: 0.3s;
}
</style>
