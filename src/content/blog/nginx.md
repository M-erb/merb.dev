---
title: 'How to install NGINX on Ubuntu'
author: 'Michael Erb'
description: 'Using this as a baseline for future posts'
date: '03-19-2024'
draft: false
img:
  src: '/src/imgs/postImgs/taylor-vick-M5tzZtFCOfs-unsplash-min.jpg'
  byName: 'Taylor Vick'
  byUrl: 'https://unsplash.com/@tvick?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
  origSrc: 'https://unsplash.com/photos/cable-network-M5tzZtFCOfs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
excerpt: 'Nginx, pronounced like “engine-ex”, is one of the most popular web servers in the world and is responsible for hosting some of the largest and highest-traffic sites on the internet. Need an extremly fast and easy to configure web server and reverse proxy? Look no further than nginx!... On Ubuntu it is very easy to install due to it being in the default repositories using `apt`.'
category: 'devOps'
tags: [nginx, webserver, ubuntu, nodejs, selfhost]
---

## Nginx introduction

Nginx, pronounced like “engine-ex”, is one of the most popular web servers in the world and is responsible for hosting some of the largest and highest-traffic sites on the internet. It is a lightweight choice that can be used as either a web server or reverse proxy. [Nginx](https://nginx.org/en/) was originally created by Igor Sysoev, with its first public release in October 2004.

Need an extremly fast and easy to configure web server and reverse proxy? Look no further than nginx! We will not be getting into how to configure and use Nginx in this article, only how to install it and get it up and running. I will be writing more on this subject to have a more complete idea of how to use nginx for your next project.

You can follow along by installing Ubuntu on a VM(Virtual Machine), running Ubuntu directly on your own hardware ([Desktop](https://ubuntu.com/tutorials/install-ubuntu-desktop)) or ([Headless Server](https://ubuntu.com/tutorials/install-ubuntu-server)), or use a service out there like [DigitalOcean](https://m.do.co/c/5274752299b2) (referral link) and spin up a VPS(Virtual Private Server) for your own server. Look down below why I chose DigitalOcean. 

## Step 1 – Install

On Ubuntu it is very easy to install due to it being in the default repositories using `apt`.

```bash
sudo apt install nginx
```

There are some default configs we can adjust as well. Let's look at changing the default upload file size limit:

```bash
sudo nano /etc/nginx/nginx.conf
```

```bash
http {
  ... #config above

  client_max_body_size 50M; # Default

  ... #config below
}
```

## Step 2 – Adjusting the Firewall

You should always be using a firewall in some part of your networking stack, especially when exposing a machine to the internet. Wherever it is being used you will need to adjust it to allow port `80` for `http` traffic and `443` for `https` traffic for nginx to serve up websites. In many cases you will be using a firewall installed on the same machine as nginx. If this is the case then lets look at adjusting it. By default `ufw` is installed on Ubuntu so let's use that as an example:

`ufw` has some pre-configured network profiles for known applications, even nginx! After you installed nginx above ufw should have become aware of it. Try it out:

```bash
sudo ufw app list
```
Output

```bash
Available applications:
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
  OpenSSH
```

To explain a little more about the profiles in the output above:

* Nginx Full: This profile opens both port 80 (normal, unencrypted web traffic) and port 443 (TLS/SSL encrypted traffic)
* Nginx HTTP: This profile opens only port 80 (normal, unencrypted web traffic)
* Nginx HTTPS: This profile opens only port 443 (TLS/SSL encrypted traffic)

```bash
sudo ufw allow 'Nginx HTTP'
```

You can check the change by typing:

```bash
sudo ufw status
```

Output

```bash
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx HTTP                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
Nginx HTTP (v6)            ALLOW       Anywhere (v6)
```

## Step 3 – Checking your Web Server

When installing nginx, Ubuntu starts it up for you using `systemd` init system. We can check on its status by running:

```bash
sudo systemctl status nginx
```
Output

```bash
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2020-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   Memory: 3.5M
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```

Wow! Systemd let us know that nginx is running. Amazing! Now what though? Ya, I get that it is very anti climatic. We want to actually SEE something right? Nginx provides a default html page we can look at, so let's look at that. If you know your machine's local or public IP address then put that into your browser's address bar `http://your_server_ip`.

```
Welcome to nginx!

If you see this page, the nginx web server is successfully install and working...
```

If you don't know it then a quick way to get the public one is to use this command: 

```bash
curl -4 icanhazip.com
```

Nice! if you see the above output in your browser then that means you have the right IP address and that nginx is serving up on port `80`

## Next steps

I will be writing more about nginx and how I use it to host static sites and even nodejs apps on a VPS server.

Speaking of VPS there are a few really good ones out there for not too expensive. The one I went with is [DigitalOcean](https://m.do.co/c/5274752299b2) and their service has been fantasic with no surprising fees or failures. I can spin up a server for as little as $5 per month. I have been using them for several years now with no issues. From spining up various databases to static sites, nodejs, python, chat apps, email servers and more! They have a deal that if you sigin up through a referral link you get a $200 credit over the course of 60 days. I do get a kickback of $25 if you spend $25 after the credit but that is not why I am doing this. I used someone else's link to get started on DigitalOcean myself and that $200 credit was amazing! I have learned so much from expirementing with my own machine I can break and then easily restart on a new one. [My referral link](https://m.do.co/c/5274752299b2).

Happy deving!
