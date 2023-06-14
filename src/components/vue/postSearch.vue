<template>
  <div class="posts_sec">
    <div class="post_search">
      <label class="search_control">
        <span>Search</span>
        <input type="text" v-model="query.term" placeholder="Type here..." />
      </label>
      <!-- <div class="search_control"></div> -->
    </div>

    <TransitionGroup name="list">
      <div class="post_item" v-for="(post, index) in filteredPosts" :key="index">
        <div class="post_img_space">
          <a :href="post.url" class="post_img"><div class="post_img_bg" :style="`background-image: url(${post.img})`"></div></a>
        </div>
        <div class="post_details">
          <h3 class="post_title"><a :href="post.url">{{ post.title }} <span>/0{{ index + 1 }}</span></a></h3>
          <p class="post_date">{{ formatDate(post.date, 'MMM do, yyyy') }}</p>
          <p class="post_excerpt">{{ post.excerpt }}</p>
        </div>
      </div>

      <div class="post_item_empty" v-if="!filteredPosts.length">
        <p v-if="props.posts.length">No Posts Found</p>
        <p v-if="!props.posts.length">No Posts Yet</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
export default { name: 'PostSearch' }
</script>

<script setup>
import { reactive, defineProps, computed } from 'vue'
import { format as formatDate } from 'date-fns'

const props = defineProps({
  posts: {
    type: Array
  }
})

const query = reactive({
  term: ''
})

const filteredPosts = computed(() => {
  return props.posts.filter(post => {
    const title = post.title.toLowerCase()
    const excerpt = post.excerpt.toLowerCase()
    const searchTerm = query.term.toLowerCase()
    return excerpt.includes(searchTerm) || title.includes(searchTerm)
  })
})
</script>
