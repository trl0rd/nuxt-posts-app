import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
    lastFetched: null,
    cacheTimeout: 15 * 60 * 1000 
  }),

  getters: {
    allPosts: (state) => state.posts || [],
    getPostById: (state) => {
      return (id) => state.posts.find(post => post.id === parseInt(id))
    },
    isDataStale: (state) => {
      if (!state.lastFetched) return true
      return Date.now() - state.lastFetched > state.cacheTimeout
    },
    postsCount: (state) => state.posts?.length || 0
  },

  actions: {
    async fetchPosts(forceRefresh = false) {
      if (!forceRefresh && !this.isDataStale && this.posts.length > 0) {
        console.log('Returning cached posts')
        return this.posts
      }

      this.loading = true
      this.error = null

      try {
        const response = await fetch('https://dummyjson.com/posts?limit=30&select=id,title,body,userId,tags,reactions')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Fetched data:', data)

        if (data && data.posts && Array.isArray(data.posts)) {
          this.posts = data.posts
          this.lastFetched = Date.now()
          
          if (typeof window !== 'undefined') {
            try {
              sessionStorage.setItem('posts_cache', JSON.stringify({
                posts: this.posts,
                timestamp: this.lastFetched
              }))
            } catch (e) {
              console.error('Failed to save to sessionStorage:', e)
            }
          }
          
          return this.posts
        } else {
          throw new Error('Invalid data format received from API')
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        this.error = err.message || 'Failed to fetch posts'
        
        if (typeof window !== 'undefined') {
          try {
            const cached = sessionStorage.getItem('posts_cache')
            if (cached) {
              const { posts, timestamp } = JSON.parse(cached)
              if (posts && Array.isArray(posts)) {
                this.posts = posts
                this.lastFetched = timestamp
                this.error = null 
                return this.posts
              }
            }
          } catch (e) {
            console.error('Failed to load from cache:', e)
          }
        }
        
        this.posts = []
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchPostById(id) {
      const cachedPost = this.getPostById(id)
      if (cachedPost && !this.isDataStale) {
        this.currentPost = cachedPost
        return cachedPost
      }

      this.loading = true
      this.error = null

      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const post = await response.json()
        this.currentPost = post
        
        const index = this.posts.findIndex(p => p.id === parseInt(id))
        if (index !== -1) {
          this.posts[index] = post
        }

        return post
      } catch (err) {
        console.error('Error fetching post:', err)
        this.error = err.message || 'Failed to fetch post'
        throw err
      } finally {
        this.loading = false
      }
    },

    clearCache() {
      this.posts = []
      this.currentPost = null
      this.lastFetched = null
      this.error = null
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.removeItem('posts_cache')
        } catch (e) {
          console.error('Failed to clear cache:', e)
        }
      }
    },

    initializeFromCache() {
      if (typeof window !== 'undefined') {
        try {
          const cached = sessionStorage.getItem('posts_cache')
          if (cached) {
            const { posts, timestamp } = JSON.parse(cached)
            const age = Date.now() - timestamp
            
            if (age < this.cacheTimeout && posts && Array.isArray(posts)) {
              this.posts = posts
              this.lastFetched = timestamp
              console.log('Initialized from cache')
            }
          }
        } catch (error) {
          console.error('Error initializing from cache:', error)
          sessionStorage.removeItem('posts_cache')
        }
      }
    }
  }
})