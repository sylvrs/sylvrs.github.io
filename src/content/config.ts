import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    category: z.string(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  type: "content",
});

export const collections = {
  blog,
  pages,
};
