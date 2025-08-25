<!-- app.vue -->
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { onUnmounted } from 'vue'

const handleError = (error) => {
  console.error('Global error:', error)
}

if (process.client) {
  window.addEventListener('error', handleError)
  window.addEventListener('unhandledrejection', handleError)
}

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('error', handleError)
    window.removeEventListener('unhandledrejection', handleError)
  }
})
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>