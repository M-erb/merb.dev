---
title: Astro form to a google sheet
author: Michael Erb
description: We will be reviewing a way to have a form in Astro submit to google sheets using google APIs
date: 06-19-2024
draft: false
img:
  src: /src/imgs/postImgs/rubaitul-azad-TisvwNLLWA4-unsplash.jpg
  byName: Rubaitul Azad
  byUrl: https://unsplash.com/@rubaitulazad?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  origSrc: https://unsplash.com/photos/icon-TisvwNLLWA4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
excerpt: I have been using astro for about a year now and I have been loving its simplicity while getting some cool things done. I had a client need a special form to submit to a google sheet of theirs so they can manage the data there. Their site is hosted in cloudflare pages so that complicated things a little...
category: tutorial
tags: [js, javascript, astro]
---

I have been using <a href="https://astro.build/" target="_blank">astro</a> for about a year now and I have been loving its simplicity while getting some cool things done. I had a client need a special form to submit to a google sheet of theirs so they can manage the data there. Their site is hosted in cloudflare pages so that complicated things a little as, try as I might, I could not get the <a href="https://github.com/googleapis/google-auth-library-nodejs" target="_blank">`google-auth-library`</a> to work in the cloudflare environment. It relies on too many node specific APIs that cloudflare does not support. With that said I found two ways to do this. I will share what I call the 'easier way' but has some down sides. Then I will share the harder way but is much better in the long haul as there are less downsides.

## Method One: The easy way

Like I said above this way is easier and may work for some needs, but it is also more limiting. It needs to be set up for a very specific google sheet and has some tedious parts of collecting IDs and matching them up with your submission data. If you need to set up a lot of these, I do not recommend this way.

Here is what we are going to do, first create a google form that is connected to a google sheet. Then collection the form field's IDs. Create a submit URL where we can post our data to.

1. First you create a google sheet as you normally would in a web browser
2. Next click on `Tools` and then `Create a new form`
3. This opens a new tab/window where you will set up the form fields
4. When you are done setting up the fields you want, click on the 3 dots in the top left and then click on 'Get pre-filled link'
5. This opens a new tab/window, fill out the form and click 'Get link'
6. This puts a URL into your clip board, paste this in a text editor.

That URL should look something like this

```text
https://docs.google.com/forms/d/e/1QGIpQLSeJg9tGqfJEUjKIkm6MfVd7RuYi5Ed8uyQJ1XKoqhGL34BtUg/viewform?usp=pp_url&entry.100682254=fesfesfefe&entry.100773254=fesfesfefe
```

The `1QGIpQLSeJg9tGqfJEUjKIkm6MfVd7RuYi5Ed8uyQJ1XKoqhGL34BtUg` portion is the form's ID. The `entry.100682254` is one of the field's IDs. For example I made the label of `entry.100682254` 'First Name', and `entry.100773254` is 'Last Name'.

Now lets create the submit URL you can post data to. We will be using the URL we got above but switch out a few things. `viewform` will be replaced with `formResponse`. Each of your entry URL parameters (aka form fields) needs to be filled with it's corresponding user submitted values. And last but not least, there needs to be a URL parameters of `submit=Submit` added.

```text
https://docs.google.com/forms/d/e/1QGIpQLSeJg9tGqfJEUjKIkm6MfVd7RuYi5Ed8uyQJ1XKoqhGL34BtUg/formResponse?submit=Submit&entry.100682254=Merb&entry.100773254=Derby
```

Now lets' see this in some code. I have split up the code into the API endpoint and a service that handles submitting the data to google. What I am not showing is that there is a Vuejs form setup on an HTML page that is set up to submit to this endpoint `/api/form-submit` using a POST request. Below is the endpoint code. I also use my own 'await to' tool that you can read more about <a href="/blog/async-await-in-javascript-and-a-helpful-utility-function" target="_blank">here</a>.

```javascript
// src/pages/api/form-submit.ts

import { to } from '@utility/awaitTo'
import { addToSheet } from '@services/formSubmitUtility.ts'
import type { addSheetConfig } from '@services/formSubmitUtility.ts'

// Tells astro to not try and prerender this to HTML if in 'hybrid' mode
export const prerender = false

export const POST = async (ctx) => {
  const body = await ctx.request.json()

  const payload:addSheetConfig = {
    formId: '1QGIpQLSeJg9tGqfJEUjKIkm6MfVd7RuYi5Ed8uyQJ1XKoqhGL34BtUg',
    data: [
      // Here we are mapping the submitted data with the google form's entry IDs
      {
        name: 'firstName',
        value: body.fields.firstName,
        id: 100682254
      },
      {
        name: 'lastName',
        value: body.fields.lastName,
        id: 100773254
      }
    ]
  }

  const { res: sheetRes, err: sheetErr } = await to(addToSheet(payload))
  console.log('sheetRes: ', sheetRes)
  if (sheetErr) {
    return new Response (
      JSON.stringify({ message: 'failed', error: sheetErr }),
      { status: 500 }
    )
  }

  return new Response (JSON.stringify({ message: 'success' }))
}
```

Next here is the service that does the work of sending to the google forms. I am using a library called <a href="https://github.com/developit/redaxios" target="_blank">`redaxios`</a> with is an HTTP library that uses `fetch` under the hood but the dev experience/ api is almost 1 to 1 of axios.

```javascript
// /src/services/formSubmitUtility.ts
import axios from 'redaxios'

export interface addSheetConfig {
  formId: string
  data: Array<{
    name: string,
    value: string|number,
    id: number|string
  }>
}

export const addToSheet = async (config:addSheetConfig) => {
  const url = new URL(`https://docs.google.com/forms/d/e/${config.formId}/formResponse?submit=Submit`)
  config.data.forEach(item => {
    url.searchParams.append(`entry.${item.id}`, `${item.value}`)
  })

  const res = await axios.get(url.href)
  return res
}
```

I used the `URL` browser API to build the URL to send the data to as both node, browsers, and cloudflare supports it. Then I use `redaxios` to send the data with a get request to this newly built URL. Now when I submit it will go into that google sheet! Yay!

## Method Two: The better way

...coming soon!
