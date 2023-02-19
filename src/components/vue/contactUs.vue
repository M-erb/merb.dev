<template>
  <div class="contact_letter">
    <div class="form_space">
      <form @submit.prevent="submitForm">
        <label>
          <span>First Name</span>
          <input type="text" v-model="fields.firstName" />
        </label>

        <label>
          <span>Last Name</span>
          <input type="text" v-model="fields.lastName" />
        </label>

        <label>
          <span>Email</span>
          <input type="text" v-model="fields.email" />
        </label>

        <label>
          <span>Company Name</span>
          <input type="text" v-model="fields.companyName" />
        </label>

        <label>
          <span>What did you have in mind?</span>
          <textarea type="text" v-model="fields.comments"></textarea>
        </label>

        <div class="btn_wrap">
          <button class="btn"><span>Submit</span></button>
        </div>
      </form>
    </div>

    <div class="letter_space">
      <div class="letter_space_inner">
        <div class="letter_top">
          <div class="letter_head">
            <p><span class="faded_text">From: {{ firstNameSub }} {{ fields.lastName }}&lt;{{ emailSub }}></span></p>
          </div>
          <div class="letter_body">
            <p>    Dear Michael,</p>
            <p>{{ commentSub }}</p>
          </div>
          <div class="letter_footer">
            <p>Sincerely,</p>
            <p>{{ firstNameSub }} {{ fields.lastName }}</p>
          </div>
        </div>
        <div class="letter_controls">
          <div class="btn_wrap __right">
            <button class="btn"><span>Submit</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: 'ContactUs' }
</script>

<script setup>
import { reactive, computed } from 'vue'

const fields = reactive({
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  comments: ''
})

function submitForm () {
  console.log('submitForm: ', fields.firstName)
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
  const sub = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  return fields.comments || sub
})
</script>

<style lang="pcss">
  .contact_letter {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-left: var(--size--4);
    margin-right: var(--size--4);

    & .btn_wrap {
      margin-top: var(--size-8);
    }

    & .form_space {
      flex: 1 1 30%;
      padding: var(--size-12) var(--size-4);
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
        margin: var(--size-8) 0;

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

  .faded_text {
    color: var(--color-grey-400);
  }
</style>
