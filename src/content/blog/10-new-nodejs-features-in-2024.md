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

## 1. Nodejs can run Typscript!... kind of

There are some things that I will list below to be aware of. But, yes, typscript `.ts` files can now be run in nodejs. This is really exciting news which makes it so you do not have to use something like `tsx` package to transpile your typscript code to javascript code.

### Type stripping vs simple transform types

It is good to keep in mind that this feature is not actually running `typescript`. It is stripping/removing the ts type anotations from the code so it just reads javascript. At the time of this writing with v22.8.0 this is behind an experimental flat of `--experimental-strip-types`. This will do no transformations or type checking. But your editor like vscode will still show type errors in the editor like always.

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

We should all be using the `type` keyword when importing our types nowadays but I am sure there is still code out there that dosn't.

This will work fine.

```typescript
import type { myType, yourType } from './module.ts'
import { someFn } from '../utils.ts'
```

This will have an aneurysms (a.k.a, give an error).

```typescript
import { myType, yourType } from './module.ts'
import { someFn } from '../utils.ts'
```

### Read more

Can read more about this feature in the [node docs](https://nodejs.org/api/typescript.html).

## 2. SQLite

https://nodejs.org/api/sqlite.html

## 3. `.env` support

https://nodejs.org/en/blog/release/v20.6.0#built-in-env-file-support

## 4. Built in test runner

https://nodejs.org/api/test.html

## 5. Built in watch mode

https://nodejs.org/api/cli.html#--watch

## 6. Glob support

https://nodejs.org/docs/latest/api/globals.html

## 7. Top level await

https://nodejs.org/en/blog/release/v14.8.0/

## 8. Experimental websocket support

https://nodejs.org/en/blog/announcements/v21-release-announce#built-in-websocket-client

## 9. Async localstorage

https://nodejs.org/api/async_context.html#class-asynclocalstorage

## 10. Single excutable app

https://nodejs.org/api/single-executable-applications.html#single-executable-applications
