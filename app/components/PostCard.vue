<!-- components/PostCard.vue -->
<template>
  <article 
    class="post-card group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer"
    @click="handleClick"
  >
    <!-- Gradient accent -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    
    <div class="p-6">
      <!-- Post ID Badge -->
      <div class="flex items-center justify-between mb-3">
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          Post #{{ post.id }}
        </span>
        <span class="text-xs text-gray-500">User {{ post.userId }}</span>
      </div>

      <!-- Title -->
      <h2 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
        {{ post.title }}
      </h2>

      <!-- Body Preview -->
      <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {{ post.body }}
      </p>

      <!-- Tags -->
      <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tag in post.tags.slice(0, 3)" 
          :key="tag"
          class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          #{{ tag }}
        </span>
        <span v-if="post.tags.length > 3" class="text-xs text-gray-500 self-center">
          +{{ post.tags.length - 3 }} more
        </span>
      </div>

      <!-- Reactions -->
      <div v-if="post.reactions" class="flex items-center justify-between pt-4 border-t border-gray-100">
        <div class="flex items-center space-x-4">
          <span class="flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            {{ post.reactions?.likes || 0 }}
          </span>
          <span class="flex items-center text-sm text-gray-500">
            <svg class="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h10m-7 4h4" />
            </svg>
            {{ post.reactions?.dislikes || 0 }}
          </span>
        </div>
        
        <!-- Read More Arrow -->
        <span class="text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && value.id && value.title && value.body
    }
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click', props.post.id)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>