<script>
export default { name: 'ContactUs' }
</script>

<script setup>
import { reactive, computed, ref } from 'vue'
import noty from '@utility/toasts.js'
import axios from 'axios'

const status = reactive({ isDone: false, isLoading: false })
const reqPrefix = import.meta.env.MODE === 'production' ? '' : 'http://localhost:3000'
const letterspace = ref(null)
const fields = reactive({
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  comment: ''
})
const honey = ref('')

async function submitForm () {
  status.isDone = false
  status.isLoading = true

  try {
    const payload = {
      formUuid: 'HXb6Hs0ATrC31_Bs-NVhW',
      clientCaptchaKey: '',
      honeyPot: honey.value,
      ...fields
    }

    await axios.post(`${reqPrefix}/api/v1/form/submit`, payload)
    noty.success('Thank you! I will reach out to you as soon as possible')
    status.isLoading = false
    status.isDone = true
  } catch (error) {
    console.error('error with form submit: ', error?.response?.error ?? error?.message)
    noty.error('There was a problem trying to submit, please try again later')
    status.isLoading = false
  }
}

function scrollToLetter () {
  letterspace.value.scrollIntoView({ behavior: 'smooth' })
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
    <div class="form_space">
      <label class="field_here">
        <span>First Name</span>
        <input type="text" v-model="fields.firstName" />
      </label>

      <label class="field_here">
        <span>Last Name</span>
        <input type="text" v-model="fields.lastName" />
      </label>

      <label class="field_here">
        <span>Email</span>
        <input type="text" v-model="fields.email" />
      </label>

      <label class="field_here">
        <span>Company Name</span>
        <input type="text" v-model="fields.companyName" />
      </label>

      <label class="field_here">
        <span>What did you have in mind?</span>
        <textarea v-model="fields.comment"></textarea>
      </label>

      <label class="field_here not_here">
        <span>What is the budget for your project?</span>
        <input type="text" v-model="honey" />
      </label>

      <div class="btn_wrap mobile_only_control">
        <button class="btn" @click="submitForm"><span>Continue</span></button>
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
          <div class="btn_wrap __right">
            <button class="btn" @click="submitForm"><span>Send It</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="contact_success" v-if="status.isDone">
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

      & .mobile_only_control {
        @media (min-width: 768px) {
          display: none;
        }
      }
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
