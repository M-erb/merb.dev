<script>
export default { name: 'ContactUs' }
</script>

<script setup>
import { reactive, computed, ref, nextTick } from 'vue'
import noty from '@utility/toasts.js'
import axios from 'axios'

const letterspace = ref(null)
const formspace = ref(null)
const tymessage = ref(null)
const status = reactive({ isDone: false, isLoading: false })
const fields = reactive({
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  comment: ''
})
const honey = ref('')
const errorBag = ref({})

async function submitForm () {
  status.isDone = false
  status.isLoading = true
  errorBag.value = {}
  let isValid = true

  const { firstName, lastName, email, comment } = fields
  if (firstName.length < 1) {
    errorBag.value['firstName'] = 'First Name is required'
    isValid = false
  }

  if (lastName.length < 1) {
    errorBag.value['lastName'] = 'Last Name is required'
    isValid = false
  }

  if (email.length < 1) {
    errorBag.value['email'] = 'Email is required'
    isValid = false
  }

  if (comment.length < 1) {
    errorBag.value['comment'] = 'What did you have in mind? is required'
    isValid = false
  }

  if (!isValid) {
    noty.warning('Please check all required fields')
    return
  }

  try {
    const payload = {
      honeyPot: honey.value,
      fields
    }

    // await axios.post(`${reqPrefix}/api/v1/form/submit`, payload)
    await axios.post('/api/contact-us', payload)
    noty.success('Thank you! I will reach out to you as soon as possible')
    status.isLoading = false
    status.isDone = true

    await nextTick()
    scrollToTYMessage()
  } catch (error) {
    console.error('error with form submit: ', error?.response?.data ?? error?.message)
    if (error?.response?.data?.isValid === false) {
      const errors = error.response.data.errors ?? {}
      errorBag.value = errors

      noty.warning('Please check all required fields')
      return
    }

    noty.error('There was a problem trying to submit, please try again later')
    status.isLoading = false
  }
}

function scrollToLetter () {
  letterspace.value.scrollIntoView({ behavior: 'smooth' })
}

function scrollToForm () {
  formspace.value.scrollIntoView({ behavior: 'smooth' })
}

function scrollToTYMessage () {
  tymessage.value.scrollIntoView({ behavior: 'smooth' })
}

const firstNameSub = computed(() => {
  const sub = 'Bob the Builder'
  return fields.firstName || sub
})

const emailSub = computed(() => {
  const sub = 'bob@builder.org'
  return fields.email || sub
})

const commentSub = computed(() => {
  const sub = 'This is Latin placeholder text. Waiting for you to fill out the form. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  return fields.comment || sub
})
</script>

<template>
  <div class="contact_letter" v-if="!status.isDone">
    <div class="form_space" ref="formspace">
      <form @submit.prevent="submitForm">
        <label :class="['field_here', { is_error: errorBag.firstName }]">
          <span>First Name</span>
          <input type="text" v-model="fields.firstName" />
          <p :class="['error_space', {is_error: errorBag.firstName}]" v-if="errorBag.firstName">{{ errorBag.firstName }}</p>
        </label>

        <label :class="['field_here', { is_error: errorBag.lastName }]">
          <span>Last Name</span>
          <input type="text" v-model="fields.lastName" />
          <p :class="['error_space', {is_error: errorBag.lastName}]" v-if="errorBag.lastName">{{ errorBag.lastName }}</p>
        </label>

        <label :class="['field_here', { is_error: errorBag.email }]">
          <span>Email</span>
          <input type="text" v-model="fields.email" />
          <p :class="['error_space', {is_error: errorBag.email}]" v-if="errorBag.email">{{ errorBag.email }}</p>
        </label>

        <label :class="['field_here', { is_error: errorBag.companyName }]">
          <span>Company Name</span>
          <input type="text" v-model="fields.companyName" />
          <p :class="['error_space', {is_error: errorBag.companyName}]" v-if="errorBag.companyName">{{ errorBag.companyName }}</p>
        </label>

        <label :class="['field_here', { is_error: errorBag.comment }]">
          <span>What did you have in mind?</span>
          <textarea v-model="fields.comment"></textarea>
          <p :class="['error_space', {is_error: errorBag.comment}]" v-if="errorBag.comment">{{ errorBag.comment }}</p>
        </label>

        <label :class="['field_here not_here', { is_error: errorBag.honey }]">
          <span>What is the budget for your project?</span>
          <input type="text" v-model="honey" />
          <p :class="['error_space', {is_error: errorBag.honey}]" v-if="errorBag.honey">{{ errorBag.honey }}</p>
        </label>

        <button class="not_here" type="submit" aria-label="Next Step"></button>
      </form>

      <div class="btn_wrap mobile_only_control">
        <button class="btn" @click="scrollToLetter"><span>Continue</span></button>
      </div>
    </div>

    <div class="letter_space" ref="letterspace">
      <div class="letter_space_inner">
        <h4 class="title_bold">Your Message to Me</h4>
        <div class="letter_top">
          <div class="letter_head">
            <p><span class="faded_text">From: {{ firstNameSub }} {{ fields.lastName }}&lt;{{ emailSub }}></span></p>
          </div>
          <div class="letter_body">
            <p>Dear Michael,</p>
            <p style="white-space: pre-wrap">{{ commentSub }}</p>
          </div>
          <div class="letter_footer">
            <p>Sincerely,</p>
            <p>{{ firstNameSub }} {{ fields.lastName }}</p>
          </div>
        </div>
        <div class="letter_controls">
          <div class="btn_wrap __between __right:md">
            <button class="btn __sm __txt mobile_only_control" @click="scrollToForm" aria-label="Go Back and Edit Form"><span>Back to edit Form</span></button>
            <button class="btn" @click="submitForm" aria-label="Submit Form"><span>Send It</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="contact_success" v-if="status.isDone" ref="tymessage">
    <div class="inner">
      <h3>Thank you!</h3>
      <p>I really appreciate you taking the time to submit my form. A message about it has been sent and I will get back to you as soon as I can. Hope this is a start to something great.</p>
    </div>
  </div>
</template>

<style lang="pcss">
  .contact_letter {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-left: var(--size--4);
    margin-right: var(--size--4);
    min-height: 700px;

    @media (min-width: 768px) {
      flex-wrap: nowrap;
    }

    & .btn_wrap {
      margin-top: var(--size-8);
    }

    & .form_space {
      flex: 1 1 30%;
      padding: var(--size-12) var(--size-4);
      max-width: 360px;
    }

    & .letter_space {
      flex: 1 1 70%;
      padding: var(--size-4);

      & .letter_space_inner {
        padding: var(--size-8);
        background-color: var(--color-grey-100);
        border-radius: var(--radius-xl);
        min-height: 600px;

        display: flex;
        justify-content: space-between;
        align-items: stretch;
        flex-direction: column;

        & .letter_top {
          flex: 1 1 auto;
        }

        & .letter_controls {
          flex: 0 0 auto;
        }
      }

      & .letter_body {
        margin-bottom: var(--size-8);

        & p:first-child {
          margin-bottom: var(--size-4);
        }

        & p:nth-child(2) {
          text-indent: var(--scale-4);
        }

        & p {
          line-height: 2;
        }
      }

      & .letter_footer {
        line-height: 2;
      }
    }
  }

  .contact_success {
    min-height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;

    & .inner {
      max-width: 500px;
      line-height: 2;

      & h3 {
        font-size: var(--scale-5);
        font-weight: var(--weight-bold);
      }

      & p {
        font-size: var(--scale-2);
      }
    }
  }

  .title_bold {
    margin-bottom: var(--size-4);
  }

  .faded_text {
    color: var(--color-grey-400);
  }

  .not_here {
    display: none;
    opacity: 0;
    width: 0;
    height: 0;

    & input, & textarea, & select, & span {
      display: none;
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
</style>
