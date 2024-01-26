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
    desc: 'Responsible for various development needs ranging from SEO centered websites to internal and external web tools and automate tasks between systems. Created node.js server to generate personalized PDFs and utilize HubSpot APIs to plug into automated marketing campaigns. Created system to generate landing pages for sales partners that ensures accurate plan information and attribution of leads. Created custom personalized form experiences.',
    tech: ['Node.js', 'Vue.js', 'Koa.js', 'HTML', 'CSS', 'SASS', 'PHP', 'Gitlab', 'MariaDB', 'Webpack', 'Vite', 'PostCSS', 'Nginx', 'Zsh', 'Bash', 'TypeScript', 'Docker', 'Linux', 'REST APIs', 'Git', 'Ubuntu']
  },
  {
    company: 'Freelancer',
    title: 'Full Stack Engineer',
    fromYr: 2019,
    endYr: 0,
    desc: 'Consulting and building solutions for small and medium businesses that fit their needs. Most notably, worked for Mozilla creating a react frontend for a community supported feedback system. Created custom personalized form experiences with goals to collect information from users in engaging ways with email notification support and built-in login system for clients to manage and export submissions. Created custom cost effective brochure sites.',
    tech: [ 'Node.js', 'Koa.js', 'Express.js', 'React', 'Vue.js', 'Webpack', 'PostCSS', 'HTML', 'CSS', 'SASS', 'GitHub', 'GitLab', 'Nginx', 'Zsh', 'Bash', 'MongoDB', 'TypeScript', 'Docker', 'Linux', 'REST APIs', 'Git', 'GraphQL', 'MariaDB']
  },
  {
    company: 'Success Engine',
    title: 'Developer and business consultant',
    fromYr: 2018,
    endYr: 2019,
    desc: 'Created a custom app for storing Zoom video data for internal use, and to publish on Zoom marketplace. Consulted with small business clients to develop custom designed processes tailored to their business. Taught how to use automation tools like Keap (Infusionsoft).',
    tech: ['Laravel', 'PHP', 'Node.js', 'Vue.js', 'Webpack', 'HTML', 'CSS', 'SASS', 'OAuth', 'Bash', 'BitBucket']
  },
  {
    company: 'Rocket Media',
    title: 'Full Stack Web Developer',
    fromYr: 2018,
    endYr: 2018,
    desc: 'Worked with a team to design and build measurably valuable web sites for our clients. Focused on creating blazing fast and high performing websites for the HVAC industry. Met with clients to walk through usage of their new sites and tools.',
    tech: ['PHP', 'CraftCMS', 'Node.js', 'Vue.js', 'HTML', 'CSS', 'SASS', 'PostCSS', 'Nginx', 'Zsh', 'Bash', 'Linux', 'Docker', 'REST APIs', 'GitLab', 'MariaDB', 'Webpack']
  },
  {
    company: 'I-ology',
    title: 'Jr Front End Developer',
    fromYr: 2017,
    endYr: 2018,
    desc: 'Worked with a team to plan and develop websites and usable interfaces to connect clients and their customers with technology. Created interfaces for many different clients including large medical companies like Sonora Quest. Created internal dashboards with thought-out reporting. Created frontend for pharmaceutical purchasing system, a very customized eCommerce of sorts but for pharmaceutical professionals.',
    tech: ['Angular.js/v1', 'Vue.js', 'SASS', 'C#', 'Razor', 'TypeScript', 'Webpack', 'HTML', 'CSS', 'SASS', 'PostCSS', 'REST APIs', 'Github', 'GraphQL', 'MariaDB']
  },
  {
    company: 'Freelancer',
    title: 'Freelance Web Developer',
    fromYr: 2016,
    endYr: 2017,
    desc: 'Put web technology solutions to work for small and large businesses which brought growth and success to my clients. Created small custom brochure sites for happy clients. Created reporting dashboards by pulling data together from several systems such as netsuite, infusionsoft(keap), and salesforce, utilizing their REST API\'s.',
    tech: ['Node.js', 'Koa.js', 'Express.js', 'Webpack', 'HTML', 'CSS', 'SASS', 'PostCSS', 'GitHub', 'Nginx', 'Zsh', 'Bash', 'MariaDB', 'MongoDB', 'Linux', 'REST APIs', 'GitLab']
  }
]
