<!-- pages/posts/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- Header -->
      <header class="mb-10 text-center animate-fade-in">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog Posts
        </h1>
        <p class="text-gray-600 text-lg">
          Discover our latest articles and insights
        </p>
        
        <!-- Stats Bar -->
        <div class="mt-6 flex justify-center items-center space-x-6">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">Total Posts:</span>
            <span class="font-semibold text-gray-900">{{ totalPosts }}</span>
          </div>
          <div class="w-px h-4 bg-gray-300"></div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">Cache Status:</span>
            <span :class="cacheStatusClass">
              {{ cacheStatus }}
            </span>
          </div>
          <button
            @click="handleRefresh"
            :disabled="isLoading"
            class="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <svg 
              class="w-4 h-4"
              :class="{ 'animate-spin': isLoading }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ isLoading ? 'Refreshing...' : 'Refresh' }}</span>
          </button>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="isLoading && postsList.length === 0" class="flex justify-center items-center py-20">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 mb-4">
            <svg class="animate-spin h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p class="text-gray-600">Loading posts...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="errorMsg && postsList.length === 0" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <svg class="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-red-800 mb-2">Error Loading Posts</h3>
        <p class="text-red-600 mb-4">{{ errorMsg }}</p>
        <button 
          @click="handleRefresh"
          class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Posts Grid with PostCard Component -->
      <div v-else-if="postsList && postsList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TransitionGroup name="list">
          <!-- Using PostCard component -->
          <PostCard 
            v-for="post in postsList" 
            :key="`post-${post.id}`" 
            :post="post"
            @click="navigateToPost"
          />
        </TransitionGroup>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No Posts Found</h3>
        <p class="text-gray-600 mb-4">There are no posts to display at the moment.</p>
        <button 
          @click="handleRefresh"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Load Posts
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePostsStore } from '~/stores/posts'

  const PostCard = resolveComponent('PostCard')

// SEO Meta
useHead({
  title: 'Posts - Blog',
  meta: [
    { name: 'description', content: 'Browse our collection of blog posts and articles' }
  ]
})

const router = useRouter()
const postsStore = usePostsStore()

// Local reactive state as backup
const postsList = ref([])
const isLoading = ref(false)
const errorMsg = ref(null)

// Computed properties with null checks
const totalPosts = computed(() => {
  return postsList.value?.length || 0
})

const cacheStatus = computed(() => {
  if (isLoading.value) return 'Updating...'
  if (!postsStore) return 'Unknown'
  return postsStore.isDataStale ? 'Stale' : 'Fresh'
})

const cacheStatusClass = computed(() => {
  if (!postsStore) return 'text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800'
  return postsStore.isDataStale 
    ? 'text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800'
    : 'text-xs px-2 py-1 rounded-full bg-green-100 text-green-800'
})

// Watch for store changes
watch(() => postsStore?.posts, (newPosts) => {
  if (newPosts && Array.isArray(newPosts)) {
    postsList.value = newPosts
  }
}, { immediate: true, deep: true })

watch(() => postsStore?.loading, (newLoading) => {
  isLoading.value = newLoading
}, { immediate: true })

watch(() => postsStore?.error, (newError) => {
  errorMsg.value = newError
}, { immediate: true })

// Methods
const navigateToPost = (postId) => {
  console.log('Navigating to post:', postId)
  router.push(`/posts/${postId}`)
}

const handleRefresh = async () => {
  errorMsg.value = null
  try {
    if (postsStore && typeof postsStore.fetchPosts === 'function') {
      await postsStore.fetchPosts(true)
    } else {
      // Fallback: fetch directly if store is not working
      await fetchPostsDirectly()
    }
  } catch (error) {
    console.error('Error refreshing posts:', error)
    errorMsg.value = error.message || 'Failed to refresh posts'
  }
}

// Fallback fetch function
const fetchPostsDirectly = async () => {
  isLoading.value = true
  errorMsg.value = null
  
  try {
    const response = await fetch('https://dummyjson.com/posts?limit=30&select=id,title,body,userId,tags,reactions')
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    
    const data = await response.json()
    console.log('Direct fetch data:', data)
    
    if (data && data.posts) {
      postsList.value = data.posts
    } else {
      throw new Error('Invalid response format')
    }
  } catch (error) {
    console.error('Direct fetch error:', error)
    errorMsg.value = error.message
  } finally {
    isLoading.value = false
  }
}

// Lifecycle
onMounted(async () => {
  console.log('Posts page mounted')
  
  try {
    // Try to use store first
    if (postsStore && typeof postsStore.initializeFromCache === 'function') {
      postsStore.initializeFromCache()
      await postsStore.fetchPosts()
    } else {
      // Fallback to direct fetch
      await fetchPostsDirectly()
    }
  } catch (error) {
    console.error('Error on mount:', error)
    // Try direct fetch as last resort
    await fetchPostsDirectly()
  }
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

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