---
layout: '@layouts/postLayout.astro'
title: 'Javascript Variables and Scopes'
author: 'Michael Erb'
description: 'Using this as a baseline for future posts'
date: '01-30-2024'
draft: false
postImg: '/src/imgs/postImgs/paul-skorupskas-7KLa-xLbSXA-unsplash-crop-min.jpg'
imgByName: 'Paul Skorupskas'
imgByUrl: 'https://unsplash.com/@pawelskor?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
imgSrc: 'https://unsplash.com/photos/person-holding-camera-lens-7KLa-xLbSXA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
excerpt: 'Diam nginx maecenas uUpellentesque diam volutpat commodo sed egestas. Nisi est sit amet facilisis magna etiam tempor orci. Habitant morbi tristique senectus et netus et. Sed augue lacus viverra vitae congue eu consequat ac. Egestas purus viverra accumsan in nisl. Risus pretium quam vulputate dignissim suspendisse in est ante. Turpis egestas pretium aenean pharetra magna ac.'
---
Variables are one of the foundational building blocks of any programming language and JavaScript is no exception to this. But how do they work? When you are trying to read someone elseses code, including past you's code, where variables are defined can change the meaning. Let's dive into it!

## Variables

Like stated above variables are a very important part of how a program functions. A variable is, simply put, a named reference to a value in computer memory. For example if we want to keep track of a persons name we could do:

```javascript
const personA = 'Jimmy'

console.log(personA) // returns 'Jimmy'
```

So `personA` is the name of the reference, and when we need to 'see' or get what the value is we can use that name in our program.

Alright, awesome. Variables are simple right? We know everything there is to know about them for JavaScript now right? Well, kinda... How you declare them, and where you declare them can change a lot of meaning in your code.

## Different ways to declare a variable in JavaScript

This is the 'how' part of declaring a variable. In modern JS enviornments there are 3 main ways to declare a variable, but I want to try and convince you that you should only use 2 of them.

* using the `var` keyword (there is not a reason to use this one anymore)
* using the `let` keyword
* using the `const` keyword

`var` should be considered a legacy use-case from now on if you want to write consice and easy to read code for you and your team members. To understand why let's move on to the concept of `scope` with variables.

## What is `scope` with variables?

This is the 'where' part of declaring a variable. Both the 'how' and 'where' a variable is declared determines it's scope. Basically `scope` means if a variable can be referenced or accessed in a given place of your code. See <a href="https://developer.mozilla.org/en-US/docs/Glossary/Scope" target="_blank">MDN</a>'s explaination too.

> "The scope is the current context of execution in which values and expressions are "visible" or can be referenced. If a variable or expression is not in the current scope, it will not be available for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa."

Great, so now we know scope has to do with if you can use some variables in parts of your code or not. What determines that though? Glad you asked! There are 4 different types of scope in JavaScript:

* [Global scope](#global-scope), the highest level of scope
* [Block scope](#block-scope), only applies when using `let` and `const` to declare variables
* [Module scope](#module-scope), for code declared in a module
* [Function scope](#function-scope), applies to `var` type of variables

### Global Scope

This is the top level scope, if some code is not a part of any other more specific scope then it is part of the global scope. Most of your variables should not be in the global level to prevent unpredictable code. Also keeping things out of global as much as possible opens up more naming possiblities, especially in larger code bases.

```javascript
var personA = 'Jimmy' // global scope

function doThis () {
	var personB = 'Bob' // function scope
}
```

`personA` is availble globally

### Block Scope

This has to do with `let` and `const` and where they are declared in your code. If you use `let` and/or `const` in a code block it cannot be redeclared without an error being thrown. A 'block', in this context, would be any code declared inside of curly braces `{}`. Check out the example:

```javascript
const personA = 'Bob'
const personA = 'Jimmy' // throws a "redeclaration" error

// same with a let
let personAge = 12
let personAge = 16 // throws a "redeclaration" error

// changing scope
const personA = 'Bob'
if (true) {
	const personA = 'Jimmy' // no error here! even an if statement's {} counts as a new block! The downside here is that 'personA' outside of this block's scope is no longer accessable here in this block.
}
```

Bet your wondering what the difference between `let` and `const` is then if they both cannot be redeclared in the same scope. To try and put it simply `let` allows `assignment` and re-`assignment` a new value to it. In contrast, a `const` does not allow a re-`assignment`. What is meant by `assignment` is basically when you use the `=` equles sign to give a value to a variable. Read more about `assignment` and primitives in my <a href="/blog/deep-clone-javascript" target="_blank">Deep clone in Javascript with structuredClone</a> post.

```javascript
const personA = 'Bob'
const personA = 'Jimmy' // throws an error as 'const' does not allow re-assignment

let personB = 'Jim'
personB = 'Albert' // no error here!
```

It is key to keep in mind the `assignment` part of the definition of `let` and `const`. See the below example where a `const` is assigned to an object and one of the properties of the object can be changed with now error's thrown.

```javascript
const personA = {
	name: 'Jimmy,
	age: 22
}

personA.age = 23 // no error here!

personA = {
	name: 'bob',
	age: 20
} // ERROR!! due to trying to re-assign 'personA', note that the '=' was used
```

### Module Scope

In modern JS a lot of us have moved over to using ES6's <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import" target="_blank">`import`</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export" target="_blank">`export</a> syntax. It has been a hard over-complicated road but I think we are finally coming out on top and for the beter in this transition.

Basically module scope is the scope inside of a module file.

```javascript
// module file you have installed from npm
export function doSomething (arg) {
	const personA = arg + ' name'
	return personA
}

// ./src/your-code-you-import-the-above-into.js
import { doSomething } from 'module-name'

const personA = doSomething('Jimmy')
// we do not get an error for using 'personA' again because the 'doSomething' module has a different scope
```

### Function Scope

This effects the `var` way of declaring a new variable. 


## `var` vs `let` and `const`

This is the part where I try and convince you that you should use `let` and `const` instead of `var` ever again! There is a lot of talk on the inter-webs about why you should stop using `var` and we could re-state those reasons here. In my expirence, though, it all boils down to the fact that `let` and `const` are just a lot more predictable than `var` when it conserns scope. Therefore you can read code faster, and by extention, ship features faster. In my opinion it is that simple. Lets look at some examples.

```javascript
var say = 'hello there!'
var times = 4

if (times > 3) {
	var say = "simple Hello instead"
}

console.log(say) // "simple Hello instead"
```

`var` is very versetile, its so versetile that it is too open to change. Being so open it can be hard to predict what the end value will be. Since `times > 3` then `say` gets re-assigned to a new value. This is a very simple example, but I hope you can see that this can turn into an issue if you did not realize that this value can change. So if you have used `say` in other parts of your code some un-expected things could happen.

As a code convention to combat this you should use `let` when you need to be able to re-assign the value. This alow lets other developers know to look out for possible re-assignments. Then use `const` for everything else.

## Conclution

I hope you took away from this a better understanding of scope and how it works in JavaScript. Also to stop using `var` and use `let` and `const` instead.

Happy coding!
