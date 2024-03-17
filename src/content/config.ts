import { z, defineCollection } from 'astro:content'

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    date: z.string(),
    draft: z.boolean().optional(),
    img: z.object({
      src: image().refine((img) => img.width >= 1080, {
        message: "Cover image must be at least 1080 pixels wide!",
      }),
      byName: z.string(),
      byUrl: z.string(),
      origSrc: z.string()
    }),
    excerpt: z.string(),
  })
})

export const collections = {
  blog: blogCollection
}
