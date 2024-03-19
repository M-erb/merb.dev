# merb.dev

Built using Astro

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── vue/
│   │   │   └── vue-component.vue
│   │   └── Card.astro
│   ├── content/
│   │   └── blog/
│   │       └── example-post.md
│   ├── data/
│   │   ├── data.json
│   │   ├── someData.js
│   │   └── someData.ts
│   ├── icons/
│   │   ├── social/
│   │   │   └── social.svg
│   │   └── icon.svg
│   ├── imgs/
│   │   └── image.jpg
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── main.pcss
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## TODOS:
- [x] Create 404 design
- [x] Code up 404 page
- [x] create content for about me post
- [x] create 2 posts
- [x] create sitemap
- [x] create robots.txt
- [x] install seo plugin
- [x] install analytics
- [x] add error validation to contact form
- [x] display errors on contact form
- [x] add UX scrolling so user knows where they should be
- [x] submit to form service for contact form
- [x] add thank you message for contact form
