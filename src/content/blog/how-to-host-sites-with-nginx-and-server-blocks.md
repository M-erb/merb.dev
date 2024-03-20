---
title: 'How to host sites with nginx and server blocks'
author: 'Michael Erb'
description: 'Michael Erb explains how to setup nginx to serve up websites using a concept nginx calls server blocks'
date: '03-19-2024'
draft: false
img:
  src: '/src/imgs/postImgs/andrew-ruiz-TR5Ah5sZgpo-unsplash-min.jpg'
  byName: 'Andrew Ruiz'
  byUrl: 'https://unsplash.com/@andrewruiz?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
  origSrc: 'https://unsplash.com/photos/silhouette-of-woman-standing-in-front-of-blue-lights-TR5Ah5sZgpo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
excerpt: 'Nginx, pronounced like “engine-ex”, is one of the most popular web servers in the world and is responsible for hosting some of the largest and highest-traffic sites on the internet. Need an extremely fast and easy to configure web server and reverse proxy? Look no further than nginx!... On Ubuntu it is very easy to install due to it being in the default repositories using `apt`.'
category: 'devOps'
tags: [nginx, webserver, ubuntu, nodejs, selfhost]
---

If you haven't learned how to install nginx yet head over to my other article on [How to install nginx on Ubuntu](/blog/how-to-install-nginx-ubuntu) first so you can follow along. This article assumes you already have nginx installed on Ubuntu and a domain name and are pointing it to your server's public IP address.

Article series:
1. <a href="/blog/how-to-install-nginx-ubuntu" target="_blank">How to install nginx on Ubuntu</a>
2. How to host sites with nginx and server blocks 👈 you are here
3. How to add FREE SSL/TSL and HTTPS to nginx using Let’s Encrypt 🫥 coming soon!
4. How to host nodejs with nginx using reverse proxy 🫥 coming soon!
5. Nginx commands 🫥 coming soon!

## What is a 'server block'

If you are coming from Apache then a ['server block'](https://www.nginx.com/resources/wiki/start/topics/examples/server_blocks/) is pretty much the same as a ['VirtualHost'](https://httpd.apache.org/docs/2.4/vhosts/examples.html) in apache. If not, then a server block makes it so you can host many different websites on the same server. They can all share some common configuration but each have a very different configuration to that sites needs. For example have hosted several small sites from the same DigitalOcean server for $5 a month!

## Create a new NGINX server block

Nginx is very open in how it can be configured but there is some magic that can happen if you do things in a standard way. Such as using add-on tools like [CertBot](https://certbot.eff.org/) that can automate generating SSL/TLS certs and keep them renewed for you. Going to learn more about that in the next article in this series.

### 1. Create some site files to serve up

I am using `example.com` here and for the rest of this article. Just replace this with your domain you want to use. I am using the `-p` flag here to also create any parent folders that do not exist yet. It is best to create this folder with the name of your domain name, like `example.com`. This way you never have to guess what you called this later.

```bash
sudo mkdir -p /var/www/example.com/public
```

Next, we will assign ownership of the folder with the $USER env variable:

```bash
# Sets ownership for easy editing later
sudo chown -R $USER:$USER /var/www/example.com/public

# not always necessary but you can set the file permissions
sudo chmod -R 755 /var/www/example.com
```

Next, we will create a some HTML using nano:

```bash
nano /var/www/example.com/public/index.html
```

Inside, add the following HTML (or your own if you want 😉):

```html
<html>
    <head>
        <title>Welcome</title>
    </head>
    <body>
        <h1>Much Success! My server block is working! 😁</h1>
    </body>
</html>
```

Save by pressing `CTRL/CMD+S` and then exit by pressing `CTRL/CMD+X`. Now we have some HTML for nginx to serve up. Now we need to tell nginx where and how to deliver this content to visitors to ours site!

### 2. Create Nginx server block

Nginx, by default, organizes server blocks into two different folders. One is for the sites/blocks that COULD become live, and another for the list of sites/blocks that ARE live. This is very cool in that you can disable sites without having to delete their configuration files and have to re-create or move them later. Super convenient!

Folder locations:

* Possible or available sites: `/etc/nginx/sites-available`
* Sites that ARE live: `/etc/nginx/sites-enabled` (this is where Nginx looks for sites to make live)

First we will create a new file in the available sites folder. Just like the name of your site files, it is best to create this file with the name of your domain name, like `example.com`. This way you never have to guess what you called this later.

```bash
sudo nano /etc/nginx/sites-available/example.com
```

Below is basic server block setup to serve up static files on port `80` (HTTP). Paste this into nano but change `example.com` to your domain name:

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
Save by pressing `CTRL/CMD+S` and then exit by pressing `CTRL/CMD+X`.

Hey look! That also references our site files in the `root` part. This tells Nginx where to look for files to serve up when a request comes into your domain. You tell Nginx what your domain for these files is in the `server_name` part of the file.

One thing though. Nginx is not running this server block yet. To repeat, this is in the `sites-available` folder. This means that this is a POSSIBLE site, but not a live one yet. To do that we need to create a symlink to the `sites-enabled` folder. We will use the `ln` command to do that:

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

Next run the Nginx test command to make sure our configuration syntax is correct. Keep in mind, this only checks if the syntax is correct, not if it will work completely:

```bash
sudo nginx -t
```

If you don't see any errors then restart Nginx so it will pick up the new server block in `sites-enabled`:

```bash
sudo systemctl restart nginx
```

### 3. Testing your site

At this point you should be able to check your domain in your browser `example.com` and see a very basic page that shows the HTML content you added. Success!

## Next steps

I will be writing more about nginx and how I use it to host static sites and even nodejs apps on a VPS server.

Speaking of VPS there are a few really good ones out there for not too expensive. The one I went with is [DigitalOcean](https://m.do.co/c/5274752299b2) and their service has been fantastic with no surprising fees or failures. I can spin up a server for as little as $5 per month. I have been using them for several years now with no issues. From spinning up various databases to static sites, nodejs, python, chat apps, email servers and more! They have a deal that if you sign up through a referral link you get a $200 credit over the course of 60 days. I do get a kickback of $25 if you spend $25 after the credit but that is not why I am doing this. I used someone else's link to get started on DigitalOcean myself and that $200 credit was amazing! I have learned so much from experimenting with my own machine I can break and then easily restart on a new one. [My referral link](https://m.do.co/c/5274752299b2).

Article series:
1. <a href="/blog/how-to-install-nginx-ubuntu" target="_blank">How to install nginx on Ubuntu</a>
2. How to host sites with nginx and server blocks 👈 you are here
3. How to add FREE SSL/TSL and HTTPS to nginx using Let’s Encrypt 🫥 coming soon!
3. How to host nodejs with nginx using reverse proxy 🫥 coming soon!
4. Nginx commands 🫥 coming soon!
