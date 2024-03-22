---
title: 'How to host nodejs with nginx using reverse proxy'
author: 'Michael Erb'
description: 'Explains how to setup Nginx with nodejs and serve up static files too!'
date: '03-22-2024'
draft: false
img:
  src: '/src/imgs/postImgs/dan-meyers-TieB9BG7ud0-unsplash-min.jpg'
  byName: 'Dan Meyers'
  byUrl: 'https://unsplash.com/@dmey503?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
  origSrc: 'https://unsplash.com/photos/a-river-running-through-a-lush-green-field-TieB9BG7ud0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
excerpt: There are a lot of different types of proxies in computer networking. A reverse proxy is when you have a server(Nginx) in front of a group of client machines(browser's in our case). When requests come in from those client's the reverse proxy intercepts them and then talks to other server's on behalf of the client. It is very possible to host your nodejs app on ports `80`(HTTP) and `443`(HTTPS) but you loose out on some really cool capabilities that Nginx brings when you do that. Some examples...
category: 'devOps'
tags: [nginx, webserver, certbot, reverse proxy, nodejs]
---

Welcome to the nginx learning series! If you haven't learned about installing and creating server blocks then try out the links below. This article assumes you already have nginx installed on Ubuntu and a domain name and are pointing it to your server's public IP address as well as a server block setup for your site.

Article series:
1. <a href="/blog/how-to-install-nginx-ubuntu" target="_blank">How to install nginx on Ubuntu</a>
2. <a href="/blog/how-to-host-sites-with-nginx-and-server-blocks" target="_blank">How to host sites with nginx and server blocks</a>
3. <a href="/blog/how-to-add-free-ssltsl-https-to-nginx-using-lets-encrypt" target="_blank">How to add FREE SSL/TSL and HTTPS to nginx using Let’s Encrypt</a>
4. How to host nodejs with nginx using reverse proxy 👈 you are here
5. Nginx commands and configuration examples 🫥 coming soon!

This article focuses on using nodejs with nginx. Though, it can still be followed along even if you are using a different runtime (Deno, Bun, etc.) or language (go, c#, php, etc.). You just may need to look into the specifics of the other tool you are using.

## What is a reverse proxy?

There are a lot of different types of proxies in computer networking. <a href="https://en.wikipedia.org/wiki/Proxy_server" target="_blank">Rabbit hole 1</a> and <a href="https://proxyway.com/guides/types-of-proxies" target="_blank">rabbit hole 2</a> if you want to read about them.

A reverse proxy is when you have a server(Nginx) in front of a group of client machines(browser's in our case). When requests come in from those client's the reverse proxy intercepts them and then talks to other server's on behalf of the client.

## Sounds like a lot, why reverse proxy?

It is very possible to host your nodejs app on ports `80`(HTTP) and `443`(HTTPS) but you loose out on some really cool capabilities that Nginx brings when you do that. Some examples:

* This will be the only website that can run on that server (without having to do a whole lot of unnecessary work)
* Will lose out on security features such as handling SSL/TLS connections, fast rate limiting, and more!
* Easy builtin load balancing
* Extremely fast static file responses

To put it simply, you can focus your app to be REALLY good at the thing you need it to do. Instead of having to build in all of this extra important stuff that is getting in the way of just working on your app. It also gives you more control over the experience of your users.

## Alright, you convinced me, how do we do this?

Here is a basic Nginx server block config for serving up static files, a.k.a a static site.

```nginx
server {
  listen 80;
  listen [::]:80;

  root /var/www/example.com/public;
  index index.html;

  server_name example.com www.example.com;

  location / {
    try_files $uri $uri/ =404;
  }
}
```

Notice the `location / { ...` line. This tells Nginx to serve the root and all other paths that do not have a more specific `location` set on these rules. Then the next nested line of `try_files $uri $uri/ =404;` this says to try looking in the `root` for files that match the path of the request and if not return a `404` error.

If you have been following along with this series then we should have the above config already setup. It may look different, though, due to `certbot` adding SSL/TLS if you did that part. Just ignore the parts that say something along the lines of `# managed by certbot`

Nginx can serve up static files super fast. Way faster than nodejs can because it has been optimized for it. With that in mind we want to configure Nginx to serve up static files BUT also serve up our node app if We are going to use an idea called `named locations` to define the features we want to use with our nodejs app specifically.

### Less talk, show me the code!!

Okay okay! Open up an editor of your site's Nginx config:

```bash
sudo nano /etc/nginx/sites-available/example.com
```

```nginx
server {
  listen 80;
  server_name example.com;

  root /var/www/example.com/public;

  location / {
    try_files $uri @backend;
  }

  location @backend {
    proxy_pass http://localhost:3000;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    # Following is necessary for Websocket support
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

You should notice some differences between the basic one further above and this one ⬆️.

1. Added a new location block of `location @backend`
2. Added `@backend` in place of `$uri/ =404`

#### 1. `location @backend`

This is called a `named location` and allows us to set some config up in a reusable way. Kinda like a function. We are defining our node app here. We use `proxy_pass` to tell Nginx what to do with traffic to this block, and that is pass it on to our node app which is running locally on port `3000`. Then we define some headers for this proxy such as passing the client's IP address along to our node app in case we need it.

#### 2. `@backend` in place of `$uri/ =404`

Here is where we are telling Nginx "hey, try to look for a file at the pass the client requests. BUT if we cannot find anything then try the same path at this named block of @backend." Then your node app will respond with what you created it to do such as some JSON or even serving up an HTML page.

In this set up your node app will handle all 404s. If you do not want this then you can also tell Nginx to use a custom static 404 page if your node app returns a `404` status code.

```nginx
server {
  # ...

  location / {
    try_files $uri @backend;
    error_page 404 404.html;
  }

  # ...
}
```

This will tell Nginx to goto this `404.html` page in your `root` if both a static file cannot be found AND your node app returns a `404` status code.

## Next steps

Bonus reading! When learning about Nginx I came across <a href="https://www.freecodecamp.org/news/powerful-ways-to-supercharge-your-nginx-server-and-improve-its-performance-a8afdbfde64d/" target="_blank">this article</a> where they talk about some configurations you can do to increase speed and security even more!

I will be writing more about nginx and how I use it to host static sites and nodejs apps on a VPS server. Speaking of VPS there are a few really good ones out there for not too expensive. The one I went with is [DigitalOcean](https://m.do.co/c/5274752299b2) and their service has been fantastic with no surprising fees or failures. I can spin up a server for as little as $5 per month. I have been using them for several years now with no issues. From spinning up various databases to static sites, nodejs, python, chat apps, email servers and more! They have a deal that if you sign up through a referral link you get a $200 credit over the course of 60 days. I do get a kickback of $25 if you spend $25 after the credit but that is not why I am doing this. I used someone else's link to get started on DigitalOcean myself and that $200 credit was amazing! I have learned so much from experimenting with my own machine I can break and then easily restart on a new one. [My referral link](https://m.do.co/c/5274752299b2).

Article series:
1. <a href="/blog/how-to-install-nginx-ubuntu" target="_blank">How to install nginx on Ubuntu</a>
2. <a href="/blog/how-to-host-sites-with-nginx-and-server-blocks" target="_blank">How to host sites with nginx and server blocks</a>
3. <a href="/blog/how-to-add-free-ssltsl-https-to-nginx-using-lets-encrypt" target="_blank">How to add FREE SSL/TSL and HTTPS to nginx using Let’s Encrypt</a>
4. How to host nodejs with nginx using reverse proxy 👈 you are here
5. Nginx commands 🫥 coming soon!
