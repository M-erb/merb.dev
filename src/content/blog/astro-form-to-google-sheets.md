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
tags: [js, javascript, astro, google sheets, cloudflare]
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

Now lets' see this in some code. I have split up the code into the API endpoint and a service that handles submitting the data to google. What I am not showing is that there is a Vuejs form setup on an HTML page that is set up to submit to this endpoint `/api/form-submit` using a POST request. Below is the endpoint code. If you are unfamiliar with astro's server endpoint api then have a read <a href="https://docs.astro.build/en/guides/endpoints/#server-endpoints-api-routes" target="_blank">here</a>. Basically though, it is just a `.js` or `.ts` file and thr route is determined by the file path in the `/src/pages/*` directory. I also use my own 'await to' tool that you can read more about <a href="/blog/async-await-in-javascript-and-a-helpful-utility-function" target="_blank">here</a>.

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

I believe this is the better way because we have the option to connect to any one's spread sheet with out a bunch of set up. The only thing needed by the spread sheet owner is to share it with an email address. The down side is that you do need to set up google's api accounts and what they call a "Service Account" to authenticate against.

As an overview we will need:

1. A google account
2. Activate the google sheets API (it is free but with bandwidth limits)
3. Create a "Service Account" credential for that API (this gives you a generated account "email address")
4. Share a google sheet with the above "email address" as this will allow your app to read and write data to it
5. Set up authentication in your app
6. Send requests to the google sheets API
7. Profit!

### 2. Activate the google sheets API

Goto <a href="https://console.cloud.google.com/apis/dashboard" target="_blank">Google Cloud Console</a> and search in the library for "sheets". Then click on activating the API and go through the steps.

### 3. Create a "Service Account" credential

1. In the sidebar on the left, select APIs & Services > Credentials
2. Click blue "+ CREATE CREDENTIALS" and select "Service account" option
3. Enter name, description, click "CREATE"
4. You can skip permissions, click "CONTINUE"
5. Click "+ CREATE KEY" button
6. Select the "JSON" key type option
7. Click "Create" button your JSON key file is generated and downloaded to your machine (it is the only copy!)
8. Click "DONE"
9. Note your service account's email address (also available in the JSON key file)

Keep this JSON file as it is important later. You only get to download it once. To use it in my app I inlined it, aka removed all of the line breaks, then added it to a '.dev.vars' file which the astro-cloudflare adapter uses for env variables in dev mode.

### 4. Share a google sheet with your new Service Account's email address

We need to share a google sheet you want to send the data to with the new Service account's email address you generated. It is exactly the same as sharing it with someone else. In the top right there is a "Share" button. Click this and add your new Service Account's email address.

### 5. Set up authentication in your app

Google has a lot of docs on this as well as a lot of 3rd party articles as well. I have found <a href="https://hookdeck.com/blog/how-to-call-google-cloud-apis-from-cloudflare-workers" target="_blank">this one</a> very helpful if you wanted to build something from scratch. What I did, though, was found someone else's library that did it already. Yay! This handy library called <a href="https://github.com/sagi/workers-jwt" target="_blank">`workers-jwt`</a> by `sagi.io` was exactly what I needed. Basically you need to generate a signed `jwt`, then call google's auth service endpoint with it and that returns a token you can use in your call to the google sheets API. Let's have a look at the new code. Again, I have an api endpoint in astro. Also a service function that holds the meat of the request.

Here is a little example

```javascript
import axios from 'redaxios'
import { getTokenFromGCPServiceAccount } from '@sagi.io/workers-jwt'

// When this is imported this way astro auto parses it
import serviceAccountJSON from './config/myapp-1dd646d7c2af.json'

// Generate the jwt string with the json we got when we created the "Service Account"
const jwt = await getTokenFromGCPServiceAccount({
  serviceAccountJSON,
  payloadAdditions: {
    scope: 'https://www.googleapis.com/auth/spreadsheets'
  },
  aud: 'https://oauth2.googleapis.com/token'
})

// Call to google's auth service to get a token
const oAuthToken = await axios.post('https://oauth2.googleapis.com/token', null, {
  params: {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: jwt
  }
})

// Then use the 'oAuthToken' as a 'Bearer' token in your next call to the google sheets api
```

### 6. Send requests to the google sheets API

Alright, the moment we have all been waiting for, I am sure. We get to see the whole endpoint together.

```javascript
// src/pages/api/form-submit.ts

import { to } from '@utility/awaitTo'
import { addToSheet } from '@services/formSubmitUtility.ts'
import type { addSheetConfig } from '@services/formSubmitUtility.ts'

// Tells astro to not try and prerender this to HTML if in 'hybrid' mode
export const prerender = false

export const POST = async (ctx) => {
  const body = await ctx.request.json()

  // I added these to a '.dev.vars' file which the astro-cloudflare adapter uses for env variables
  const {
    G_SERVICE_ACCOUNT_JSON,
    G_SHEET_ID
  } = ctx.locals.runtime.env

  const sheetPayload = {
    serviceAccountJSON: G_SERVICE_ACCOUNT_JSON,
    sheetId: G_SHEET_ID,
    data: {
      firstName: body.fields.firstName,
      lastName: body.fields.lastName
    }
  }
  const {
    res: sheetRes,
    err: sheetErr
  } = await to(addToSheet(sheetPayload))
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

```javascript
// /src/services/formSubmitUtility.ts
import axios from 'redaxios'
import { getTokenFromGCPServiceAccount } from '@sagi.io/workers-jwt'

export interface addSheetConfig {
  serviceAccountJSON: string,
  sheetId: string,
  data: {
    firstName: string
    lastName: string
  }
}

export const addToSheet = async (config:addSheetConfig) => {
  const { sheetId, serviceAccountJSON, data } = config

  // Generate the jwt string with the json we got when we created the "Service Account"
  const jwt = await getTokenFromGCPServiceAccount({
    serviceAccountJSON: JSON.parse(serviceAccountJSON),
    payloadAdditions: {
      scope: 'https://www.googleapis.com/auth/spreadsheets'
    },
    aud: 'https://oauth2.googleapis.com/token'
  })

  // Call to google's auth service to get a token
  const oAuthToken = await axios.post('https://oauth2.googleapis.com/token', null, {
    params: {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    }
  })

  // updates the row from left to right based on the order of the 'values' array
  // this will add your data to the last empty row on the table
  const payload = {
    requests: [
      {
        appendCells: {
          sheetId: 0,
          fields: '*',
          rows: [
            {
              values: [
                { userEnteredValue: { stringValue: data.firstName }},
                { userEnteredValue: { stringValue: data.lastName }}
              ]
            }
          ]
        }
      }
    ],
    includeSpreadsheetInResponse: false,
    responseIncludeGridData: false
  }
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${oAuthToken.data.access_token}`
    }
  }

  const res = await axios.post(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}:batchUpdate`, payload, axiosConfig)
  return res.data
}
```

I ended up going with the `batchUpdate` and the `AppendCellsRequest` because it would automatically find the last empty row in your sheet. You can adjust the api request to match your needs. Read up on the docs for more about the batch update <a href="https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request#AppendCellsRequest" target="_blank">here</a>.

## Conclusion

I hope this helps someone out there! This was fun figuring out and providing value to a client.
