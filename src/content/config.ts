import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    date: z.string(),
    draft: z.boolean().optional(),
    postImg: image().refine((img) => img.width >= 1080, {
      message: "Cover image must be at least 1080 pixels wide!",
    }),
    imgByName: z.string(),
    imgByUrl: z.string(),
    imgSrc: z.string(),
    excerpt: z.string()
  })
})

export const collections = {
  blog: blogCollection
}
