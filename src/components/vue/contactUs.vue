<template>
  <h3>Contact Us!</h3>

  <form @submit.prevent="submitForm">
    <input type="text" v-model="fields.firstName" />

    <button class="">Submit</button>
  </form>

  <div class="letter">
    <p>{{ fields.firstName }}</p>
  </div>
</template>

<script>
export default { name: 'ContactUs' }
</script>

<script setup>
import { reactive } from 'vue'

const fields = reactive({
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
})

function submitForm () {
  console.log('submitForm: ', fields.firstName)
}
</script>
