---
title: 'How to add FREE SSL/TSL and HTTPS to nginx using Let’s Encrypt'
author: 'Michael Erb'
description: 'Explains how to setup SSL/TLS to use HTTPS on your sites using Nginx and Certbot'
date: '03-21-2024'
draft: false
img:
  src: '/src/imgs/postImgs/kaffeebart-KrPulSdUetk-unsplash.jpg'
  byName: 'Kaffeebart'
  byUrl: 'https://unsplash.com/@kaffeebart?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
  origSrc: 'https://unsplash.com/photos/a-close-up-of-a-padlock-on-a-door-KrPulSdUetk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
excerpt: The internet is a big place, and when we request a website our request ends up going through several other people's servers before hitting the website's server. Then it needs to come back too! In those 'in-between' routes there could be malicious actors that could read and even alter the website that comes back to you! For example, if you are using a website that is not secure, aka not using HTTPS but only the HTTP. Then someone can read the website before you do. Log into your banking website that is only using HTTP, someone could be reading your bank account numbers and records, along with reading your password you entered into their login form.
category: 'tutorial'
tags: [nginx, webserver, certbot, SSL/TLS, lets encrypt]
---

Welcome to the nginx learning series! If you haven't learned about installing and creating server blocks then try out the links below. This article assumes you already have nginx installed on Ubuntu and a domain name and are pointing it to your server's public IP address as well as a server block setup for your site.

Article series:
1. <a href="/blog/how-to-install-nginx-ubuntu" target="_blank">How to install nginx on Ubuntu</a>
2. <a href="/blog/how-to-host-sites-with-nginx-and-server-blocks" target="_blank">How to host sites with nginx and server blocks</a>
3. How to add FREE SSL/TSL and HTTPS to nginx using Let’s Encrypt 👈 you are here
4. <a href="/blog/how-to-host-nodejs-with-nginx-using-reverse-proxy" target="_blank">How to host nodejs with nginx using reverse proxy</a>
5. Nginx commands and configuration examples 🫥 coming soon!

## What is HTTPS?

`Hypertext Transfer Protocol Secure` (HTTPS) adds a secure layer on top of the HTTP protocol which is one of the main ways browsers and website servers talk to each other. You can think of a protocol as a standard language making it possible to talk to each other. What the (S) part of HTTPS does for us is encrypt communications between your visitor's browser and your web server.

The internet is a big place, and when we request a website our request ends up going through several other people's servers before hitting the website's server. Then it needs to come back too! In those 'in-between' routes there could be malicious actors that could read and even alter the website that comes back to you! For example, if you are using a website that is not secure, aka not using HTTPS but only the HTTP. Then someone can read the website before you do. Log into your banking website that is only using HTTP, someone could be reading your bank account numbers and records, along with reading your password you entered into their login form.

The people behind <a href="https://letsencrypt.org/about/" target="_blank">Let’s Encrypt</a> started this nonprofit org to try and bring that security to everyone at no cost. We will be using a tool Let’s Encrypt created to help automate certificates called <a href="https://certbot.eff.org/" target="_blank">certbot</a>.

## Install Certbot

`certbot` is a python program created by the folks at Let’s Encrypt to help use their service and even automate renewing of the SSL/TLS certs. To install on Ubuntu you can use apt:

```bash
sudo apt install certbot python3-certbot-nginx
```

In order for `certbot` to do its thing correctly it expects your nginx server blocks to be setup in a specific way so it can quickly read them and adjust them to add HTTPS support and the generated SSL/TLS certs to the block. If you are following along with the other articles then you are good to go! If not then checkout [How to host sites with nginx and server blocks](/blog/how-to-host-sites-with-nginx-and-server-blocks) and make sure you have a similar setup.

The main thing that need to match up are that there is an apex and a subdomain of `www` referenced in the `server_name` property of the Nginx server block configuration.

```nginx
...
server_name example.com www.example.com;
...
```

## Allowing HTTPS Through the Firewall

There should be a firewall setup at some layer of your infrastructure. The main thing here is to just make sure that both ports `80` and `443` are allowed. This will allow HTTP (port 80) and HTTPS (port 443) traffic to get to your site.

**NOTE** you maybe asking yourself, "but you just told me HTTP is bad, why would I allow it?." It is not "bad", it is just not secure. So, the bulk of your traffic should be on HTTPS. There are some that may accidentally link to your site using HTTP though. Most of the time you don't want to outright block all of them. Instead we will redirect anyone connecting using HTTP to the HTTPS version of your site. `Certbot` will help us with that layer on.

When doing things yourself on a VPS most of the time the firewall is directly on the same machine you have Nginx installed on. I am assuming that is your case and that you are using `ufw` as it is the default firewall pre-installed on Ubuntu. As you may have seen from the other articles that `ufw` has pre configured profiles. To see those again run:

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

When first setting up Nginx we allowed `Nginx HTTP` but now we also want to allow `Nginx Full` which is both `HTTP` and `HTTPS`.

```bash
sudo ufw allow 'Nginx Full'
sudo ufw status
```

Output

```bash
Status: active

To                         Action      From
--                         ------      ----
OpenSSH                    ALLOW       Anywhere
Nginx Full                 ALLOW       Anywhere
OpenSSH (v6)               ALLOW       Anywhere (v6)
Nginx Full (v6)            ALLOW       Anywhere (v6)
```

## Get that SSL/TLS Certificate! Finally!!

`Certbot` gives you many ways of getting yourself SSL/TLS certificates through plugins. The Nginx plugin will take care of reconfiguring Nginx and reloading the config whenever necessary. To use this plugin, use this command:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

* `--nginx` tells certbot you want to use the Nginx plugin
* `-d` tells certbot this is a domain you want to use with this certificate

If this is the first time you are using `Certbot` on this machine then you will be asked to provide an email address. Then it will talk to the Let’s Encrypt servers and issue a challenge that verifies you do own the domain we are trying to get a certificate for. If Nginx is already serving a site on port `80` on that domain then everything should work fine.

If that is successful, `certbot` will ask how you want to configure the HTTPS settings:

```bash
Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Select the appropriate number [1-2] then [enter] (press 'c' to cancel):
```

I suggest `option 2` most of the time as you want all traffic to be on HTTPS eventually. Select your option by pressing `1` or `2` into the terminal then press `enter`. Once that is done then `Certbot` wil finish up by adjusting your Nginx server block for this site with your selected redirect option, and loading the new certificates for HTTP traffic.

```bash
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/example.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/example.com/privkey.pem
   Your cert will expire on 2020-08-18. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

You can do a quick test now and try loading your site using `https://` and you should see the famous lock icon in the address bar of your browser. YAY! 🎉🥳

## Wrap up with Certbot auto renewal

Let’s Encrypt’s certificates are only valid for ninety days. This was done on purpose and encourage users of their service to set up auto renewals. This is a better system as it keeps your site secure without having to worry about if your certificate is expired or not. `Certbot` helps us by automatically creating a systemd timer to check your current Let’s Encrypt certificates and if they are within 30 days of expiring. If they do expire within 30 days then it will auto renew them.

You can make sure that timer is running by using this command:

```bash
sudo systemctl status certbot.timer
```

You can also mock test a renewal with this command:

```bash
sudo certbot renew --dry-run
```

If there are no errors then everything should work when an auto renewal happens for real. If the automated renewal process ever fails, Let’s Encrypt will send a message to the email you specified, warning you when your certificate is about to expire.

We learned how to get FREE SSL/TLS certificates using Let’s Encrypt’s services and `Certbot` to automate the process even! There is more to learn about `Certbot` and the tools it brings to you. Check out their <a href="https://certbot.eff.org/docs/" target="_blank">official documentation</a>

## Next steps

I will be writing more about nginx and how I use it to host static sites and even nodejs apps on a VPS server. Speaking of VPS there are a few really good ones out there for not too expensive. The one I went with is [DigitalOcean](https://m.do.co/c/5274752299b2) and their service has been fantastic with no surprising fees or failures. I can spin up a server for as little as $5 per month. I have been using them for several years now with no issues. From spinning up various databases to static sites, nodejs, python, chat apps, email servers and more! They have a deal that if you sign up through a referral link you get a $200 credit over the course of 60 days. I do get a kickback of $25 if you spend $25 after the credit but that is not why I am doing this. I used someone else's link to get started on DigitalOcean myself and that $200 credit was amazing! I have learned so much from experimenting with my own machine I can break and then easily restart on a new one. [My referral link](https://m.do.co/c/5274752299b2).

Article series:
1. <a href="/blog/how-to-install-nginx-ubuntu" target="_blank">How to install nginx on Ubuntu</a>
2. <a href="/blog/how-to-host-sites-with-nginx-and-server-blocks" target="_blank">How to host sites with nginx and server blocks</a>
3. How to add FREE SSL/TSL and HTTPS to nginx using Let’s Encrypt 👈 you are here
4. <a href="/blog/how-to-host-nodejs-with-nginx-using-reverse-proxy" target="_blank">How to host nodejs with nginx using reverse proxy</a>
5. Nginx commands and configuration examples 🫥 coming soon!
