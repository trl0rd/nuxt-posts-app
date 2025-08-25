<!-- pages/posts/[id].vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Back Button -->
      <NuxtLink 
        to="/posts"
        class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6 group"
      >
        <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Posts
      </NuxtLink>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 mb-4">
            <svg class="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p class="text-gray-600">Loading post...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-red-800 mb-2">Error Loading Post</h3>
        <p class="text-red-600 mb-4">{{ errorMessage }}</p>
        <NuxtLink 
          to="/posts"
          class="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Back to Posts
        </NuxtLink>
      </div>

      <!-- Post Content -->
      <article v-else-if="post" class="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
        <!-- Header with gradient -->
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div class="flex items-center justify-between mb-4">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur">
              Post #{{ post.id }}
            </span>
            <span class="text-sm opacity-90">By User {{ post.userId }}</span>
          </div>
          
          <h1 class="text-3xl md:text-4xl font-bold mb-4">
            {{ post.title }}
          </h1>

          <!-- Meta Info -->
          <div class="flex items-center space-x-6 text-sm">
            <div v-if="post.views" class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{{ post.views }} views</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ new Date().toLocaleDateString() }}</span>
            </div>
          </div>
        </div>

        <!-- Body Content -->
        <div class="p-8">
          <div class="prose prose-lg max-w-none text-gray-700 mb-8">
            <p class="leading-relaxed whitespace-pre-wrap">{{ post.body }}</p>
          </div>

          <!-- Tags Section -->
          <div v-if="post.tags && post.tags.length" class="mb-8">
            <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in post.tags" 
                :key="tag"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
              >
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Reactions Section -->
          <div v-if="post.reactions" class="border-t border-gray-200 pt-8">
            <h3 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Reactions</h3>
            <div class="flex items-center space-x-6">
              <button class="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                <span class="font-semibold">{{ post.reactions.likes || 0 }}</span>
                <span class="text-sm">Likes</span>
              </button>
              
              <button class="flex items-center space-x-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 13l3 3 7-7" />
                </svg>
                <span class="font-semibold">{{ post.reactions.dislikes || 0 }}</span>
                <span class="text-sm">Dislikes</span>
              </button>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <NuxtLink 
              v-if="prevPostId"
              :to="`/posts/${prevPostId}`"
              class="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
            >
              <svg class="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous Post
            </NuxtLink>
            <div v-else></div>
            
            <NuxtLink 
              v-if="nextPostId"
              :to="`/posts/${nextPostId}`"
              class="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
            >
              Next Post
              <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
            <div v-else></div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Local state
const post = ref(null)
const isLoading = ref(false)
const errorMessage = ref(null)

// Get post ID from route
const postId = computed(() => route.params.id)

// Calculate previous and next post IDs
const prevPostId = computed(() => {
  const currentId = parseInt(postId.value)
  return currentId > 1 ? currentId - 1 : null
})

const nextPostId = computed(() => {
  const currentId = parseInt(postId.value)
  return currentId < 30 ? currentId + 1 : null
})

// Fetch post by ID
const fetchPost = async () => {
  isLoading.value = true
  errorMessage.value = null
  
  try {
    const response = await $fetch(`https://dummyjson.com/posts/${postId.value}`)
    console.log('Post response:', response)
    post.value = response
  } catch (error) {
    console.error('Error fetching post:', error)
    errorMessage.value = error.message || 'Failed to fetch post'
  } finally {
    isLoading.value = false
  }
}

// SEO Meta
useHead({
  title: () => post.value ? `${post.value.title} - Blog` : 'Loading...',
  meta: [
    { 
      name: 'description', 
      content: () => post.value ? post.value.body.substring(0, 160) : 'Loading post...'
    }
  ]
})

// Load post on mount
onMounted(() => {
  fetchPost()
})

// Watch for route changes (for prev/next navigation)
watch(() => route.params.id, () => {
  fetchPost()
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>