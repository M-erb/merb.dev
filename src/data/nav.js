import linkedin from '@imgs/social/linkedin logo.svg'
import github from '@imgs/social/github-mark-white.svg'
import twitter from '@imgs/social/Twitter social icons - circle - white.svg'

export const menuList = [
  {
    label: 'Home',
    path: '/'
  },
  {
    label: 'About',
    path: '/about'
  },
  {
    label: 'Contact',
    path: '/contact'
  },
  {
    label: 'Blog',
    path: '/blog'
  }
]

export const menuList2 = [
  {
    label: 'Privacy',
    path: '/'
  },
  {
    label: 'Contact',
    path: '/contact'
  }
]

export const socialList = [
  {
    label: 'linkedin',
    path: import.meta.env.PUBLIC_LINKEDIN,
    img: linkedin
  },
  {
    label: 'github',
    path: import.meta.env.PUBLIC_GITHUB,
    img: github
  },
  {
    label: 'twitter',
    path: import.meta.env.PUBLIC_TWITTER,
    img: twitter
  }
]
