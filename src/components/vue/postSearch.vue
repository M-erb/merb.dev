<script>
export default { name: 'PostSearch' }
</script>

<script setup>
import { reactive, defineProps, computed } from 'vue'
import { format as formatDate } from 'date-fns'

const props = defineProps({
  posts: {
    type: Array
  },
  tags: {
    type: Array
  },
  cats: {
    type: Array
  }
})

const query = reactive({
  term: '',
  tag: '',
  cat: ''
})

const filteredPosts = computed(() => {
  return props.posts.filter(post => {
    if (!query.term && !query.tag && !query.cat) return true

    const title = post.title.toLowerCase()
    const excerpt = post.excerpt.toLowerCase()
    const searchTerm = query.term.toLowerCase()

    const isFindTitle = searchTerm ? title.includes(searchTerm) : true
    const isFindExcerpt = searchTerm ? excerpt.includes(searchTerm) : true
    const isFindTag = query.tag ? post.tags.includes(query.tag) : true
    const isFindCat = query.cat ? post.category.includes(query.cat) : true

    const isFind = (isFindTitle || isFindExcerpt || post.tags.includes(searchTerm) || post.category.includes(searchTerm)) && (isFindTag && isFindCat)
    return isFind
  })
})

function handleTagClick (tagName) {
  if (query.tag === tagName) {
    query.tag = ''
    return
  }

  query.tag = tagName
}

function handleCatClick (catName) {
  if (query.cat === catName) {
    query.cat = ''
    return
  }

  query.cat = catName
}
</script>

<template>
  <div class="posts_sec">
    <div class="post_search">
      <label class="search_control">
        <span>Search</span>
        <input type="text" v-model="query.term" placeholder="Type here..." />
      </label>
      <div class="search_filter">
        <h3 class="title">Categories</h3>
        <ul>
          <li v-for="cat in props.cats">
            <button @click="handleCatClick(cat.name)" :class="[{__active: query.cat === cat.name}]"><span class="name">{{ cat.name }}</span><span class="count">{{ cat.count }}</span></button>
          </li>
        </ul>
      </div>
      <div class="search_filter">
        <h3 class="title">Tags</h3>
        <ul>
          <li v-for="tag in props.tags">
            <button @click="handleTagClick(tag.name)" :class="[{__active: query.tag === tag.name}]"><span class="name">{{ tag.name }}</span><span class="count">{{ tag.count }}</span></button>
          </li>
        </ul>
      </div>
    </div>

    <TransitionGroup name="list">
      <div class="post_item" v-for="(post, index) in filteredPosts" :key="index">
        <div class="post_img_space">
          <a :href="post.url" class="post_img" :aria-label="`Read ${post.title}`" :title="`Read ${post.title}`"><div class="post_img_bg" :style="`background-image: url(${post.img.src})`"></div></a>
        </div>
        <div class="post_details">
          <h3 class="post_title"><a :href="post.url" :aria-label="`Read ${post.title}`" :title="`Read ${post.title}`">{{ post.title }} <span>/0{{ index + 1 }}</span></a></h3>
          <p class="post_date">{{ formatDate(post.date, 'MMM dd, yyyy') }}</p>
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
