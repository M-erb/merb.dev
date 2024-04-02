---
title: Javascript array methods
author: Michael Erb
description: Go over some tips and tricks about array methods, when to use them and such.
date: 04-02-2024
draft: false
img:
  src: /src/imgs/postImgs/alex-block-vWI1kTcMcDI-unsplash.jpg
  byName: Alex Block
  byUrl: https://unsplash.com/@alexblock?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
  origSrc: https://unsplash.com/photos/flat-lay-photography-of-boxes-of-berries-vWI1kTcMcDI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash
excerpt: Welcome back to another fundamentals post. This time about javascript array methods. We will go over several and some tips & tricks for each. These will greatly help you out as you do not always have to come up with the boilerplate code for preforming some algorithms. Array.prototype.at(), This is a newer method added relatively recently. Make sure to checkout...
category: fundamentals
tags: [js, javascript, programming, array]
---

Welcome back to another fundamentals post. This time about javascript array methods. We will go over several and some tips & tricks for each. These will greatly help you out as you do not always have to come up with the boilerplate code for preforming some algorithms.

* [Array.prototype.at()](#arrayprototypeat)
* [Array.prototype.filter()](#arrayprototypefilter)
* [Array.prototype.sort()](#arrayprototypesort)
* [Array.prototype.toSorted()](#arrayprototypetosorted)
* [Array.prototype.map()](#arrayprototypemap)
* [Array.prototype.push()](#arrayprototypepush)
* [Array.prototype.reduce()](#arrayprototypereduce)

## Array.prototype.at()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at" target="_blank">MDN</a>

This is a newer method added relatively recently. Make sure to checkout <a href="https://caniuse.com/mdn-javascript_builtins_array_at" target="_blank">caniuse.com</a> to make sure it works in your target browsers or use a polyfill. It is in all major browsers but sometimes we need things to work in the outliers too.

This method allows you to get back an item in an array based on the index you provide. It also supports negative values to start from the end of the array instead of the start. Cannot use a negative index using bracket notation.

```javascript
const arr = [12, 'wow', { name: 'jimmy' }, 100]

const example = arr.at(0) // 12
const example2 = arr.at(-1) // 100
const example3 = arr.at(2) // { name: 'jimmy' }
```

## Array.prototype.filter()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank">MDN</a>

Basically you want to see which items in an array match some criteria. Such as all items that are the color red. You provide a function to `filter` that runs for each item in the array. Your function needs to return a `truthy` or `falsy` of whether or not that item should be a part of the resulting array.

This does not mutate, or change the original array, but returns a new array based on the original.

```javascript
const arr [
	{
		name: 'sports car',
		color: 'red'
	},
	{
		name: 'mini van',
		color: 'yellow'
	},
	{
		name: 'big wheel',
		color: 'blue'
	},
	{
		name: 'hummer',
		color: 'red'
	}
]

const redThings = arr.filter(item => item.color === 'red')
console.log(redThings) // [{ name: 'sports car', color: 'red' }, { name: 'hummer', color: 'red' }]
```

## Array.prototype.sort()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" target="_blank">MDN</a>

This one is for when you want to rearrange the items in an array by comparing them to each other. For example, you want to sort by people's names in ascending or descending order. `sort` can be tricky at first because by default it actually converts each item in an array to a string first, then compares and sorts in ascending order. This can have unexpected results when working with an array of numbers or objects, for example.

This DOES mutate the original array

```javascript
const arrOfStrings = ['zzz', 'ggg', 'bbb', 'aaa', 'eee']
arrOfStrings.sort() // ['aaa','bbb','eee','ggg','zzz']

const arrOfNums = [100, 50, 23, 1000]
arrOfNums.sort() // [ 100, 1000, 23, 50 ]
```

You can provide your own compare function, though, to sort things in your own way. So you are not stuck with the default behavior. There are two arguments in the compare function, generally called `a` and `b`. When comparing these two arguments you need to return a number that is one of three things as follows:

* (-1) A negative value indicates that `a` should come before `b`
* (1) A positive value indicates that `a` should come after `b`
* (0 or `NaN`) Zero or `NaN` indicates that `a` and `b` are considered equal and therefore do not change the order

```javascript
const arrOfNums = [100, 50, 23, 1000]

// ascending order
arrOfNums.sort((a, b) => a - b) // [23, 50, 100, 1000]

// descending order
arrOfNums.sort((a, b) => b - a) // [1000, 100, 50, 23]
```

You can also do this for an array of objects. For example, an array of people objects and you want to sort by age.

```javascript
const arrOfPeople = [
	{
		name: 'Tony Stark',
		heroName: 'Iron Man',
		age: 39
	},
	{
		name: 'Steve Rogers',
		heroName: 'Captain America',
		age: 93
	},
	{
		name: 'Peter Parker',
		heroName: 'Spider Man',
		age: 18
	}
]

// ascending order
arrOfPeople.sort((a, b) => a.age - b.age)
// result: [{ name: 'Peter Parker'... }, { name: 'Tony Stark'... }, { name: 'Steve Rogers'... }]

// descending order
arrOfPeople.sort((a, b) => b.age - a.age)
// result: [{ name: 'Steve Rogers'... }, { name: 'Tony Stark'... }, { name: 'Peter Parker'... }]
```

## Array.prototype.toSorted()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted" target="_blank">MDN</a>

This is the same as `Array.prototype.sort()` except `toSorted()` does not mutate or change the original array. This is a brand new method added and it is supported by all major browsers but just check <a href="https://caniuse.com/?search=toSorted" target="_blank">caniuse.com</a> to make sure you don't need a polyfill or not.

```javascript
const arrOfStrings = ['zzz', 'ggg', 'bbb', 'aaa', 'eee']
const sortedStrings = arrOfStrings.toSorted() // ['aaa','bbb','eee','ggg','zzz']
console.log(arrOfStrings) // not changed ['zzz', 'ggg', 'bbb', 'aaa', 'eee']

const arrOfNums = [100, 50, 23, 1000]
const defaultSortOfNums = arrOfNums.toSorted() // [ 100, 1000, 23, 50 ]
console.log(arrOfNums) // not changed [100, 50, 23, 1000]

const sortAsNums = arrOfNums.toSorted((a, b) => a - b) // [23, 50, 100, 1000]
console.log(arrOfNums) // not changed [100, 50, 23, 1000]
```

## Array.prototype.map()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="_blank">MDN</a>

This creates a new array based on the rules in the function you provide. The resulting array can be of a different shape and length than the original array. Lets say we want to get an array of only the names of an array of objects.

```javascript
const arrOfPeople = [
	{
		name: 'Tony Stark',
		heroName: 'Iron Man',
		age: 39
	},
	{
		name: 'Steve Rogers',
		heroName: 'Captain America',
		age: 93
	},
	{
		name: 'Peter Parker',
		heroName: 'Spider Man',
		age: 18
	}
]

const namesOnly = arrOfPeople.map(item => item.name )
// [ 'Tony Stark', 'Steve Rogers', 'Peter Parker' ]

const nameAgeOnly = arrOfPeople.map(item => {
	const { name, age } = item
	return { name, age }
})
// [{ name:'Tony Stark',age:39 },{ name:'Steve Rogers',age:93 },{ name:'Peter Parker',age:18 }]
```

## Array.prototype.push()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push" target="_blank">MDN</a>

This adds a new item in an array at the end. Pretty simple. Does modify the original array.

```javascript
const arrOfPeople = [
	{
		name: 'Tony Stark',
		altName: 'Iron Man',
		age: 39
	},
	{
		name: 'Steve Rogers',
		heroName: 'Captain America',
		age: 93
	},
	{
		name: 'Peter Parker',
		heroName: 'Spider Man',
		age: 18
	}
]

console.log(arrOfPeople.length) // 3

arrOfPeople.push({
	name: 'Natasha Romanoff',
	heroName: 'Black Widow',
	age: null
})

console.log(arrOfPeople.length) // 4
```

## Array.prototype.reduce()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" target="_blank">MDN</a>

Used for bringing all of the values of an array into one value. For example, you want to figure out what the total is if you add an array of numbers together. Or, what the total age is of an array of people. Does not mutate the original array. Takes a function where you define how you want to combine the array together. This function takes at least two arguments and you can name them whatever you would like. I like to use `a` and `b` just to keep things short. `a` is the 'accumulator' as this is where the accumulated values are stored and put together on each iteration of the array. `b` is the 'current value' of the iteration on the array. So you can think of `a` as all of the past items put together already, and `b` as a single current array item to add to that.

```javascript
const arrOfNums = [100, 50, 23, 1000]
const sumOfNums = arrOfNums.reduce((a, b) => a + b) // 1173

const arrOfPeople = [
	{
		name: 'Tony Stark',
		altName: 'Iron Man',
		age: 39
	},
	{
		name: 'Steve Rogers',
		heroName: 'Captain America',
		age: 93
	},
	{
		name: 'Peter Parker',
		heroName: 'Spider Man',
		age: 18
	}
]
const combinedAge = arrOfPeople.reduce((a, b) => (a.age ?? a) + b.age) // 150
```

Notice that I used `a.age ?? a`. Basically this means try to use `a.age` but if that is `undefined` or `null` then just use `a`. Why would that be needed? `reduce()` needs to know where to start. In the example above we did not provide a starting value so I opted to use `a.age` as that should start out with the first item in the array and point to it's age property. But after that `a` is going to just be a number which is would be the accumulation of the values so far. Therefore, after that first value we just want to reference `a` with no props as it is just a number now.

## Conclusion

I hope this helped you in some way understanding some of the array methods available to us in JS.
