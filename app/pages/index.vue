<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div class="container mx-auto px-4 py-16 max-w-6xl">
      <!-- Hero Section -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to Our Blog
          </span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover amazing stories, insights, and articles from our community of writers.
        </p>
        
        <!-- CTA Button -->
        <NuxtLink
          to="/posts"
          class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          <span>Explore Posts</span>
          <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Rich Content</h3>
          <p class="text-gray-600">Browse through diverse topics and engaging articles from various authors.</p>
        </div>

        <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Fast & Cached</h3>
          <p class="text-gray-600">Experience lightning-fast loading with our 15-minute intelligent caching system.</p>
        </div>

        <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Tagged & Organized</h3>
          <p class="text-gray-600">Find posts easily with our comprehensive tagging and categorization system.</p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="mt-20 bg-white rounded-2xl shadow-xl p-12">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-10">Platform Statistics</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl font-bold text-blue-600 mb-2">30+</div>
            <div class="text-gray-600">Total Posts</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-purple-600 mb-2">100+</div>
            <div class="text-gray-600">Tags</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-green-600 mb-2">15min</div>
            <div class="text-gray-600">Cache Duration</div>
          </div>
          <div class="text-center">
            <div class="text-4xl font-bold text-orange-600 mb-2">Fast</div>
            <div class="text-gray-600">Performance</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Home - Nuxt Blog with Pinia',
  meta: [
    { name: 'description', content: 'A modern blog application built with Nuxt 3, Pinia, and Tailwind CSS' }
  ]
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>