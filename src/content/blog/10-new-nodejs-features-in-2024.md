---
title: 10 New Nodejs features in 2024
author: Michael Erb
description: Using this as a baseline for future posts
date: 10-12-2024
draft: false
img:
  src: /src/imgs/postImgs/jorge-rosal-IGfoMhQhtwo-unsplash.jpg
  byName: Jorge Rosal
  byUrl: https://unsplash.com/@yortrosal?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  origSrc: https://unsplash.com/photos/a-dog-lays-on-a-bed-next-to-a-laptop-IGfoMhQhtwo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
excerpt: I am really excited about these changes. These 10 features, to me, represent that the node org and the javascript community as a whole is moving forward and maturing even more. Could not be happier. 1. Nodejs can run Typscript!... kind of. There are some things that I will list...
category: other
tags: [js, javascript, programming]
---

## This is a game changer

I am really excited about these changes. These 10 features, to me, represent that the node org and the javascript community as a whole is moving forward and maturing even more. Could not be happier.

## 1. Nodejs can run Typscript!... kind of `--experimental`

There are some things that I will list below to be aware of. But, yes, typscript `.ts` files can now be run in nodejs. This is really exciting news which makes it so you do not have to use something like `tsx` package to transpile your typscript code to javascript code.

### Type stripping vs simple transform types

It is good to keep in mind that this feature is not actually running `typescript`. It is stripping/removing the ts type annotations from the code so it just reads javascript. At the time of this writing with v22.8.0 this is behind an experimental flat of `--experimental-strip-types`. This will do no transformations or type checking. But your editor like vscode will still show type errors in the editor like always.

```bash
node --experimental-strip-types my-best-typscript.ts
```

**Note** that this will still error for some typescript code that requires transformations to work. For this there is another flag `--experimental-transform-types` that will allow this kind of ts code.

```bash
node --experimental-transform-types my-typescript-needing-transforms.ts
```

Some of the features that require transformation are:

* Enum
* namespaces
* legacy module
* parameter properties

### Importing types

We should all be using the `type` keyword when importing our types nowadays but I am sure there is still code out there that dose not.

This will work fine.

```typescript
import type { myType, yourType } from './module.ts'
import { someFn } from '../utils.ts'
```

This will throw an error, no no 🙂‍↔️.

```typescript
import { myType, yourType } from './module.ts'
import { someFn } from '../utils.ts'
```

### My thoughts
Really really cool. This is the best feature on this list, I believe, for the future of nodejs. Having some kind of easy type checking, in general will help the javascript community mature. Typescript has been dominating that landscape so it just makes sense to add at least a little support for it.

### Read more
Can read more about this feature in the [node docs](https://nodejs.org/api/typescript.html).

## 2. SQLite `--experimental`

Ever wanted a quick database for just trying out an idea? Well node.js has added the beloved SQLite under an experimental flag `--experimental-sqlite` to use out of the box. As of Node.js v22.9.0 this is still in active development and may change so I would not recommend anything other than hobby projects. Here are some examples taken from the nodejs docs for an in-memory DB:

```javascript
'use strict';
const { DatabaseSync } = require('node:sqlite');
const database = new DatabaseSync(':memory:');

// Execute SQL statements from strings.
database.exec(`
  CREATE TABLE data(
    key INTEGER PRIMARY KEY,
    value TEXT
  ) STRICT
`);
// Create a prepared statement to insert data into the database.
const insert = database.prepare('INSERT INTO data (key, value) VALUES (?, ?)');
// Execute the prepared statement with bound values.
insert.run(1, 'hello');
insert.run(2, 'world');
// Create a prepared statement to read data from the database.
const query = database.prepare('SELECT * FROM data ORDER BY key');
// Execute the prepared statement and log the result set.
console.log(query.all());
// Prints: [ { key: 1, value: 'hello' }, { key: 2, value: 'world' } ]
```

**Note** that this can only work when imported using the `node:` scheme.

```javascript
const sqlite = require('node:sqlite')
```

### My thoughts
Having this built into nodejs will be amazing as SQLite is such as widely used database AND it is very flexible will make nodejs more versatile. Instead of having to rely on a 3rd party package that may lose support any day. A win, for sure, for nodejs.

### Read more
https://nodejs.org/api/sqlite.html

## 3. `.env` support `--active-development`

Beginning in Node.js v20.6.0 node supports using `.env` files for environment variables. No more needing to install another package or two for using this very popular way of configuring environment variables.

When starting your nodejs app you would also pass the `--env-file` flag to have node look for and load a `.env` file.

```bash
node --env-file=.env index.js
```

Support for multible env files as well!

```bash
node --env-file=.env --env-file=.development.env index.js
```

### My thoughts
This is another little win for the nodejs community. One less packages to have to install when setting up a new project.

### Read more
https://nodejs.org/dist/latest-v20.x/docs/api/cli.html#--env-fileconfig

## 4. Built in test runner `--stable`

No need for hunting and arguing over which test runner is the best, nodejs has you covered. Built right in:

```javascript
const test = require('node:test')

test('synchronous passing test', (t) => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1)
})

test('synchronous failing test', (t) => {
  // This test fails because it throws an exception.
  assert.strictEqual(1, 2)
})

test('asynchronous passing test', async (t) => {
  // This test passes because the Promise returned by the async
  // function is settled and not rejected.
  assert.strictEqual(1, 1)
})

test('failing test using Promises', (t) => {
  // Promises can be used directly as well.
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      reject(new Error('this will cause the test to fail'))
    })
  })
})

test('callback passing test', (t, done) => {
  // done() is the callback function. When the setImmediate() runs, it invokes done() with no arguments.
  setImmediate(done)
})

test('callback failing test', (t, done) => {
  // When the setImmediate() runs, done() is invoked with an Error object and the test fails.
  setImmediate(() => {
    done(new Error('callback failure'))
  })
})
```

Subtests are supported as well:

```javascript
test('top level test', async (t) => {
  await t.test('subtest 1', (t) => {
    assert.strictEqual(1, 1)
  })

  await t.test('subtest 2', (t) => {
    assert.strictEqual(2, 2)
  })
})
```

Can skip tests as well:

```javascript
// The skip option is used, but no message is provided.
test('skip option', { skip: true }, (t) => {
  // This code is never executed.
})

// The skip option is used, and a message is provided.
test('skip option with message', { skip: 'this is skipped' }, (t) => {
  // This code is never executed.
})

test('skip() method with message', (t) => {
  // Make sure to return here as well if the test contains additional logic.
  t.skip('this is skipped')
})
```

### My thoughts
Unless there is a specific reason to use another, I would recommend at least checking this out as it has all the basics covered.

### Read more
https://nodejs.org/api/test.html

## 5. Built in watch mode `--stable`

This is a simple replacement for most of the use cases of a package like `nodemon` which watches your nodejs files and re-starts the process if one of them changes.

```bash
node --watch index.js
```

Related is the `--watch-path` which also starts the watch mode but only for specific files:

```javascript
node --watch-path=./src --watch-path=./tests index.js
```

**Note** if you use desktop linux for dev (like me) then you should be aware that `--watch-path` does not work there. Only support for MacOS and windows at this time. But `--watch` works just fine. I hope this changes in the future.

There is also the `--watch-preserve-output` that can be combined with the above flags to stop the console output from being cleared on each restart.

```javascript
node --watch --watch-preserve-output test.js
```

### My thoughts
This is one of those features that should have been added a long time ago. Very nice seeing it added now.

### Read more
https://nodejs.org/api/cli.html#--watch

## 6. Glob support `--experimental`

Apparently glob support has been in nodejs for many many years but was an internal API. Recently this API has been exposed so the rest of us can use it now. A theme you may have noticed of some of these features is that this is one less package you will need to install.

Basically globs are patterns to select many different files using a 'wild card' syntax. Most CLI programs support these patterns to some degree.

This support is being added to a few different nodejs file system APIs but below is one example. This will select all `js` files in all directories:

```javascript
const { glob } = require('node:fs/promises')

(async () => {
  for await (const entry of glob('**/*.js'))
    console.log(entry)
})()
```

To learn more about glob patterns check out this website: <a href="https://globster.xyz/" target="_blank">globster.xyz</a>

### Read more
https://nodejs.org/docs/latest/api/fs.html#fspromisesglobpattern-options

## 7. Top level await

This feature has a lot of devs that want their code to look cleaner very happy. But it has come with some interesting edge cases that has me second guessing whether I should be using it or not. Read more about what is being called the <a href="https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221" target="_blank">Food Gun</a>

Besides that, basically this feature allows us to `await` a promise at the top level of a module without having to wrap it in an `async` function.

```javascript
await myAsyncFunc() // yay!
```

**Note** This is only available in `ESM` files/projects. So you will need to either use the `.mjs` file extension that tells node that it is an ESM module or switch your whole project to ESM by putting `"type": "module"` in your `project.json` file.

```json
{
  "name": "merb.dev",
  "type": "module", // <-- tells nodejs that your whole project should be assumed using ESM
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "npm run dev",
    "dev": "astro dev",
    "build": "astro build",
    "preview-astro": "astro preview",
    "astro": "astro",
    ...
  },
  "dependencies": {
    "astro": "^4.5.5",
    ...
  },
}

```

### Read more
https://nodejs.org/en/blog/release/v14.8.0/
https://gist.github.com/Rich-Harris/0b6f317657f5167663b493c722647221

## 8. Experimental websocket support `--experimental`

Starting in Node.js 21.0.0 node is adding support for websockets. Another example of the node team making it possible to not have to install another package.

Need to use the `--experimental-websocket` flag to enable this feature.

```bash
node --experimental-websocket index.js
```

```javascript
// Create WebSocket connection
const socket = new WebSocket('ws://localhost:3000')

// Connection opened
socket.addEventListener('open', (event) => {
  socket.send('Hello Server!')
})

// Listen for messages
socket.addEventListener('message', (event) => {
  console.log('Message from server ', event.data)
})
```

### Read more
https://nodejs.org/en/blog/announcements/v21-release-announce#built-in-websocket-client

https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

## 9. Asynchronous context tracking (aka Async localstorage) `--stable`

These are really cool and can be thought of as similar to the `express` feature of `context`. This will provide a better, faster, memory safe way of storing data throughout the lifetime of an asynchronous request. Like an HTTP request.

This is 'memory safe' in that each asynchronous task has its own 'context' and no risk of mistakenly sharing that data between requests.

```javascript
import http from 'node:http'
import { AsyncLocalStorage } from 'node:async_hooks'

const asyncLocalStorage = new AsyncLocalStorage()

function logWithId(msg) {
  const id = asyncLocalStorage.getStore()
  console.log(`${id !== undefined ? id : '-'}:`, msg)
}

let idSeq = 0
http.createServer((req, res) => {
  asyncLocalStorage.run(idSeq++, () => {
    logWithId('start')
    // Imagine any chain of async operations here
    setImmediate(() => {
      logWithId('finish')
      res.end()
    })
  })
}).listen(8080)

http.get('http://localhost:8080')
http.get('http://localhost:8080')
// Prints:
//   0: start
//   1: start
//   0: finish
//   1: finish
```

### My Thoughts
I have not experimented with it yet but just awesome that this is one less package a dev needs to install to be more web compatible.

### Read more
https://nodejs.org/api/async_context.html#class-asynclocalstorage

## 10. Single executable app `--active-development`

First added to Node.js v18.16.0 and is still being worked on. This feature allow a node app to be combined into an executable file and distributed to other systems that do not have node installed and still be run. Your app would be built with everything it needs to run on a specific version of node on its own. This would allow sharing versions of your app to others that do not have node installed and still use the program.

### My thoughts
I can't say I have experience using this feature but I am excited for it to get easier to use. It would be awesome if we could deploy to, potentially cheaper, hosting services your combined app and it would just run without laying ground work for node specifically.

### Read more
https://nodejs.org/api/single-executable-applications.html#single-executable-applications

## Conclusion

I believe other server side javascript run-times coming out has put some pressure on the Node.js team to be more competitive. Which is good for all of us devs. I look forward to the future of these and other features that will make devs lives easier.
