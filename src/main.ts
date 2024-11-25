import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'

import './main.scss'

/**
 * To switch between App1 and App2, comment/uncomment the appropriate import
 * statement below.
 *
 * App1 is the code needed to implement the task 1
 * App2 is the code needed to implement the task 2
 */

import App1 from './App1.vue'

createApp(App1)
  .use(VueQueryPlugin)
  .mount('#app')

// import App2 from './App2.vue'

// createApp(App2)
//   .use(VueQueryPlugin)
//   .mount('#app')
