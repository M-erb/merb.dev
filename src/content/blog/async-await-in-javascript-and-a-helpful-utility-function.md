---
title: Async Await in JavaScript and a helpful utility function
author: Michael Erb
description: How to use async/await in JavaScrip and also introduce a helpful utility function to work with promises
date: 03-27-2024
draft: false
img:
  src: /src/imgs/postImgs/andrew-petrov-hopnkQoC0dg-unsplash.jpg
  byName: Andrew Petrov
  byUrl: https://unsplash.com/@andrewwwpetrov?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  origSrc: https://unsplash.com/photos/human-hand-forming-heart-shape-hopnkQoC0dg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
excerpt: Basically they are a way to handle handling asynchronous actions and then do things after the value returns. For example, in the browser you can make a fetch request and then wait for the request to complete before trying to read the response. Or in nodejs, make a request to the server's file system and wait for the OS to return the file request before working with that data. In this article we are going to go over some really cool ways to work with promises using async/await syntax. Async Await was introduced to add some sugar on top to reduce some of the complex parts of working with promises.
category: tutorial
tags: [js, javascript, programming, async/await, promises]
---

If you do not know what `promises` are in JavaScript then read up on them at <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">MDN</a>. Basically they are a way to handle handling asynchronous actions and then do things after the value returns. For example, in the browser you can make a `fetch` request and then wait for the request to complete before trying to read the response. Or in nodejs, make a request to the server's file system and wait for the OS to return the file request before working with that data. In this article we are going to go over some really cool ways to work with promises using `async/await` syntax.

## Async Await

Then later `async/await` was introduced to add some sugar on top to reduce some of the complex parts of working with promises.

```javascript
function doThing (isError = false) {
	return new Promise((resolve, reject) => {
		if (isError){
			reject('error happened!')
			return
		}

		resolve('look it all went okay!')
	})
}

doThing()
	.then(res => console.log(res)) // 'look it all went okay!'

doThing(true)
	.then(res => console.log(res)) // does not get called
	.catch(err => console.log(err)) // gets called because the reject was called in the promise 'error happened!'
```

In most quick cases this works just fine but things can get messy fast if you are nesting several promises in `then` statments. Have a look at the `async/await` way to handle the above.

```javascript
function doThing (isError = false) {
	return new Promise((resolve, reject) => {
		if (isError){
			reject('error happened!')
			return
		}

		resolve('look it all went okay!')
	})
}

// in most cases we have to use async/await inside of a function declared as an async function untill we get more 'top level await' support
async function main () {
	const res = await doThing() // 👈 we have 'res' at the top level now instead of nested
	console.log(res) // 'look it all went okay!'
}
```

Sweet! We now have access to the return value, `res` in this case, at the top level of our function. If you look back up above our `res` is inside the context block of the `then` statment. This can require some juggling to get that value where you need to use it. As we can see `async/await` makes things flat, instead of having to nest things inside of other functions. There is one thing to keep in mind though, and that is error handling.

### Ways to handle errors

```javascript
function doThing (isError = false) {
	return new Promise((resolve, reject) => {
		if (isError){
			reject('error happened!')
			return
		}

		resolve('look it all went okay!')
	})
}

async function main () {
	const res = await doThing(true) // 👈 we are triggering an error by passing 'true'
	console.log(res) // we do not get to this
}

main() // Uncaught (in promise) error happened!
```

![Always something INNIT](@imgs/postImgs/always-something-grumpy-cat-meme.jpg)

As we can see the above function will break down and throw an error and not continue. This is because we are not telling JS what we want to do with an error in this situation and its default is to just stop. So we need to handle errors in our promises, in other words we need to `catch` them.

Here is an example of using the `.catch()` statment. Notice that we did the same thing above when just using plain promises. That is because `async/await` is still promises:

```javascript
function doThing (isError = false) {
	return new Promise((resolve, reject) => {
		if (isError){
			reject('error happened!')
			return
		}

		resolve('look it all went okay!')
	})
}

async function main () {
	const res = await doThing(true).catch(err => console.log(err))
	console.log(res) // undefined
}

main() // 'error happened!' gets logged but our function does not crap out
```

Its cool that we have this option because, again, `async/await` is just sugar syntax on top of promises. But we are now back to the same problem we were trying to get away from, that is our `err` is nested inside of the `catch`. Now we will have to do some juggling to get that out of there.

Another solution is to use `try/catch`:

```javascript
function doThing (isError = false) {
	return new Promise((resolve, reject) => {
		if (isError){
			reject('error happened!')
			return
		}

		resolve('look it all went okay!')
	})
}

async function main () {
	try {
		const res = await doThing(true)
		console.log(res) // does not run when 'doThing' throws an error
	} catch (err) {
		console.log(err)
	}
}

main() // 'error happened!' gets logged but our function does not crap out
```

Nice, now we have the `try` block were we can handle our 'happy path' code and then a `catch` block were we can handle our errors. The problem here, though, is that if we want to run many promises how do we structure our code? Do we run all of our `awaits` in the same `try` blocks? Then we will need to setup our `catch` block to handle errors from many different promises. This could still get messy depending on the context.

### Keep our success and error values at the top level

I learned this trick from a great youtuber that I cannot track down right now. I will come back and update this when I find it. Basically we create a utility function that will return ether the resolved value of a promise or the error from the reject and we can destructure those values out if it.

```javascript
export async function to (promise) {
	const result = { res: null, err: null }

	try {
		const res = await promise
		result.res = res

		return result
	} catch (err) {
		result.err = err

		return result
	}
}
```

What is happening is we pass in a promise then put it into a `try/catch` block. If no error is thrown after `await`ing it then we return an object with `res` with the value and `null` in the `err` property. If their is an error thrown though, then we return an object with the `res` as `null` and an `err` property with the returned error from the promise.

Using the above utility we can keep our resolved value and error values at the top level:

```javascript
import { to } from './utility/awaitTo'

function doThing (isError = false) {
	return new Promise((resolve, reject) => {
		if (isError){
			reject('error happened!')
			return
		}

		resolve('look it all went okay!')
	})
}

async function main () {
	const {res, err} = await to(doThing(true))
	if (err) console.log(err) // logs: 'error happened!'
	if (res) console.log(res) // does nothing

	// we can use this many times by renaming the res and err properties
	const {res: res2, err: err2} = await to(doThing())
	if (err2) console.log(err2) // does nothing
	if (res2) console.log(res2) // logs: 'look it all went okay!'
}

main()
```

Using a tool like this we can keep things at or near the top level which allows us to use values from one promise and pass it into another promise if need be. All while handling errors too!

## Conclusion

We learned a little about `async/await` and some ways we can handle errors. Hope this helps you the next time you want to use promises!
