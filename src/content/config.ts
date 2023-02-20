import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  schema: z.object({
    layout: z.string(),
    title: z.string(),
    author: z.string(),
    description: z.string(),
    date: z.string(),
    draft: z.boolean().optional(),
    postImg: z.string(),
    imgByName: z.string(),
    imgByUrl: z.string(),
    imgSrc: z.string(),
    excerpt: z.string()
  })
})

export const collections = {
  blog: blogCollection
}
