<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

/** @typedef {{ target: number, label: string }} Stat */

const props = defineProps({
  stats: {
    type: Array,
    required: true,
  },
  animated: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: 'home',
    /** @param {string} value */
    validator: (value) => ['home', 'about'].includes(value),
  },
})

const statItems = /** @type {Stat[]} */ (props.stats)
const root = ref(/** @type {HTMLElement | null} */ (null))
const values = ref(statItems.map((stat) => (props.animated ? '0' : `${stat.target}+`)))
const frameIds = /** @type {Set<number>} */ (new Set())
/** @type {IntersectionObserver | undefined} */
let observer
let started = false

function setFinalValues() {
  values.value = statItems.map((stat) => `${stat.target}+`)
}

/** @param {FrameRequestCallback} callback */
function scheduleFrame(callback) {
  const id = requestAnimationFrame((time) => {
    frameIds.delete(id)
    callback(time)
  })
  frameIds.add(id)
}

function startAnimation() {
  if (started) return
  started = true
  observer?.disconnect()

  statItems.forEach((stat, index) => {
    let startTime

    /** @param {number} time */
    function update(time) {
      startTime ??= time
      const progress = Math.min((time - startTime) / 900, 1)
      values.value[index] = `${Math.floor(stat.target * progress)}+`

      if (progress < 1) scheduleFrame(update)
      else values.value[index] = `${stat.target}+`
    }

    scheduleFrame(update)
  })
}

onMounted(() => {
  if (!props.animated) return

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    setFinalValues()
    return
  }

  if (!('IntersectionObserver' in window)) {
    startAnimation()
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) startAnimation()
    },
    { threshold: 0.2 },
  )
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  frameIds.forEach((id) => cancelAnimationFrame(id))
  frameIds.clear()
})
</script>

<template>
  <section ref="root" :class="variant === 'home' ? 'stats-section' : 'about-stats'">
    <div v-for="(stat, index) in statItems" :key="stat.label" :class="{ stat: variant === 'home' }">
      <strong>{{ values[index] }}</strong>
      <span>{{ stat.label }}</span>
    </div>
  </section>
</template>
