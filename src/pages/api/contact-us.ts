import { verify, sendNoty } from '@services/contactSubmit'
import { nanoid } from 'nanoid'

export const prerender = false

export const POST = async (ctx) => {
  const body = await ctx.request.json()

  if (body.honey) {
    // return a success but do nothing else after
    // this is the 'bait' for bots and if there is
    // a value then a bot took the bait
    return new Response(JSON.stringify({
      message: 'success'
    }))
  }

  // Verify form
  const errorBag = verify(body.fields)
  if (Object.keys(errorBag).length > 0) {
    return new Response(JSON.stringify({
      message: 'failed',
      isValid: false,
      errors: errorBag
    }),
    { status: 400 })
  }

  // send notification email
  await sendNoty(body.fields)

  // Log submit to KV
  const site = new URL(import.meta.env.SITE)
  const key = `${site.host}:${nanoid()}`
  const TTL = 3 * 2592000 // num * months
  const { formEntries } = ctx.locals.runtime.env
  await formEntries.put(key, JSON.stringify(body.fields), { expirationTtl: TTL })

  return new Response(JSON.stringify({
    message: 'success',
    submitData: body.fields,
    key
  }))
}
