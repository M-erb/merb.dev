---
layout: '@layouts/postLayout.astro'
title: 'Deep clone in Javascript with structuredClone'
author: 'Michael Erb'
description: 'Lets talk about JavaScript assignment and deep cloning with some examples'
date: '01-19-2024'
draft: false
postImg: '/src/imgs/postImgs/bimata-prathama-ILaug8NMqeg-unsplash-crop-min.jpg'
imgByName: 'Bimata Prathama'
imgByUrl: 'https://unsplash.com/@bedeviere?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
imgSrc: 'https://unsplash.com/photos/man-sitting-on-chair-ILaug8NMqeg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
excerpt: 'Lets start off my asking what is a "deep" clone as opposed to just a regular old "clone"? Or better yet, "Why would we need to know about cloning anyway?" Wow, what great questions! To answer that we need to do a review of how JavaScript primitive values and assignment works. Most programming languages have values called `primitives`. These are the most basic types of values you have to work with to create programs. For example, in JavaScript there are 7 primirtive types'
---
Let's start off by asking what is a "deep" clone as opposed to just a regular old "clone"? Or better yet, "Why would we need to know about cloning anyway?" Wow, what great questions! To answer that, we need to do a review of how JavaScript primitive values and assignment works.

## Assignment and copying variables

Most programming languages have values called `primitives`. These are the most basic types of values you have to work with to create programs. For example, in JavaScript there are 7 primitive types: [`string`](https://developer.mozilla.org/en-US/docs/Glossary/String), [`number`](https://developer.mozilla.org/en-US/docs/Glossary/Number), [`bigint`](https://developer.mozilla.org/en-US/docs/Glossary/BigInt), [`boolean`](https://developer.mozilla.org/en-US/docs/Glossary/Boolean), [`undefined`](https://developer.mozilla.org/en-US/docs/Glossary/Undefined), [`symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol), [`null`](https://developer.mozilla.org/en-US/docs/Glossary/Null). Follow those links if you want to read more about them. Something very important to know here is that primitive values are `immutable`. In other words, a primitive cannot be changed. This is important for later.

Then `assignment` is where a variable is assigned or given a value to keep reference to on the computer's memory. Another way to say this is your program is using some of your computer's memory to keep track of values and how they may change. Some call these "pointers" or "references" to memory. Look at this example of how this works.

Primitives example:
```javascript
let myage = 30
console.log(myage) // returns 30 in the console

let yourage = myage
console.log(yourage) // returns 30 as we would expect

// lets add something to the first variable
myage = myage + 1
console.log(myage) // returns 31 in the console
console.log(yourage) // returns 30 as we would expect
```

We are not breaking any ground here yet. In fact, you may have written code similar to the above many times and nothing bad has ever happened with it. Now some may mistakenly, but understandably, think that this value given to a variable is unique and only that variable has access to it. Given the example above, we are not given a reason to think differently. So when we assign a variable it would "copy" and create a new value for the next variable. But that is not always true 😱! Let us look at the next example to illustrate that.

Objects example:
```javascript
const personA = {
	age: 30
}
console.log(personA.age) // returns 30

const personB = personA
console.log(personB.age) // returns 30

// lets change personA
personA.age = personA.age + 1
console.log(personA.age) // returns 31
console.log(personB.age) // returns 31... wait what??!?
```

Alright, recap time. You see, in the Primitives example we are using primitive numbers. Again, these are immutable, a.k.a, they cannot be changed. Since they cannot be changed, JavaScript has it built in to just create a new value in memory and references that new value. That is why we could change the original `myage` variable and it didn't have any affect on the `yourage` value. At that point, they were two different points in memory.

***NOTE***: that this also applies to using arrays and other data structures.

So what happened with the second example with objects? The key there is that we are using a non-primitive type and JavaScript can reference the same points in memory. So when we assigned `personA` to `personB` we copied over the "reference" of `personA` and not the "value." This is what people mean by "deep clone" when they want to copy values to another place. Not references to existing values that other variables can edit, but the actual new values.

## Problem: I want to create a copy of an object aka a "deep clone"

How do we do that? Another great question! You are good at this! I am going to give you 4 effective ways to do this, but the last one is the best in my opinion.

1. Using `JSON.stringify()` then `JSON.parse()`
2. Use a library that can "deep clone"
3. Use `Object.assign()` to create a "shallow" copy
4. Use the built in JavaScript API `structuredClone`

### 1. Use JSON.stringify()

This is very easy but comes with possible data loss. Basically, you are turning the data structure into a `json` string and then parsing it back into a JavaScript object. Stringify does its best to convert non-JSON values to ones it supports. Details can be seen in this [MDN JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) article. For example, `Date` will become a string and stay a string on parse. Functions/methods that may have been on the object will be omitted or turned to a `null` value to name a few.

```javascript
const personA = {
	age: 30
}
console.log(personA.age) // returns 30

const personB = JSON.parse(JSON.strigify(personA))
console.log(personB.age) // returns 30

// lets change personA
personA.age = personA.age + 1
console.log(personA.age) // returns 31
console.log(personB.age) // returns 30, yay no side effects!
```

This solution gets the job done but with data loss and [benchmarks](https://jsben.ch/bWfk9) show this is most likely the slowest solution. I cannot state enough, please do not use this option.

### 2. Use a library

There are many libraries that can do this. A very popular one is [lodash](https://github.com/lodash/lodash) which contains many utility functions for working with objects and arrays. I would recommend using the [lodash-es](https://www.npmjs.com/package/lodash-es) though if you are using esmodules as it is treeshakeable.

```javascript
import { cloneDeep } from 'lodash-es'

const personA = {
	age: 30
}

const personB = cloneDeep(personA)

// lets test if it was cloned or not!
personA.age = personA.age + 1
console.log(personA.age) // returns 31
console.log(personB.age) // returns 30, yay no side effects!
```

### 3. Use Object.assign() for a shallow copy

`Object.assign()` copies all of the "own properties" of some *source* objects to a *target* object and returns the modified *target* object. But it only does this shallowly because if any of the properies are an object or array they will be *referenced* and not *copied*.

```javascript
const personA = {
	age: 30,
	a: {
		b: 30
	}
}
console.log(personA.age) // returns 30
console.log(personA.a.b) // returns 30

const personB = Object.assign({}, personA) // use an object literal '{}' as the 'target'
console.log(personB.age) // returns 30
console.log(personB.a.b) // returns 30

// lets change personA
personA.age = personA.age + 1
console.log(personA.age) // returns 31
console.log(personB.age) // returns 30, yay no side effects!

// Lets change one deeper though...
personA.a.b = personA.a.b + 1
console.log(personA.a.b) // returns 31
console.log(personB.a.b) // returns 31... oh no, side effects 😱!
```

As we can see the "deeper" nested object was a reference to the same value in memory. So `Object.assign()` only clones shallowly.

### 4. Use structuredClone

Now, we are to the best option. No need to `import`/`require` anything. Support in all [major browsers](https://caniuse.com/?search=structuredClone) for years now. Support in `node.js` since v17. It is just ready to be used globally.

```javascript
const personA = {
	age: 30,
	a: {
		b: 30
	}
}
console.log(personA.age) // returns 30
console.log(personA.a.b) // returns 30

const personB = structuredClone(personA) // so simple 🤙
console.log(personB.age) // returns 30
console.log(personB.a.b) // returns 30

// lets change personA
personA.age = personA.age + 1
console.log(personA.age) // returns 31
console.log(personB.age) // returns 30, yay no side effects!

// Lets change one deeper though...
personA.a.b = personA.a.b + 1
console.log(personA.a.b) // returns 31
console.log(personB.a.b) // returns 30, yay still no side effects! 👍
```

As you can see, no side effects to the top level or any level of an object. This even works on arrays of objects.

```javascript
const myCars = [
  {
    color: 'purple',
    type: 'minivan',
    registration: new Date('2017-01-03'),
    capacity: 7
  },
  {
    color: 'red',
    type: 'station wagon',
    registration: new Date('2018-03-03'),
    capacity: 5
  }
]

const yourCars = structuredClone(myCars)
console.log(myCars[0].capacity) // returns 7
console.log(yourCars[0].capacity) // returns 7

myCars[0].capacity = 8
console.log(myCars[0].capacity) // returns 8
console.log(yourCars[0].capacity) // returns 7, yay no side effects!
```

## Conclusion

Things I hope we learned from this:

* Assignment `=` does not mean equals or to create a brand new copy but means given a value or reference in memory.
* A shallow copy only provides new values for the top level properties, but gives references to existing values for other levels.
* A deep copy provides new values on all levels.
* `structuredClone` is an awesome new JS API we should use from now on when we need to clone objects.
