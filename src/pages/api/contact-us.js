import { nanoid } from 'nanoid'
import isEmail from 'validator/lib/isEmail'

export const prerender = false

export const POST = async (ctx) => {
  const { formEntries } = ctx.locals.runtime.env
  const TTL = 3 * 2592000 // months
  const body = await ctx.request.json()

  if (body.honey) {
    // return a success but do nothing else after
    // this is the 'bait' for bots and if there is
    // a value then a bot took the bait
    return new Response(JSON.stringify({
      message: 'success'
    }))
  }

  const { firstName, lastName, email, comment } = body.fields
  const errorBag = {}

  if (firstName.length < 1) errorBag['firstName'] = 'First Name is required'
  if (lastName.length < 1) errorBag['lastName'] = 'Last Name is required'
  if (email.length < 1) errorBag['email'] = 'Email is required'
  if (!isEmail(email)) errorBag['email'] = 'Email is not valid'
  if (comment.length < 1) errorBag['comment'] = 'What did you have in mind? is required'

  if (Object.keys(errorBag).length > 0) {
    return new Response(JSON.stringify({
      message: 'failed',
      isValid: false,
      errors: errorBag
    }),
    { status: 400 })
  }

  const submitData = body.fields
  const site = new URL(import.meta.env.SITE)
  const key = `${site.host}:${nanoid()}`
  await formEntries.put(key, JSON.stringify(submitData), { expirationTtl: TTL })

  return new Response(JSON.stringify({
    message: 'success',
    submitData,
    key
  }))
}
