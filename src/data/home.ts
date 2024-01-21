import koaLogo from '@imgs/tech/koajs_logo.svg'
import vueLogo from '@imgs/tech/vuejs.svg'
import postcssLogo from '@imgs/tech/postcss_logo.svg'
import htmlLogo from '@imgs/tech/html5-logo.svg'
import cssLogo from '@imgs/tech/css3-logo.svg'
import jsLogo from '@imgs/tech/javascript.svg'
import vscodeLogo from '@imgs/tech/vscode_logo.svg'
import zshLogo from '@imgs/tech/zsh color logo.svg'
import dockerLogo from '@imgs/tech/docker_icon.svg'
import ubuntuLogo from '@imgs/tech/ubuntu.svg'
import mariaDbLogo from '@imgs/tech/mariadb.svg'
import nginxLogo from '@imgs/tech/Nginx_logo.svg'
import nodejsLogo from '@imgs/tech/nodejs.svg'
import npmLogo from '@imgs/tech/npm.svg'
import viteLogo from '@imgs/tech/vite-veet-logo.svg'
import type { techListItem } from '@components/techList.astro'

export const badges = [
  {
    text: 'Million+ NPM PKGs Installed'
  },
  {
    text: '7+ YRS EXP'
  },
  {
    text: '5+ Linux Distros Tried'
  }
]

export const techList: Array<techListItem> = [
  {
    name: 'koa',
    logo: koaLogo,
    url: 'https://koajs.com'
  },
  {
    name: 'Vuejs',
    logo: vueLogo,
    url: 'https://vuejs.org'
  },
  {
    name: 'postcss',
    logo: postcssLogo,
    url: 'https://postcss.org'
  },
  {
    name: 'HTML',
    logo: htmlLogo,
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTML'
  },
  {
    name: 'CSS',
    logo: cssLogo,
    url: 'https://developer.mozilla.org/en-US/docs/Web/css'
  },
  {
    name: 'JavaScript',
    logo: jsLogo,
    url: 'https://developer.mozilla.org/en-US/docs/Web/javascript'
  },
  {
    name: 'vsCode',
    logo: vscodeLogo,
    url: 'https://code.visualstudio.com'
  },
  {
    name: 'node.js',
    logo: nodejsLogo,
    url: 'https://nodejs.org'
  },
  {
    name: 'Docker',
    logo: dockerLogo,
    url: 'https://www.docker.com'
  },
  {
    name: 'Ubuntu',
    logo: ubuntuLogo,
    url: 'https://ubuntu.com'
  },
  {
    name: 'mariaDB',
    logo: mariaDbLogo,
    url: 'https://mariadb.org'
  },
  {
    name: 'nginx',
    logo: nginxLogo,
    url: 'https://nginx.org'
  },
  {
    name: 'NPM',
    logo: npmLogo,
    url: 'https://www.npmjs.com'
  },
  {
    name: 'zsh',
    logo: zshLogo,
    url: 'https://www.zsh.org'
  },
  {
    name: 'Vite',
    logo: viteLogo,
    url: 'https://vitejs.dev'
  }
]

export const expList = [
  {
    company: 'Redirect Health',
    title: 'Full Stack Engineer',
    fromYr: 2019,
    endYr: 0,
    tech: ['nodejs', 'vuejs', 'HTML', 'CSS', 'JS', 'Ubuntu'],
    desc: 'Create custom websites, internal tools, applications and APIs for partners'
  },
  {
    company: 'Freelancer',
    title: 'Full Stack Engineer',
    fromYr: 2019,
    endYr: 2019,
    tech: ['nodejs', 'vuejs', 'HTML', 'CSS', 'JS'],
    desc: 'Contacts for Mozilla and the Wharton School of Business'
  },
  {
    company: 'Success Engine',
    title: 'Developer and business consultant',
    fromYr: 2018,
    endYr: 2019,
    tech: ['Laravel', 'vuejs'],
    desc: 'Worked to create custom app for storing zoom data and consulted with small business clients on how to better customize tech for their business'
  },
  {
    company: 'Rocket Media',
    title: 'Full Stack Web Developer',
    fromYr: 2018,
    endYr: 2018,
    tech: ['PHP(Craft CMS)', 'vuejs', 'JS', 'HTML', 'CSS(SASS)'],
    desc: 'Created blazing fast and high performing websites for the HVAC industry'
  },
  {
    company: 'I-ology',
    title: 'Jr Front End Developer',
    fromYr: 2017,
    endYr: 2018,
    tech: ['Angularjs (v1)', 'vuejs', 'C#'],
    desc: 'Worked with a small team to create websites and interfaces for large medical companies like sonoraquest.com'
  },
  {
    company: 'Freelancer',
    title: 'Front End Developer',
    fromYr: 2016,
    endYr: 2017,
    tech: ['Angularjs (v1)', 'HTML', 'CSS', 'JS', 'nodejs'],
    desc: 'Did odd jobs for small businesses I came in contact with and through freelancer websites like Fiverr.com'
  }
]
